const colors = {
  DEM: 'darkblue',
  REP: 'darkred',
  DRAW: 'grey',
  DEFAULT: '#2f488e'
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

export const getCellColor = (stateFeature, voteInfo) => {
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
