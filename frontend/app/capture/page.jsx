'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '@/lib/axios';
import { Zap, CheckCircle, Loader2, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CapturePage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async (data) => {
    setServerError('');
    setSubmitting(true);
    try {
      await api.post('/capture', data);
      setSubmitted(true);
    } catch (err) {
      const resp = err?.response;
      if (resp?.status === 409) {
        setServerError(resp.data?.error?.message || 'This email already exists.');
      } else if (resp?.status === 422 && resp.data?.error?.fields) {
        Object.entries(resp.data.error.fields).forEach(([field, msg]) => {
          setError(field, { type: 'server', message: msg });
        });
      } else {
        setServerError('Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
          <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl p-12 max-w-lg w-full text-center">
            <div className="w-20 h-20 rounded-full bg-cyan-400/20 flex items-center justify-center mx-auto mb-6 ring-1 ring-cyan-300/30">
              <CheckCircle className="w-10 h-10 text-cyan-300" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Thank you!</h2>
            <p className="text-slate-300 leading-7">Your information has been submitted successfully. Our team will reach out to you shortly.</p>
            <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white smooth-transition hover:bg-white/10 hover:scale-105">
              Back to landing
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]">
          <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_40%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.96))] p-8 lg:p-10">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 smooth-transition hover:bg-white/15">
                <Zap className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200/80">SalesCRM</p>
                <p className="text-sm text-slate-300">Lead Capture</p>
              </div>
            </div>

            <h1 className="max-w-md text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Let's start a conversation.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
              Share your information and our team will reach out to discuss how SalesCRM can transform your sales process.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['Quick response', 'Our team typically responds within 24 hours.'],
                ['No commitment', 'Explore our solution with no pressure.'],
                ['Expert guidance', 'Get personalized advice for your business.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4 smooth-transition hover:bg-white/10 hover:scale-105">
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                </div>
              ))}
            </div>

            <Link href="/" className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white smooth-transition hover:bg-white/10 hover:scale-105">
              <ArrowLeft className="h-4 w-4" />
              Back to landing
            </Link>
          </section>

          <section className="bg-slate-50 p-8 text-slate-900 lg:p-10">
            <div className="mx-auto max-w-xl">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Contact</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Get in touch</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">Fill out the form and we'll contact you.</p>
              </div>

              {serverError && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Full Name *</span>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-300"
                    placeholder="John Doe"
                  />
                  {errors.name ? <span className="mt-1 block text-xs text-red-600">{errors.name.message}</span> : null}
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Email *</span>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                    })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-300"
                    placeholder="john@company.com"
                  />
                  {errors.email ? <span className="mt-1 block text-xs text-red-600">{errors.email.message}</span> : null}
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Phone</span>
                  <input
                    {...register('phone')}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Company *</span>
                  <input
                    {...register('company', { required: 'Company is required' })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-300"
                    placeholder="Acme Inc."
                  />
                  {errors.company ? <span className="mt-1 block text-xs text-red-600">{errors.company.message}</span> : null}
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Source</span>
                  <select
                    {...register('source')}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-300"
                  >
                    <option value="">Select source</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
