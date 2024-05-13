import { SelectOption } from "./AdvertisingApplication";
import { useState } from "react";

function SpesifikasiReklame() {
  const [showLainnya, setShowLainnya] = useState(false);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);

  function handleProdukLainnya() {
    document.getElementById("Naskah *").value === "other"
      ? setShowLainnya(true)
      : setShowLainnya(false);
  }

  const advType = {
    default: "Jenis Reklame *",
    billboard: "Reklame Papan/Billboard",
    videotron: "Reklame Videotron",
    wallPainting: "Reklame Lukisan Dinding (Wall Painting)",
  };

  const script = {
    default: "Naskah *",
    cigarette: "Produk Rokok",
    contraception: "Produk Alat Kontrasepsi",
    other: "Produk Lainnya",
  };

  const face = {
    default: "Sisi Hadap *",
    one: "1 Sisi",
    two: "2 Sisi",
    three: "3 Sisi",
    four: "4 Sisi",
    more: "Lebih dari 4 Sisi",
  };

  function ProdukLainnya() {
    return (
      <div>
        <label htmlFor="otherProductScript">Naskah Produk Lainnya</label>
        <input
          type="text"
          className="form-input"
          id="otherProductScript"
          placeholder=""
        />
      </div>
    );
  }

  return (
    <section id="spesifikasiReklame" className="flex flex-col gap-1 mb-2">
      <h1 className="font-bold">
        C. <span className="underline">Spesifikasi Reklame</span>
      </h1>

      <SelectOption option={advType} />

      <div>
        <label htmlFor="size">Ukuran (m &times; m) *</label>
        <div className="flex gap-2 justify-between items-center">
          <input
            type="number"
            className="form-input"
            placeholder="meter"
            id="panjang"
            max={32}
            value={length}
            onInput={(e) => setLength(e.target.value)}
            required
          />
          <p className="select-none">&times;</p>
          <input
            type="number"
            className="form-input"
            placeholder="meter"
            max={32}
            id="lebar"
            value={width}
            onInput={(e) => setWidth(e.target.value)}
            required
          />
        </div>
        {width * length > 8 && width * length <= 32 && (
          <p className="text-sm font-bold">
            Membutuhkan Persetujuan Bangunan Gedung (PBG)
          </p>
        )}
        {width * length > 32 && (
          <p className="text-red-500 text-sm font-bold">
            Luas reklame tidak boleh lebih dari 32 m&sup2;!
          </p>
        )}
      </div>

      <SelectOption option={script} callback={handleProdukLainnya} />
      {showLainnya && <ProdukLainnya />}
      <SelectOption option={face} />
    </section>
  );
}

export default SpesifikasiReklame;
