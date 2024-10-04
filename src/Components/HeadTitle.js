import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  transform: translateX(-50%);
  top: 3%;
  left: 50%;
  color: white;
  z-index: 10;
  min-width: 30%;
`

function HeadTitle(props) {
  const {DEM_count, REP_count, REMAIN_count} = props;
  
  return (
    <Container>
      <div>DEM:{DEM_count}</div>
      <div>REMAIN:{REMAIN_count}</div>
      <div>REP:{REP_count}</div>
    </Container>
  )
}

export default React.memo(HeadTitle);