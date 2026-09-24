import { QuotationRecord } from '@/types';

export async function notifyNewQuotation(record: QuotationRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTATION_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'ELSIM Site <quotes@elsim-engineering.com>',
        to,
        subject: `New quotation request — ${record.reference}`,
        text: [
          `Reference: ${record.reference}`,
          `Name: ${record.fullName}`,
          `Company: ${record.company || 'N/A'}`,
          `Email: ${record.email}`,
          `Phone: ${record.phone}`,
          `Service: ${record.serviceSlug}`,
          `Location: ${record.projectLocation}`,
          `Budget: ${record.budgetRange}`,
          `Timeline: ${record.timeline}`,
          '',
          record.description
        ].join('\n')
      })
    });
  } catch (error) {
    console.error('Quotation notification email failed:', error);
  }
}
