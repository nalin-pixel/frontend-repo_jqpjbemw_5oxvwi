export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-yellow-100">
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/5 via-transparent to-yellow-300/5" />
      </div>
      <div className="relative mx-auto max-w-3xl pb-10">
        {children}
      </div>
    </div>
  );
}
