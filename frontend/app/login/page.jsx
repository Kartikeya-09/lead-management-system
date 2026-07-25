'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
import { Zap, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [authLoading, isAuthenticated, router]);

  const onSubmit = async (data) => {
    setServerError('');
    setSubmitting(true);
    try {
      const res = await api.post('/auth/login', data);
      login(res.data.token, res.data.user);
      router.push('/dashboard');
    } catch (err) {
      setServerError(err?.response?.data?.error?.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen bg-slate-950" />;
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
                <p className="text-sm text-slate-300">Welcome back</p>
              </div>
            </div>

            <h1 className="max-w-md text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Continue where you left off.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
              Sign in to access your dashboard, manage leads, and track your sales pipeline.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['Secure login', 'Industry-standard encryption for your data.'],
                ['Quick access', 'Get back to your dashboard in seconds.'],
                ['Stay synced', 'Your work is always saved and up to date.'],
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
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Login</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Sign in to your account</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">Enter your credentials to access your workspace.</p>
              </div>

              {serverError && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
                    })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-300"
                    placeholder="you@company.com"
                  />
                  {errors.email ? <span className="mt-1 block text-xs text-red-600">{errors.email.message}</span> : null}
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', { required: 'Password is required' })}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-300 pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password ? <span className="mt-1 block text-xs text-red-600">{errors.password.message}</span> : null}
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Sign in
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-600">
                New here?{' '}
                <Link href="/register" className="font-semibold text-primary-700 hover:text-primary-800">
                  Create an account
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
