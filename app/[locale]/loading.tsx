export default function LoadingPage() {
  return (
    <div className="page-container bg-gradient-to-br from-[var(--color-accent-200)] to-[var(--color-primary-300)]">
      <main className="flex-1 flex flex-col items-center h-screen justify-center">
        <div className="w-40 h-40 animate-spin border-[var(--color-accent-300)] border-t-8 rounded-full"></div>
        <div className="text-center mt-15 text-2xl font-bold">Loading...</div>
      </main>
    </div>
  );
}
