'use client';

const statusPalette = {
  New: { label: 'New', bar: 'bg-slate-500', text: 'text-slate-700', soft: 'bg-slate-100' },
  Contacted: { label: 'Contacted', bar: 'bg-blue-500', text: 'text-blue-700', soft: 'bg-blue-100' },
  Qualified: { label: 'Qualified', bar: 'bg-amber-500', text: 'text-amber-700', soft: 'bg-amber-100' },
  'Proposal Sent': { label: 'Proposal Sent', bar: 'bg-violet-500', text: 'text-violet-700', soft: 'bg-violet-100' },
  Won: { label: 'Won', bar: 'bg-emerald-500', text: 'text-emerald-700', soft: 'bg-emerald-100' },
  Lost: { label: 'Lost', bar: 'bg-rose-500', text: 'text-rose-700', soft: 'bg-rose-100' },
};

const orderedStatuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];

const StatusBreakdown = ({ counts = {} }) => {
  const total = orderedStatuses.reduce((sum, status) => sum + (counts[status] || 0), 0);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Status Breakdown</h2>
          <p className="text-sm text-slate-500">Lead distribution across the pipeline</p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {total} total
        </div>
      </div>

      {total === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          No leads are available yet.
        </div>
      ) : (
        <>
          <div className="mb-4 flex h-4 overflow-hidden rounded-full bg-slate-100">
            {orderedStatuses.map((status) => {
              const count = counts[status] || 0;
              if (!count) return null;
              const width = `${(count / total) * 100}%`;
              return <div key={status} className={statusPalette[status].bar} style={{ width }} title={`${status}: ${count}`} />;
            })}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {orderedStatuses.map((status) => {
              const count = counts[status] || 0;
              const config = statusPalette[status];
              const percentage = total ? Math.round((count / total) * 100) : 0;

              return (
                <div key={status} className={`flex items-center justify-between rounded-xl px-3 py-2 ${config.soft}`}>
                  <div>
                    <p className={`text-sm font-semibold ${config.text}`}>{config.label}</p>
                    <p className="text-xs text-slate-500">{percentage}% of leads</p>
                  </div>
                  <div className={`rounded-full px-2.5 py-1 text-xs font-semibold ${config.text} bg-white/70`}>
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default StatusBreakdown;