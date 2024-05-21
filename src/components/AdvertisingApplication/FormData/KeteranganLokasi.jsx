import { useContext, useEffect, useState, useRef } from "react";
import { SelectOption } from "../AdvertisingForm";
import { ResultContext } from "../../Context/ApplicationResult";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as turfBooleanPointInPolygon from '@turf/boolean-point-in-polygon';
import * as turfHelpers from '@turf/helpers';
import { PiMapPinFill, PiMapPinPlusFill } from "react-icons/pi";

function KeteranganLokasi() {
  const [kemantren, setKemantren] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [sudutSimpang, setSudutSimpang] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [persil, setPersil] = useState("");
  const [kategoriPersil, setKategoriPersil] = useState("");

  const [addMarker, setAddMarker] = useState(false);

  const [simpang, setSimpang] = useState()
  const [clearArea, setClearArea] = useState()
  const [zonaKhusus, setZonaKhusus] = useState()
  useEffect(() => {
    (async function addPrequisite() {
      const responseSimpang = await fetch(`${import.meta.env.VITE_BACKEND}/getSimpang`, {method: 'GET'})
      const dataSimpang = await responseSimpang.json()
      setSimpang(turfHelpers.multiPolygon(dataSimpang[0].simpang.geometry.coordinates))

      const responseClearArea = await fetch(`${import.meta.env.VITE_BACKEND}/getClearArea`, {method: 'GET'})
      const dataClearArea = await responseClearArea.json()
      setClearArea(turfHelpers.multiPolygon(dataClearArea[0].cleararea.geometry.coordinates))
      
      const responseZonaKhusus = await fetch(`${import.meta.env.VITE_BACKEND}/getZonaKhusus`, {method: 'GET'})
      const dataZonaKhusus = await responseZonaKhusus.json()
      setZonaKhusus(turfHelpers.multiPolygon(dataZonaKhusus[0].zonakhusus.geometry.coordinates))
    })()
  }, [])

  function handleCheckMarker() {
    setAddMarker(!addMarker);
    let markerAdded
    
    function marker(e) {
      if (markerAdded) {
        markerAdded.remove()
      }

      const coordinates = e.lngLat
      const turfPoint = turfHelpers.point([coordinates.lng, coordinates.lat])
      
      markerAdded = new maplibregl.Marker()
      .setLngLat(coordinates)
      .addTo(map.current);

      if (turfBooleanPointInPolygon.default(turfPoint, clearArea)) {
        alert('Reklame tidak boleh berada di dalam Clear Area!')
        markerAdded.remove()

        setLatitude('')
        setLongitude('')
        setKemantren('')
        setKelurahan('')
        setSudutSimpang('')
      } else if (turfBooleanPointInPolygon.default(turfPoint, zonaKhusus)) {
        alert('Reklame tidak boleh berada di dalam Zona Khusus!')
        markerAdded.remove()

        setLatitude('')
        setLongitude('')
        setKemantren('')
        setKelurahan('')
        setSudutSimpang('')
      } else {
        setLatitude(e.lngLat.lat);
        setLongitude(e.lngLat.lng);
  
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coordinates.lat}&lon=${coordinates.lng}&format=geojson&polygon_geojson=1&addressdetails=1`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
          setKemantren(data.features[0].properties.address.city_district)
          setKelurahan(data.features[0].properties.address.suburb)
        })
  
        turfBooleanPointInPolygon.default(turfPoint, simpang) ? setSudutSimpang('Simpang') : setSudutSimpang('Non-Simpang')
      }
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
      "Kemantren": kemantren,
      "Kelurahan": kelurahan,
      "Koordinat Lintang": latitude,
      "Koordinat Bujur": longitude,
      "Sudut Simpang": sudutSimpang,
      "Lokasi Reklame": locationAddress,
      "Rencana Penempatan": persil,
      "Kategori Persil": kategoriPersil,
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
      style: `https://api.maptiler.com/maps/c49db9ce-72e8-40d7-a607-bd92026c6796/style.json?${import.meta.env.VITE_BASEMAPKEY}`,
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
            defaultValue={kemantren}
            required
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="kelurahan">Kelurahan *</label>
          <input
            id="kelurahan"
            className="form-input min-h-[33.33px] pointer-events-none"
            defaultValue={kelurahan}
            required
          />
        </div>
      </div>

      <div className="flex flex-row w-full gap-4">
        <div className="w-1/2">
          <label htmlFor="latitude">Koordinat Lintang *</label>
          <input
            id="latitude"
            className="form-input min-h-[33.33px] pointer-events-none"
            defaultValue={latitude}
            required
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="longitude">Koordinat Bujur *</label>
          <input
            id="longitude"
            className="form-input min-h-[33.33px] pointer-events-none"
            defaultValue={longitude}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="sudutSimpang">Sudut Simpang *</label>
        <input
          id="sudutSimpang"
          className="form-input min-h-[33.33px] pointer-events-none"
          defaultValue={sudutSimpang}
          // required
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
