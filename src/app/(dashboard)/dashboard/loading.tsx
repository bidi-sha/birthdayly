export default function Loading() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6 animate-pulse">
      <div className="h-7 w-40 bg-gray-200 rounded-lg" />
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => <div key={i} className="h-20 bg-gray-200 rounded-2xl" />)}
      </div>
      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-200 rounded-2xl" />)}
      </div>
    </div>
  )
}