type DashboardSummarySkeletonProps = {
  isDark: boolean;
};

export const DashboardSummarySkeleton = ({ isDark }: DashboardSummarySkeletonProps) => {
  const blockClassName = isDark ? 'bg-gray-800' : 'bg-gray-300';

  return (
    <div
      role='status'
      aria-label='Memuat ringkasan dashboard'
      className={`min-h-96 animate-pulse rounded-2xl border p-5 shadow-lg ${
        isDark ? 'border-gray-800 bg-gray-900/40' : 'border-white/30 bg-white/20'
      }`}
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='w-full'>
          <div className={`h-3 w-28 rounded ${blockClassName}`} />
          <div className={`mt-4 h-9 w-16 rounded ${blockClassName}`} />
          <div className={`mt-3 h-4 w-36 rounded ${blockClassName}`} />
        </div>
        <div className={`h-11 w-11 shrink-0 rounded-lg ${blockClassName}`} />
      </div>
      <div className={`mt-5 border-t pt-4 ${isDark ? 'border-gray-800' : 'border-gray-300/80'}`}>
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className={`flex items-center gap-3 py-3 ${item > 0 ? (isDark ? 'border-t border-gray-800' : 'border-t border-gray-300/80') : ''}`}
          >
            <div className={`h-9 w-9 shrink-0 rounded-lg ${blockClassName}`} />
            <div className='w-full'>
              <div className={`h-3 w-2/3 rounded ${blockClassName}`} />
              <div className={`mt-2 h-3 w-1/2 rounded ${blockClassName}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
