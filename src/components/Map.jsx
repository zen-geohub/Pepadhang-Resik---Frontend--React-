import React, { useState, useEffect, useRef, useContext } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { mapContext } from "./Context/MapContext";
import Infobar from "./Infobar";
import { reklamePointLayer, reklamePointSource } from "./Visualizer/spatialData";
import { reklameOnHover } from "./Visualizer/reklameOnClick";
import Filter from "./Visualizer/Filter";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const data = useContext(mapContext);

  const [selectedFeature, setSelectedFeature] = useState(null);
  const [previousFeature, setPreviousFeature] = useState(null);
  
  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/c49db9ce-72e8-40d7-a607-bd92026c6796/style.json?${import.meta.env.VITE_BASEMAPKEY}`,
      center: [110.3647275, -7.801408],
      zoom: 14,
      attributionControl: false,
    });
    
    map.current.addControl(new maplibregl.NavigationControl(), "bottom-left");

    map.current.on('load', function() {
      map.current.addSource('reklamePoint', reklamePointSource)
      map.current.addLayer(reklamePointLayer)

      map.current.on('click', 'reklamePoint', function(e) {
        
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
          "Kesesuaian ketentuan reklame rokok": e.features[0].properties.pl_rokok,
          "Kesesuaian ketinggian": e.features[0].properties.pl_tinggi,
          "Kesesuaian posisi reklame di atas bangunan": e.features[0].properties.pl_fasa,
          "Kesesuaian posisi reklame di atas bangunan maksimal": e.features[0].properties.pl_fsd_mks,
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
          "Tindakan yang dilakukan jika tidak dilakukan penyesuaian": e.features[0].properties.potensi_be,
        })

        setSelectedFeature(e.features[0].id)
      })
    })
    reklameOnHover(map.current)
    
  }, []);

  useEffect(() => {
    const hightlightFeature = (featureId, clickState) => {
      if (featureId !== null) {
        map.current.setFeatureState(
          {
            source: 'reklamePoint',
            sourceLayer: 'reklame_pt_84',
            id: featureId
          },
          { click: clickState }
        );
      }
    };

    hightlightFeature(previousFeature, false);
    setPreviousFeature(selectedFeature);
    hightlightFeature(selectedFeature, true);
  }, [selectedFeature, previousFeature]);

  return (
    <>
      <div ref={mapContainer} className="h-screen w-full"></div>
      <Infobar />
      <Filter filterState={data.showFilter} map={map.current}/>
    </>
  );
}

export default Map;