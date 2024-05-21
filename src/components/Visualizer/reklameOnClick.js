import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { AdvertisingContent } from "../Infobar";
import { useContext, useEffect } from "react";
import { mapContext } from "../Context/MapContext";

export function hightlightFeature (featureId, clickState) {
  if (featureId !== null) {
    map.setFeatureState({
      source: 'reklamePoint',
      sourceLayer: '2023_reklame_gdb',
      id: featureId
    }, {click: clickState})
  }
}

export function reklameOnClick(map) {
  const data = useContext(mapContext)
  // const existingData = useContext(mapContext)
  // console.log(existingData);
  map.on('click', 'reklamePoint', function(e) {
    data.setReklameIsClicked(true)

    data.setIdentitasReklame({
      "Kode": e.features[0].properties.kode,
      "Ukuran": e.features[0].properties.ukuran,
      "Jenis reklame": e.features[0].properties.jenis_rklm,
      "Lokasi": `${e.features[0].properties.area_amtn}, ${e.features[0].properties.wadmkd}`,
      "Naskah/konten reklame": e.features[0].properties.naskah,
      "Konstruksi": e.features[0].properties.konstruksi,
      "Jumlah sisi": e.features[0].properties.muka,
      // "Fungsi Jalan": e.features[0].properties.fungsi_jln,
      "Tinggi": `${parseInt(e.features[0].properties.tnggi_baru)} meter`,
      "Ornamen zona khusus/ketat": e.features[0].properties.orn_khs_kt,
      "Ornamen": e.features[0].properties.ornamen,
    })

    data.setPelanggaranReklame({
      "Pelanggaran rokok": e.features[0].properties.pl_rokok,
      "Pelanggaran ketinggian": e.features[0].properties.pl_tinggi,
      "Pelanggaran posisi reklame di atas bangunan": e.features[0].properties.pl_fasa,
      "Pelanggaran posisi reklame di atas bangunan maksimal": e.features[0].properties.pl_fsd_mks,
      "Lokasi di zona khusus": e.features[0].properties.pl_z_khsus,
      "Lokasi di zona ketat": e.features[0].properties.pl_z_ketat,
      "Lokasi terhadap sudut simpang": e.features[0].properties.upd_pl_spg,
      "Jarak antar reklame": e.features[0].properties.upd_jarak,
      "Lokasi terhadap clear area": e.features[0].properties.upd_area_c,
    })

    data.setTindakan({
      "Justifikasi": e.features[0].properties.justifikas,
      "Rekomendasi": e.features[0].properties.rekomendas,
      "Potensi tindakan": e.features[0].properties.potensi_ti,
      "Tindakan yang dilakukan jika tidak dilakukan penyesuaian": e.features[0].properties["potensi be"],
    })
  })
}

export function reklameOnHover(map) {
  map.on('mouseenter', 'reklamePoint', (e) => { // Change the cursor to a pointer when the mouse is over the places layer.
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'reklamePoint', (e) => { // Change it back to a pointer when it leaves.
    map.getCanvas().style.cursor = '';
  })
};