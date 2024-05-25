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
    // 'circle-stroke-color': 'yellow',
    'circle-stroke-color': [
      'case',
      ['boolean', ['feature-state', 'click'], false],
      'yellow',
      'white'
    ],
    'circle-stroke-width': [
      'case',
      ['boolean', ['feature-state', 'click'], false],
      2,
      0.5
    ],
    'circle-radius': {
      'property': 'ukuran',
      'type': 'categorical',
      'stops': [
        ['Sedang', 5],
        ['Besar', 7],
        // ['', 5]
      ]
    },
    'circle-color': {
      'property': 'ukuran',
      'type': 'categorical',
      'stops': [
        ['Sedang', '#60C3E0'],
        ['Besar', '#105E8C'],
        // ['', 'green']
      ]
    }
  }
}