export function PageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-8 animate-pulse">
      {/* Top Header Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-32 bg-neutral-200 rounded"></div>
        <div className="h-10 w-3/4 max-w-xl bg-neutral-300 rounded"></div>
        <div className="h-4 w-full max-w-2xl bg-neutral-200 rounded"></div>
      </div>

      <div className="border-t border-neutral-200 my-8"></div>

      {/* Content Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-64 bg-white border border-neutral-200 rounded-2xl p-6 space-y-4">
          <div className="h-5 w-40 bg-neutral-200 rounded"></div>
          <div className="h-4 w-full bg-neutral-100 rounded"></div>
          <div className="h-4 w-5/6 bg-neutral-100 rounded"></div>
          <div className="h-28 bg-neutral-900/10 rounded-xl"></div>
        </div>
        <div className="h-64 bg-white border border-neutral-200 rounded-2xl p-6 space-y-4">
          <div className="h-5 w-40 bg-neutral-200 rounded"></div>
          <div className="h-4 w-full bg-neutral-100 rounded"></div>
          <div className="h-4 w-5/6 bg-neutral-100 rounded"></div>
          <div className="h-28 bg-neutral-900/10 rounded-xl"></div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-6 text-xs font-mono text-neutral-400">
        <span className="w-2 h-2 rounded-full bg-neutral-400 animate-ping"></span>
        <span>Loading Module via React.lazy()...</span>
      </div>
    </div>
  );
}
