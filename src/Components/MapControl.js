import React from 'react';
import styled from 'styled-components';
import { moveCenter, changeZoom } from 'lib/mapUtil';
import BackgroundColor from './BackgroundColor';

const Container = styled.div`
  position: absolute;
  top: 20%;
  right: 5%;
  z-index: 1;
  color: white;
  user-select: none;
`
const MoveControl = styled.div`
  font-size: 15px;  
`
const ZoomControl = styled(MoveControl)``

function MapControl(props) {
  const [position, setPosition] = React.useState({lat:0, lng:0});
  const {mapRef, savedOptions, saveMapOption} = props;

  console.log('savedOptions:',savedOptions)

  const moveMap = React.useCallback((event) => {
    const direction = event.target.id;
    const map = mapRef.current;
    const position = moveCenter(map, direction);
    setPosition(position);
    saveMapOption('position', position);
  }, [mapRef, saveMapOption])

  const zoomMap = React.useCallback((event) => {
    const direction = event.target.id;
    const map = mapRef.current;
    const zoom = changeZoom(map, direction);
    saveMapOption('zoom', zoom);
  }, [mapRef, saveMapOption])

  return (
    <Container>
      <MoveControl>
        <div>Move[lat:{position.lat.toFixed(2)}, lng:{position.lng.toFixed(2)}]</div>
        <button id="left" onClick={moveMap}>go left</button>
        <button id="right" onClick={moveMap}>go right</button>
        <button id="up" onClick={moveMap}>go up</button>
        <button id="down" onClick={moveMap}>go down</button>
      </MoveControl>
      <ZoomControl>
        <div>Zoom</div>
        <button id="zoom-in" onClick={zoomMap}>zoom in</button>
        <button id="zoom-out" onClick={zoomMap}>zoom out</button>
      </ZoomControl>
      {/* <BackgroundColor
        mapRef={mapRef}
        saveMapOption={saveMapOption}
      >
      </BackgroundColor> */}
    </Container>
  )
}

export default React.memo(MapControl);