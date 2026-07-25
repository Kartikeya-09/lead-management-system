import Link from 'next/link';
import { ArrowRight, BarChart3, BriefcaseBusiness, ShieldCheck, Sparkles, Users } from 'lucide-react';

const highlights = [
  {
    icon: BarChart3,
    title: 'Pipeline visibility',
    description: 'Track every lead from first touch to closed won with a clean, focused dashboard.',
  },
  {
    icon: Users,
    title: 'Team collaboration',
    description: 'Assign leads, leave notes, and review activity without losing context.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-aware access',
    description: 'Admins and members see only what they need, with server-side enforcement.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Fast lead capture',
    description: 'Collect inbound leads instantly and turn them into a managed pipeline.',
  },
];

const stats = [
  { label: 'Lead stages', value: '6' },
  { label: 'Views', value: '1 dashboard' },
  { label: 'Access modes', value: '2 roles' },
];

const brandValues = [
  {
    title: 'Simplicity First',
    description: 'We believe powerful tools shouldn\'t be complicated. Our interface is clean, intuitive, and designed to help you focus on what matters most - closing deals.',
  },
  {
    title: 'Speed & Efficiency',
    description: 'Every interaction is optimized for speed. From lead capture to pipeline updates, we\'ve eliminated friction points that slow down your sales process.',
  },
  {
    title: 'Team-Centric Design',
    description: 'Built for real sales teams. Role-based access, collaboration features, and activity tracking ensure everyone stays aligned without overwhelming your team.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.25),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] animate-gradient" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:48px_48px]" />

      <section className="relative mx-auto flex flex-1 w-full max-w-7xl flex-col px-6 py-8 lg:px-10">
        <header className="flex items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur smooth-transition hover:bg-white/15">
              <Sparkles className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200/80">SalesCRM</p>
              <p className="text-sm text-slate-300">Lead management that stays out of your way</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white smooth-transition hover:bg-white/10 hover:scale-105">
              Sign in
            </Link>
            <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 smooth-transition hover:-translate-y-0.5 hover:bg-cyan-300 hover:scale-105">
              Create account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20 min-h-[calc(100vh-8rem)]">
          <div className="max-w-2xl animate-fade-in animate-delay-200">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 backdrop-blur smooth-transition hover:bg-cyan-400/20">
              <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
              Built for fast-moving sales teams
            </div>

            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              A sharper way to manage leads, notes, and team flow.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              SalesCRM gives you a clear pipeline, role-aware dashboards, public lead capture, and a focused workspace for moving deals forward.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-950/20 smooth-transition hover:-translate-y-0.5 hover:scale-105">
                Start free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white smooth-transition hover:bg-white/10 hover:scale-105">
                Sign in to dashboard
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div key={stat.label} className={`rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur smooth-transition hover:bg-white/10 hover:scale-105 animate-fade-in animate-delay-${(index + 3) * 100}`}>
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in animate-delay-400">
            <div className="absolute -inset-8 rounded-3xl bg-cyan-400/10 blur-3xl animate-pulse" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl smooth-transition hover:scale-105">
              <div className="border-b border-white/10 px-6 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200/80">Workspace Preview</p>
                <p className="mt-1 text-sm text-slate-300">A clean control center for your pipeline.</p>
              </div>

              <div className="grid gap-4 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-white/10">
                    <p className="text-sm text-slate-400">Total Leads</p>
                    <p className="mt-2 text-3xl font-semibold text-white">128</p>
                    <p className="mt-2 text-sm text-emerald-300">+12 this week</p>
                  </div>
                  <div className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-white/10">
                    <p className="text-sm text-slate-400">Won Leads</p>
                    <p className="mt-2 text-3xl font-semibold text-white">24</p>
                    <p className="mt-2 text-sm text-cyan-300">Healthy pipeline momentum</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-200">Pipeline Snapshot</p>
                    <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">Live</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      ['New', 'bg-slate-500', '18'],
                      ['Contacted', 'bg-blue-500', '22'],
                      ['Qualified', 'bg-amber-500', '16'],
                      ['Won', 'bg-emerald-500', '24'],
                    ].map(([label, color, value]) => (
                      <div key={label}>
                        <div className="mb-1 flex items-center justify-between text-sm text-slate-300">
                          <span>{label}</span>
                          <span>{value}</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div className={`h-2 rounded-full ${color}`} style={{ width: `${Number(value) * 3}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-4 pb-10 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className={`rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur smooth-transition hover:-translate-y-1 hover:bg-white/10 hover:scale-105 animate-fade-in animate-delay-${(index + 5) * 100}`}>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/20 smooth-transition hover:bg-cyan-400/25">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
              </article>
            );
          })}
        </section>

        {/* Brand Values Section */}
        <section className="py-16 animate-fade-in animate-delay-700">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-white md:text-4xl">Built Different, Built Better</h2>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">Our values drive every decision we make, from the smallest interaction to the biggest feature.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {brandValues.map((value, index) => (
              <div key={value.title} className={`rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur smooth-transition hover:bg-white/10 hover:scale-105 animate-fade-in animate-delay-${(index + 8) * 100}`}>
                <h3 className="text-xl font-semibold text-cyan-200 mb-4">{value.title}</h3>
                <p className="text-slate-300 leading-7">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Public Lead Capture CTA Section */}
        <section className="py-16 animate-fade-in animate-delay-1100">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 p-12 text-center backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.15),_transparent_50%)]" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-400/20 mb-6 ring-1 ring-cyan-300/30">
                <Sparkles className="h-8 w-8 text-cyan-200" />
              </div>
              <h2 className="text-3xl font-semibold text-white md:text-4xl mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
                Even without an account, you can submit your information and our team will reach out to discuss how SalesCRM can transform your sales process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/capture" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-950/20 smooth-transition hover:-translate-y-0.5 hover:bg-cyan-300 hover:scale-105">
                  Submit Your Information
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white smooth-transition hover:bg-white/10 hover:scale-105">
                  Create Full Account
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-slate-950/50 backdrop-blur-xl py-12 animate-fade-in animate-delay-1200">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-8 md:grid-cols-4">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    <Sparkles className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200/80">SalesCRM</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-6">
                  A modern CRM for small sales teams to manage leads, track activities, and close deals.
                </p>
              </div>

              {/* Product Links */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/register" className="text-sm text-slate-400 smooth-transition hover:text-cyan-300">
                      Get Started
                    </Link>
                  </li>
                  <li>
                    <Link href="/capture" className="text-sm text-slate-400 smooth-transition hover:text-cyan-300">
                      Lead Capture
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="text-sm text-slate-400 smooth-transition hover:text-cyan-300">
                      Sign In
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm text-slate-400 smooth-transition hover:text-cyan-300">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-slate-400 smooth-transition hover:text-cyan-300">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-slate-400 smooth-transition hover:text-cyan-300">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm text-slate-400 smooth-transition hover:text-cyan-300">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-slate-400 smooth-transition hover:text-cyan-300">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-slate-400 smooth-transition hover:text-cyan-300">
                      Security
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <p className="text-sm text-slate-500">
                  © 2026 SalesCRM. All rights reserved.
                </p>
                <a 
                  href="https://digitalheroesco.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-400 smooth-transition hover:text-cyan-300 font-medium"
                >
                  Built for Digital Heroes Training Task
                </a>
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-slate-500 smooth-transition hover:text-cyan-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-500 smooth-transition hover:text-cyan-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-500 smooth-transition hover:text-cyan-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
