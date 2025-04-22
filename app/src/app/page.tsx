export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-[16px] items-center sm:items-start">
          <h1 className="text-[32px] font-bold text-center sm:text-left">Laman beranda</h1>
        </div>
        <button className="btn btn-secondary">Tombol</button>
      </main>
    </div>
  );
}
