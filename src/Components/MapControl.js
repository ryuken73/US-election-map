import React from 'react';
import styled from 'styled-components';
import { moveCenter, changeZoom } from 'lib/mapUtil';

const Container = styled.div`
  position: absolute;
  top: 10%;
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
  const {mapRef} = props;
  const moveMap = React.useCallback((event) => {
    const direction = event.target.id;
    const map = mapRef.current;
    moveCenter(map, direction);
  }, [mapRef])
  const zoomMap = React.useCallback((event) => {
    const direction = event.target.id;
    const map = mapRef.current;
    changeZoom(map, direction);
  }, [mapRef])
  return (
    <Container>
      <MoveControl>
        <div>Move</div>
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
    </Container>
  )
}

export default React.memo(MapControl);