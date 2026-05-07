export default function Loading() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-action-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-neutral-500 text-sm font-medium">Loading...</p>
      </div>
    </main>
  );
}