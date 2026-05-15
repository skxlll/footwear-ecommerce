const ProductSkeleton = () => (
  <div className="flex flex-col gap-4">
    <div className="aspect-[3/4] w-full rounded-3xl skeleton-shimmer bg-white/40" />
    <div className="space-y-2 px-1">
      <div className="h-2.5 w-16 rounded-full skeleton-shimmer bg-white/50" />
      <div className="h-4 w-3/4 rounded-full skeleton-shimmer bg-white/50" />
      <div className="h-3.5 w-20 rounded-full skeleton-shimmer bg-white/40" />
    </div>
  </div>
);

export default ProductSkeleton;
