'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import {
  QuotationFormValues,
  STEP_FIELDS,
  budgetRanges,
  quotationSchema,
  timelines
} from '@/lib/validations';
import { services } from '@/lib/data/services';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const STEP_LABELS = ['Your details', 'Project scope', 'Describe & submit'];

const inputClasses =
  'w-full rounded-sm border border-steel-600 bg-steel-900 px-4 py-2.5 text-sm text-steel-100 placeholder:text-steel-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400';

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-steel-300">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-copper-400">{error}</span>}
    </label>
  );
}

export function QuotationForm({ defaultServiceSlug }: { defaultServiceSlug?: string }) {
  const [step, setStep] = useState(0);
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [reference, setReference] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<QuotationFormValues>({
    resolver: zodResolver(quotationSchema),
    mode: 'onBlur',
    defaultValues: {
      serviceSlug: defaultServiceSlug ?? '',
      budgetRange: undefined,
      timeline: undefined
    }
  });

  async function goNext() {
    const fields = STEP_FIELDS[step];
    const valid = await trigger(fields);
    if (valid) setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(values: QuotationFormValues) {
    setSubmitState('submitting');
    try {
      const response = await fetch('/api/quotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (!response.ok) throw new Error('Request failed');
      const data = (await response.json()) as { reference: string };
      setReference(data.reference);
      setSubmitState('idle');
    } catch {
      setSubmitState('error');
    }
  }

  if (reference) {
    return (
      <div className="border border-steel-700 bg-steel-800/60 p-10 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-cyan-400" aria-hidden />
        <h2 className="mt-4 font-display text-2xl text-steel-100">Quotation request received.</h2>
        <p className="mt-3 text-sm text-steel-300">Your reference number is</p>
        <p className="mt-1 font-mono text-lg text-cyan-400">{reference}</p>
        <p className="mt-4 text-sm text-steel-400">
          Quote this reference in any follow-up. Our team will get back to you with next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <ol className="mb-10 flex items-center gap-3" aria-label="Form progress">
        {STEP_LABELS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-3">
            <div
              className={cn(
                'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border font-mono text-xs',
                i <= step
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-steel-600 text-steel-500'
              )}
              aria-current={i === step ? 'step' : undefined}
            >
              {i + 1}
            </div>
            <span
              className={cn(
                'hidden text-sm sm:inline',
                i === step ? 'text-steel-100' : 'text-steel-500'
              )}
            >
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && (
              <div className="h-px flex-1 bg-steel-700" aria-hidden />
            )}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" error={errors.fullName?.message}>
                <input className={inputClasses} {...register('fullName')} />
              </Field>
              <Field label="Company (optional)" error={errors.company?.message}>
                <input className={inputClasses} {...register('company')} />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input type="email" className={inputClasses} {...register('email')} />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input type="tel" className={inputClasses} {...register('phone')} />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Service needed" error={errors.serviceSlug?.message}>
                <select className={inputClasses} {...register('serviceSlug')}>
                  <option value="">Choose a service</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Project location" error={errors.projectLocation?.message}>
                <input
                  className={inputClasses}
                  placeholder="e.g. Tema, Greater Accra"
                  {...register('projectLocation')}
                />
              </Field>
              <Field label="Budget range" error={errors.budgetRange?.message}>
                <select className={inputClasses} {...register('budgetRange')}>
                  <option value="">Choose a range</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Timeline" error={errors.timeline?.message}>
                <select className={inputClasses} {...register('timeline')}>
                  <option value="">Choose a timeline</option>
                  {timelines.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5">
              <Field label="Project description" error={errors.description?.message}>
                <textarea
                  rows={6}
                  className={inputClasses}
                  placeholder="Scope, site conditions, any drawings you already have..."
                  {...register('description')}
                />
              </Field>
              <label className="flex items-start gap-3 text-sm text-steel-300">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded-sm border-steel-600 bg-steel-900 accent-cyan-400"
                  {...register('consent')}
                />
                I agree to be contacted by ELSIM Engineering about this request.
              </label>
              {errors.consent && (
                <span className="text-xs text-copper-400">{errors.consent.message}</span>
              )}
              {submitState === 'error' && (
                <p className="text-sm text-copper-400">
                  Something went wrong sending your request. Please try again.
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex justify-between border-t border-steel-700 pt-6">
        <Button type="button" variant="outline" onClick={goBack} disabled={step === 0}>
          Back
        </Button>
        {step < STEP_LABELS.length - 1 ? (
          <Button type="button" onClick={goNext}>
            Continue
          </Button>
        ) : (
          <Button type="submit" disabled={submitState === 'submitting'}>
            {submitState === 'submitting' && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            )}
            Submit request
          </Button>
        )}
      </div>
    </form>
  );
}
