export const colors = {
  DEM: 'darkblue',
  REP: 'darkred',
  DRAW: 'grey',
  OTH: 'grey',
  DEFAULT: 'grey',
  // DEFAULT: '#2f488e'
}

const source = 'composite';
const sourceLayer = 'albersusa';

export const getFeature = (map, event, layers) => {
  const features = map.queryRenderedFeatures(event.point, {
    layers
  })
  console.log(features);
  if(!features.length){
    return null;
  }
  const feature = features[0];
  return feature;
}

export const getAllFeatures = (map, layers) => {
  return map.queryRenderedFeatures({
    layers
  })
}

export const getCellColor = (stateFeature, voteInfo=[]) => {
  const {state_fips} = stateFeature.properties
  const targetVoteInfo = voteInfo.find(info => {
    return info.state_fips_str === state_fips
  })
  if(targetVoteInfo === undefined){
    console.error('no feature with fips =', state_fips);
    return colors.DEFAULT
  }
  return colors[targetVoteInfo['winner']];
}

export const getCellColorPredict = (stateFeature, voteInfo=[]) => {
  const {state_fips} = stateFeature.properties
  const targetVoteInfo = voteInfo.find(info => {
    return info.state_fips_str === state_fips
  })
  if(targetVoteInfo === undefined){
    console.error('no feature with fips =', state_fips);
    return colors.DEFAULT
  }
  const cellColor = targetVoteInfo['winner'] === '' ? colors['DEFAULT'] : colors[targetVoteInfo['winner']];
  console.log('cellColor=',colors.DEFAULT, cellColor, targetVoteInfo['winner'])
  return cellColor
}

export const setCellColor = (map, stateFeature, cellColor) => {
  const {id} = stateFeature;
  console.log(stateFeature.properties.state_fips, stateFeature.properties.state_abbrev, cellColor)
  map.setFeatureState({id, source, sourceLayer}, {cellColor});
}

export const updatePaint = (map) => {
  map.setPaintProperty(
    'state-boundaries',
    'fill-color',
    ['feature-state', 'cellColor']
  )
}

export const setBackgroundColor = (map, color) => {
  map.setPaintProperty(
    'background',
    'background-color',
    color
  )
}

export const moveCenter = (map, direction) => {
  const position = map.getCenter()
  const offset = direction === 'left' || direction === 'down' ? 0.2 : -0.2;
  let movedPosition;
  if(direction === 'left' || direction === 'right'){
    movedPosition = {
      ...position,
      lng: position.lng + offset
    }
  } else {
    movedPosition = {
      ...position,
      lat: position.lat + offset
    }
  }
  map.setCenter(movedPosition)
  return movedPosition;
}

export const changeZoom = (map, direction) => {
  const zoomLevel = map.getZoom()
  const target = direction === 'zoom-in' ? 0.05 : -0.05;
  const newZoomLevel = zoomLevel + target;
  map.setZoom(newZoomLevel);
}