import React from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import { setBackgroundColor } from 'lib/mapUtil';

const Container = styled.div`
  font-size: 15px;
`

function BackgroundColor(props) {
  const {mapRef} = props;
  const [color, setColor] = React.useState('#413F9B');
  const handleChange = React.useCallback((color) => {
    const map = mapRef.current;
    setColor(color);
    setBackgroundColor(map, color.hex);
  }, [mapRef])
  return (
    <Container>
      <div>background color</div>
      <SketchPicker
        color={color}
        onChange={handleChange}
      ></SketchPicker>
    </Container>
  )
}

export default React.memo(BackgroundColor)