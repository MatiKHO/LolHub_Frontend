

export const MatchHistorySkeleton = () => {
  return (
    <div className="bg-background rounded-xl p-4 shadow-md animate-pulse">
      <h2 className="text-2xl font-semibold mb-4 bg-muted h-6 w-40 rounded"></h2>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 p-2 bg-muted rounded"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-muted rounded-full"></div>
              <div className="h-4 w-24 bg-muted rounded"></div>
            </div>
            <div className="h-4 w-16 bg-muted rounded"></div>
            <div className="h-4 w-20 bg-muted rounded"></div>
            <div className="h-4 w-16 bg-muted rounded"></div>
            <div className="flex gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-6 h-6 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
