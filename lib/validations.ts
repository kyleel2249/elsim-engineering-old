import { z } from 'zod';

export const budgetRanges = [
  'Under GHS 50,000',
  'GHS 50,000 – 200,000',
  'GHS 200,000 – 1,000,000',
  'Over GHS 1,000,000',
  'Not sure yet'
] as const;

export const timelines = [
  'Immediately',
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  'Planning stage'
] as const;

export const quotationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Enter your full name.')
    .max(100),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .min(9, 'Enter a valid phone number.')
    .max(20),
  serviceSlug: z.string().min(1, 'Choose a service.'),
  projectLocation: z.string().trim().min(2, 'Tell us the site location.'),
  budgetRange: z.enum(budgetRanges, {
    errorMap: () => ({ message: 'Choose a budget range.' })
  }),
  timeline: z.enum(timelines, {
    errorMap: () => ({ message: 'Choose a timeline.' })
  }),
  description: z
    .string()
    .trim()
    .min(20, 'Give us at least a couple of sentences about the project.')
    .max(2000),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Confirm you agree before submitting.' })
  })
});

export type QuotationFormValues = z.infer<typeof quotationSchema>;

export const STEP_FIELDS: Record<number, (keyof QuotationFormValues)[]> = {
  0: ['fullName', 'company', 'email', 'phone'],
  1: ['serviceSlug', 'projectLocation', 'budgetRange', 'timeline'],
  2: ['description', 'consent']
};
