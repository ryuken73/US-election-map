import React from 'react'
import mapboxgl from 'mapbox-gl'
import config from '../config.json';
import {
  getFeature,
  colors,
  setCellColor,
  getAllFeatures
} from 'lib/mapUtil';
import 'mapbox-gl/dist/mapbox-gl.css';

const {TOKEN, MAPBOX_STYLE, INITIAL_COORD, INITIAL_ZOOM} = config;
const LAYERS = ['state-boundaries']

function AlberUSAMap(props) {
  const {
    mapRef,
    popupRef,
    activeYear=2008,
    activeVoteData,
    setActiveState,
    setPredictData
  } = props;

  console.log('lll', activeYear, activeVoteData)
  const mapContainerRef = React.useRef(null);

  // initialize map
  React.useEffect(() => {
    if(mapContainerRef.current === null){
      console.error('mapContainer is null')
      return;
    }
    console.log('set new Map instance');
    mapboxgl.accessToken = TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAPBOX_STYLE,
      center: INITIAL_COORD,
      zoom: INITIAL_ZOOM
    })
    return () => {
      mapRef.current.remove();
    }
  }, [mapRef])

  const handleClick = React.useCallback((event) => {
    console.log(event);
    const map = mapRef.current;
    const {lngLat} = event;
    const {lat, lng} = lngLat;
    const feature = getFeature(map, event, ['state-boundaries']);
    if(feature === null){
      setActiveState(null);
      return;
    }
    console.log(activeYear, feature)
    if(activeYear === 2024){
      console.log('lll active year is 2024. skip msgbox')
      const {state_fips} = feature.properties;
      setPredictData(predictData => {
        const targetIndex = predictData.findIndex(predict => predict.state_fips_str === state_fips);
        const {winner} = predictData[targetIndex];
        let newWinner;
        if(winner === 'REP'){
          newWinner = 'DEM'
        } else if(winner === 'DEM'){
          newWinner = ''
        } else {
          newWinner = 'REP'
        }
        const cellColor = newWinner === '' ? colors['DEFAULT'] : colors[newWinner];
        setCellColor(map, feature, cellColor);
        return [
          ...predictData.slice(0, targetIndex),
          {...predictData[targetIndex], winner: newWinner},
          ...predictData.slice(targetIndex + 1)
        ]
      })
      return;
    }
    console.log('lll show msgbox')
    popupRef.current = new mapboxgl.Popup({offset: [0, -15], closeButton: false})
      .setLngLat([lng, lat])
      .setHTML(
        `<h3 style="font-size: 20px; min-width: 200px;text-align: center;color: black;">${feature.properties.state_name} [${feature.properties.state_abbrev}]</h3>`
      )
      .addTo(map);
    setActiveState(feature.properties.state_fips);
  }, [activeYear, mapRef, popupRef, setActiveState, setPredictData])

  // attach event handler
  React.useEffect(() => {
    if(mapRef.current === null){
      return
    }
    mapRef.current.on('click', handleClick);
    mapRef.current.on('load', () => {
      mapRef.current.doubleClickZoom.disable();
      mapRef.current.touchZoomRotate.disable();
      // disable move by drag
      mapRef.current.dragPan.disable();
      mapRef.current.touchPitch.disable();
    })
    return () => {
      mapRef.current.off('click', handleClick);
    }
  }, [handleClick, mapRef]);

  return (
    <div id='map-container' ref={mapContainerRef}></div>
  )
}

export default React.memo(AlberUSAMap);
