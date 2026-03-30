export default function LinkSkeleton() {
  return (
    <li className="surface-card mb-4 flex items-center rounded-[1.8rem] p-4 sm:p-5">
      <div className="mr-3 h-10 w-10 animate-pulse rounded-[1rem] bg-white/70" />
      <div>
        <div className="mb-3 flex items-center space-x-2">
          <div className="h-5 w-28 animate-pulse rounded-md bg-white/70" />
          <div className="h-5 w-5 animate-pulse rounded-full bg-white/70" />
          <div className="h-5 w-5 animate-pulse rounded-full bg-white/70" />
          <div className="h-5 w-20 animate-pulse rounded-md bg-white/70" />
        </div>
        <div className="h-4 w-72 animate-pulse rounded-md bg-white/70" />
      </div>
    </li>
  );
}
