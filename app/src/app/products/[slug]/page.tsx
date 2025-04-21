export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-[16px] items-center sm:items-start">
          <h1 className="text-[32px] font-bold text-center sm:text-left">Laman produk /{slug}</h1>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
