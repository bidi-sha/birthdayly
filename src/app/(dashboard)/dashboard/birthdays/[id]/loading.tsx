export default function Loading() {
  return (
    <div className="p-4 md:p-8 max-w-md mx-auto space-y-5 animate-pulse">
      <div className="h-9 w-9 bg-gray-200 rounded-full" />
      <div className="flex flex-col items-center gap-3">
        <div className="h-28 w-28 bg-gray-200 rounded-full" />
        <div className="h-6 w-32 bg-gray-200 rounded-lg" />
      </div>
      <div className="h-24 bg-gray-200 rounded-2xl" />
    </div>
  )
}