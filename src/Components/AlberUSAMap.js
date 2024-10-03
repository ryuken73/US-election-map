import React from 'react'
import mapboxgl from 'mapbox-gl'
import config from '../config.json';
import 'mapbox-gl/dist/mapbox-gl.css';

const {TOKEN, MAPBOX_STYLE, INITIAL_COORD, INITIAL_ZOOM} = config;

function AlberUSAMap(props) {
  const {mapRef} = props;
  const mapContainerRef = React.useRef(null);
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
  return (
    <div id='map-container' ref={mapContainerRef}></div>
  )
}

export default React.memo(AlberUSAMap);
