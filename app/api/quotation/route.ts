import { NextRequest, NextResponse } from 'next/server';
import { quotationSchema } from '@/lib/validations';
import { saveQuotation } from '@/lib/server/quotation-store';
import { notifyNewQuotation } from '@/lib/server/notify';

const submissionsByIp = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = quotationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const record = await saveQuotation(parsed.data);
  await notifyNewQuotation(record);

  return NextResponse.json({ reference: record.reference }, { status: 201 });
}
