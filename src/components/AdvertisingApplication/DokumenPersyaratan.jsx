function DokumenPersyaratan() {
  return (
    <section id="dokumenPersyaratan" className="flex flex-col gap-1 mb-2">
      <h1 className="font-bold">
        D. <span className="underline">Dokumen Persyaratan</span>
      </h1>
      <div className="flex flex-col mb-2">
        <label htmlFor="identityCard">
          Scan Foto KTP/NIB bagi Pelaku Usaha *
        </label>
        <input type="file" id="identityCard" accept="image/*" required />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="simulation">Foto/Gambar Simulasi Reklame *</label>
        <input type="file" id="simulation" accept="image/*" required />
      </div>
    </section>
  );
}

export default DokumenPersyaratan;
