function Tentang() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-secondary">Tentang Arroyyan</h1>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Sejarah Berdirinya</h2>
        <p className="text-gray-600">{/* TODO: isi sejarah singkat berdirinya Arroyyan99 */}</p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Lokasi</h2>
        <p className="text-gray-600">{/* TODO: alamat pabrik/kantor pusat */}</p>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-6">
          <h3 className="mb-2 font-semibold">Visi</h3>
          <p className="text-gray-600">{/* TODO: isi visi */}</p>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="mb-2 font-semibold">Misi</h3>
          <p className="text-gray-600">{/* TODO: isi misi */}</p>
        </div>
      </section>
    </div>
  );
}

export default Tentang;
