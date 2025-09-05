export function Loader() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-rose-500 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-rose-500 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-rose-500 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </main>
  )
}
