import { useContext, useEffect, useState, useRef } from "react";
import { SelectOption } from "./AdvertisingForm";
import { ResultContext } from "../Context/ApplicationResult";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { PiMapPinFill, PiMapPinPlusFill } from "react-icons/pi";

function KeteranganLokasi() {
  const [kemantren, setKemantren] = useState("default");
  const [kelurahan, setKelurahan] = useState("default");
  const [latitude, setLatitude] = useState("default");
  const [longitude, setLongitude] = useState("default");
  const [sudutSimpang, setSudutSimpang] = useState("default");
  const [locationAddress, setLocationAddress] = useState("");
  const [persil, setPersil] = useState("");
  const [kategoriPersil, setKategoriPersil] = useState("");

  const [addMarker, setAddMarker] = useState(false);
  function handleCheckMarker() {
    setAddMarker(!addMarker);
    let markerAdded
    
    function marker(e) {
      if (markerAdded) {
        markerAdded.remove()
      }

      const coordinates = e.lngLat

      markerAdded = new maplibregl.Marker()
       .setLngLat(coordinates)
       .addTo(map.current);

      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coordinates.lat}&lon=${coordinates.lng}&format=geojson&polygon_geojson=1&addressdetails=1`, {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setKemantren(data.features[0].properties.address.city_district)
        setKelurahan(data.features[0].properties.address.suburb)
      })

      setLatitude(e.lngLat.lat);
      setLongitude(e.lngLat.lng);
    }

    // addMarker ? map.current.on('click', marker) : map.current.off('click', marker)
    map.current.on('load', () => {
      // addMarker ? map.current.off('click', marker) : map.current.on('click', marker)
      map.current.on('click', marker)
    })
    map.current.on('click', marker)
  }

  const result = useContext(ResultContext);
  useEffect(() => {
    result.setResult({
      ...result.result,
      Kemantren: kemantren,
      Kelurahan: kelurahan,
      "Koordinat Lintang": latitude,
      "Koordinat Bujur": longitude,
      "Sudut Simpang": sudutSimpang,
      "Lokasi Reklame": locationAddress,
      "Rencana Penempatan": persil,
      "Kategori Persil": kategoriPersil,
      // ...result.result,
    });
  }, [
    kemantren,
    kelurahan,
    latitude,
    longitude,
    sudutSimpang,
    locationAddress,
    persil,
    kategoriPersil,
  ]);

  const mapContainer = useRef(null);
  const map = useRef(null);
  

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `${import.meta.env.VITE_BASEMAPURL}`,
      center: [110.3647275, -7.801408],
      zoom: 14,
      attributionControl: false,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-left");
  }, [])

  function handlePersil(e) {
    if (e.target.value === "Persil Orang atau Badan") {
      setPersil("Persil Orang atau Badan");
    } else if (
      e.target.value ===
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

      <main
        ref={mapContainer}
        className="w-full h-[233px] rounded z-0 relative"
      >
        <label htmlFor="addMarker" className="z-10 absolute top-28 left-[10px] p-1 bg-white rounded-md shadow-sm hover:bg-[#e7e7e7] cursor-pointer">
          {addMarker ? <PiMapPinPlusFill size='20px'/> : <PiMapPinFill size='20px'/>}
        </label>
        <input type="checkbox" id="addMarker" onChange={handleCheckMarker} hidden/>
      </main>

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
        <SelectOption
          option={persilOrang}
          callback={(e) => setKategoriPersil(e.target.value)}
        />
      ) : persil ===
        "Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum" ? (
        <SelectOption
          option={persilPemerintah}
          callback={(e) => setKategoriPersil(e.target.value)}
        />
      ) : null}
    </section>
  );
}

export default KeteranganLokasi;
