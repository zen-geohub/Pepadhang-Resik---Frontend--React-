import { SelectOption } from "./AdvertisingApplication";
import { useState } from "react";

export let keteranganLokasi = {};

function KeteranganLokasi() {
  const [kemantren, setKemantren] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [sudutSimpang, setSudutSimpang] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [persil, setPersil] = useState("");

  keteranganLokasi = {
    'Kemantren': kemantren,
    'Kelurahan': kelurahan,
    'Koordinat Lintang': latitude,
    'Koordinat Bujur': longitude,
    'Sudut Simpang': sudutSimpang,
    'Lokasi Reklame': locationAddress,
    'Rencana Penempatan': persil,
  }

  function handlePersil() {
    if (
      document.getElementById("Rencana Penempatan *").value ===
      "Persil Orang atau Badan"
    ) {
      setPersil("Persil Orang atau Badan");
    } else if (
      document.getElementById("Rencana Penempatan *").value ===
      "Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum"
    ) {
      setPersil(
        "Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum"
      );
    } else {
      setPersil("");
    }
  }

  const placementPlan = {
    default: "Rencana Penempatan *",
    persilOrang: "Persil Orang atau Badan",
    persilPemerintah:
      "Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum",
  };

  const persilOrang = {
    default: "Kategori Persil Orang atau Badan *",
    persil: "Persil/Halaman",
    menempelPagar: "Menempel Pagar",
    menempelFasad: "Menempel Fasad Bangunan",
    dalamGedung: "Dalam Gedung",
  };

  const persilPemerintah = {
    default:
      "Kategori Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum *",
    taman: "Taman",
    trotoar: "Trotoar",
    tiangPju: "Tiang Penerangan Jalan Umum (PJU)",
    halteBus: "Halte Bus",
    jembatanPenyebrangan: "Jembatan Penyebrangan",
    pasar: "Pasar/Terminal/Tempat Khusus Parkir",
    gapura: "Gapura",
    tuguJam: "Tugu Jam/Pos Polisi/Penunjuk Peta Kota",
    papanPetunjuk: "Papan Petunjuk Arah",
  };

  return (
    <section id="keteranganLokasi" className="flex flex-col gap-1 mb-2">
      <h1 className="font-bold">
        B. <span className="underline">Keterangan Lokasi</span>
      </h1>

      {/* <main id="mapPermohonan" className="w-full h-[233px] rounded z-0 relative">
            <label htmlFor="addMarker" style="display: none;"
            className="cursor-pointer markerLabel material-icons absolute z-10 top-28 left-[10px] p-[2px] shadow-sm hover:bg-[#e7e7e7] rounded-md bg-white">
            <span className="material-icons markerLogo">location_on</span>
            </label>
            <input type="checkbox" hidden id="addMarker"/>
          </main> */}

      <div className="flex flex-row w-full gap-4">
        <div className="w-1/2">
          <label htmlFor="kemantren">Kemantren *</label>
          <input
            id="kemantren"
            className="form-input min-h-[33.33px] pointer-events-none"
            value={kemantren}
            readOnly
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="kelurahan">Kelurahan *</label>
          <input
            id="kelurahan"
            className="form-input min-h-[33.33px] pointer-events-none"
            value={kelurahan}
            readOnly
          />
        </div>
      </div>

      <div className="flex flex-row w-full gap-4">
        <div className="w-1/2">
          <label htmlFor="latitude">Koordinat Lintang *</label>
          <input
            id="latitude"
            className="form-input min-h-[33.33px] pointer-events-none"
            value={latitude}
            readOnly
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="longitude">Koordinat Bujur *</label>
          <input
            id="longitude"
            className="form-input min-h-[33.33px] pointer-events-none"
            value={longitude}
            readOnly
          />
        </div>
      </div>

      <div>
        <label htmlFor="sudutSimpang">Sudut Simpang *</label>
        <input
            id="sudutSimpang"
            className="form-input min-h-[33.33px] pointer-events-none"
            value={sudutSimpang}
            readOnly
          />
      </div>

      <div className="w-full flex flex-col mt-1">
        <label htmlFor="locationAddress">Lokasi Reklame *</label>
        <textarea
          id="locationAddress"
          className="form-input"
          rows="3"
          placeholder="Wajib diisi!"
          required
          value={locationAddress}
          onChange={(e) => setLocationAddress(e.target.value)}
        ></textarea>
      </div>

      <SelectOption option={placementPlan} callback={handlePersil} />
      {persil === "Persil Orang atau Badan" ? (
        <SelectOption option={persilOrang} />
      ) : persil ===
        "Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum" ? (
        <SelectOption option={persilPemerintah} />
      ) : null}
    </section>
  );
}

export default KeteranganLokasi;
