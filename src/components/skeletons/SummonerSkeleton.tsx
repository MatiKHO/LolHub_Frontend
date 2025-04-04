
export const SummonerSkeleton = () => {
  return (
    <div className="flex flex-col items-start p-6 bg-zinc-800 rounded-xl shadow-md animate-pulse">
        <div className="mb-4 w-24 h-24 bg-zinc-700 rounded-full"></div>
        <div className="h-6 w-32 bg-zinc-700 rounded mb-2"></div>
        <div className="h-4 w-20 bg-zinc-700 rounded mb-2"></div>
        <div className="flex gap-2">
          <div className="h-4 w-16 bg-zinc-700 rounded"></div>
          <div className="h-4 w-16 bg-zinc-700 rounded"></div>
        </div>
      </div>
  )
}
