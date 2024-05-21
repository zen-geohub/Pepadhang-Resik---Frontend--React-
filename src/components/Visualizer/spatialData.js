export const reklamePointSource = {
  type: 'vector',
  scheme: 'tms',
  tiles: [`${import.meta.env.VITE_GEOSERVER}/gwc/service/tms/1.0.0/ppids:reklame_pt_84@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`]
}

export const reklamePointLayer = {
  "id": "reklamePoint",
  "type": "circle",
  "source": "reklamePoint",
  "source-layer": "reklame_pt_84",
  'paint': {
    'circle-radius': 5,
    'circle-stroke-color': 'yellow',
    // 'circle-stroke-color': 'blue',
    'circle-stroke-width': [
      'case',
      ['boolean', ['feature-state', 'click'], false],
      2,
      0
    ],
    'circle-color': {
      'property': 'ukuran',
      'type': 'categorical',
      'stops': [
        ['Sedang', 'red'],
        ['Besar', 'blue'],
        // ['', 'green']
      ]
    }
  }
}