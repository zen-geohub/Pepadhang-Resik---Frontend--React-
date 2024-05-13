import React, { useState, useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Infobar from "./Infobar";

export const MapContext = React.createContext();

function Map() {
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

    map.current.addControl(new maplibregl.NavigationControl(), "bottom-left");
    // setMapInstance(map.current);

    map.current.on('click', function(e) {
      console.log(e.lngLat);
    })
    
  }, [map.current]);

  return (
    <MapContext.Provider value={map}>
      <div ref={mapContainer} className="h-screen w-full"></div>
      {/* <Infobar /> */}
    </MapContext.Provider>

    // <>
    //   <div ref={mapContainer} className="h-screen w-full"></div>
    //   <button onClick={testMe}>Clickme</button>
    // </>
  );
}

// export { map }
export default Map;
