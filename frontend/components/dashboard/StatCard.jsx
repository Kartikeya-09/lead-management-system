'use client';

import LoadingSkeleton from '@/components/shared/LoadingSkeleton';

const StatCard = ({ title, value, icon: Icon, loading = false, tone = 'primary', subtitle }) => {
  const toneClasses = {
    primary: 'from-primary-500/15 to-primary-600/5 text-primary-700',
    success: 'from-emerald-500/15 to-emerald-600/5 text-emerald-700',
    warning: 'from-amber-500/15 to-amber-600/5 text-amber-700',
    slate: 'from-slate-500/15 to-slate-600/5 text-slate-700',
  };

  if (loading) {
    return <LoadingSkeleton variant="card" count={1} />;
  }

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${toneClasses[tone] || toneClasses.primary}`}>
        {Icon ? <Icon className="h-6 w-6" /> : null}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
        {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
      </div>
    </article>
  );
};

export default StatCard;