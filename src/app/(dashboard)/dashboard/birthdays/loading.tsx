export default function Loading() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-5 animate-pulse">
      <div className="h-9 w-56 bg-gray-200 rounded-lg" />
      <div className="h-10 bg-gray-200 rounded-xl" />
      <div className="space-y-3">
        {[0, 1, 2, 3, 4].map((i) => <div key={i} className="h-16 bg-gray-200 rounded-2xl" />)}
      </div>
    </div>
  )
}