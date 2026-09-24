import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { QuotationPayload, QuotationRecord } from '@/types';
import { generateReference } from '@/lib/utils';

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'quotations.json');

async function readAll(): Promise<QuotationRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as QuotationRecord[];
  } catch {
    return [];
  }
}

async function writeAll(records: QuotationRecord[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

export async function saveQuotation(payload: QuotationPayload): Promise<QuotationRecord> {
  const record: QuotationRecord = {
    ...payload,
    id: randomUUID(),
    reference: generateReference(),
    submittedAt: new Date().toISOString()
  };

  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    await saveToSupabase(record);
  } else {
    const records = await readAll();
    records.push(record);
    await writeAll(records);
  }

  return record;
}

async function saveToSupabase(record: QuotationRecord): Promise<void> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/quotations`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_ANON_KEY as string,
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      Prefer: 'return=minimal'
    },
    body: JSON.stringify(record)
  });

  if (!response.ok) {
    const records = await readAll();
    records.push(record);
    await writeAll(records);
  }
}

export async function listQuotations(): Promise<QuotationRecord[]> {
  return readAll();
}
