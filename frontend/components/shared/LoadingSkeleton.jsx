const LoadingSkeleton = ({ variant = 'text', count = 1 }) => {
  const items = Array.from({ length: count });

  if (variant === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="skeleton-shimmer h-4 w-24 rounded mb-3" />
            <div className="skeleton-shimmer h-8 w-16 rounded mb-2" />
            <div className="skeleton-shimmer h-3 w-32 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table' || variant === 'row') {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="skeleton-shimmer h-12 w-full" />
        {items.map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border-t border-gray-100">
            <div className="skeleton-shimmer h-4 flex-1 rounded" />
            <div className="skeleton-shimmer h-4 w-24 rounded" />
            <div className="skeleton-shimmer h-4 w-20 rounded" />
            <div className="skeleton-shimmer h-4 w-16 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'block') {
    return (
      <div className="space-y-4">
        {items.map((_, i) => (
          <div key={i} className="skeleton-shimmer h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  // text variant
  return (
    <div className="space-y-2">
      {items.map((_, i) => (
        <div key={i} className="skeleton-shimmer h-4 rounded" style={{ width: `${70 + Math.random() * 30}%` }} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
