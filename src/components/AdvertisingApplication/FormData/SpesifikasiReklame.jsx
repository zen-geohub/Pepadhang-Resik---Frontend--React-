import { useContext, useEffect, useRef, useState } from "react";
import { SelectOption } from "../AdvertisingForm";
import { ResultContext } from "../../Context/ApplicationResult";

function SpesifikasiReklame() {
  const [showLainnya, setShowLainnya] = useState(false);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [size, setSize] = useState("");
  const [adverType, setAdverType] = useState("");
  const [scriptt, setScriptt] = useState("");
  const [otherProductScript, setOtherProductScript] = useState("");
  const [facee, setFacee] = useState("");

  const result = useContext(ResultContext);

  useEffect(() => {
    if (length * width > 0 && length * width < 12) {setSize("Kecil")}
    else if (length * width >= 12 && length * width < 24) {setSize("Sedang")}
    else if (length * width >= 24 && length * width <= 32) {setSize("Besar")}

    result.setResult({
      ...result.result,
      'Jenis Reklame': adverType,
      'Ukuran Reklame': `${length} m x ${width} m = ${length * width} m²`,
      'Kategori Ukuran': size,
      'Naskah': scriptt,
      'Naskah Produk Lainnya': otherProductScript,
      'Sisi Hadap': facee,
    })
  }, [adverType, length, width, size, scriptt, otherProductScript, facee])


  function handleProdukLainnya(e) {
    e.target.value === "Produk Lainnya" ? setShowLainnya(true) : setShowLainnya(false);

    setScriptt(e.target.value);
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

  return (
    <section id="spesifikasiReklame" className="flex flex-col gap-1 mb-2">
      <h1 className="font-bold">
        C. <span className="underline">Spesifikasi Reklame</span>
      </h1>

      <SelectOption option={advType} callback={(e) => setAdverType(e.target.value)}/>

      <div>
        <label htmlFor="size">Ukuran (m &times; m) *</label>
        <div className="flex gap-2 justify-between items-center">
          <input
            type="number"
            className="form-input"
            // placeholder="meter"
            placeholder="panjang"
            min={0}
            step={0.1}
            max={32}
            value={length}
            onChange={(e) => e.target.value !== "0" ? setLength(e.target.value) : alert("Panjang tidak boleh sama dengan 0!")}
            required
          />
          <p className="select-none">&times;</p>
          <input
            type="number"
            className="form-input"
            // placeholder="meter"
            min={0}
            step={0.1}
            max={32}
            placeholder="lebar"
            value={width}
            onInput={(e) => e.target.value !== "0" ? setWidth(e.target.value) : alert("Lebar tidak boleh sama dengan 0!")}
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
        {width * length === 0 && (
          <p className="text-red-500 text-sm font-bold">
            Luas reklame tidak boleh sama dengan 0 m&sup2;!
          </p>
        )}
      </div>

      <SelectOption option={script} callback={handleProdukLainnya} />
      {showLainnya && (
        <div>
          <label htmlFor="otherProductScript">Naskah Produk Lainnya</label>
          <input
            type="text"
            className="form-input"
            id="otherProductScript"
            required
            value={otherProductScript}
            onChange={(e) => setOtherProductScript(e.target.value)}
          />
        </div>
      )}
      <SelectOption option={face} callback={(e) => setFacee(e.target.value)}/>
    </section>
  );
}

export default SpesifikasiReklame;
