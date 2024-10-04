import React from 'react'
import mapboxgl from 'mapbox-gl'
import config from '../config.json';
import {
  getFeature,
} from 'lib/mapUtil';
import 'mapbox-gl/dist/mapbox-gl.css';

const {TOKEN, MAPBOX_STYLE, INITIAL_COORD, INITIAL_ZOOM} = config;

function AlberUSAMap(props) {
  const {
    mapRef,
    activeYear=2008,
    activeVoteData,
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

  // attach event handler
  React.useEffect(() => {
    if(mapRef.current === null){
      return
    }
    mapRef.current.on('click', (event) => {
      console.log(event);
      const map = mapRef.current;
      const {lngLat} = event;
      const {lat, lng} = lngLat;
      const feature = getFeature(map, event, ['state-boundaries']);
      if(feature === null){
        return;
      }
      new mapboxgl.Popup({offset: [0, -15], closeButton: false})
        .setLngLat([lng, lat])
        .setHTML(
          `<h3 style="font-size: 20px; min-width: 200px;text-align: center;">${feature.properties.state_name} [${feature.properties.state_abbrev}]</h3>`
        )
        .addTo(map);
    })
  }, [mapRef])

  return (
    <div id='map-container' ref={mapContainerRef}></div>
  )
}

export default React.memo(AlberUSAMap);
