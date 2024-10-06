import React from 'react';
import styled from 'styled-components';
import { colors } from 'lib/mapUtil';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* width: 540px; */
  width: 100%;
  height: 20px;
  background: grey;
  transition: width 0.2s;
  box-sizing: border-box;
`

const BarDEM = styled(Container)`
  width: ${props => (props.count/540)*100 +"%"};
  background: ${colors['DEM']};
  border: 2px solid white;
`
const BarHalf = styled(BarDEM)`
  position: absolute;
  background: white;
  width: 1px ;
  z-index: 10;
  left: 50%;
  border: 1px solid yellow;
  height: 40px;
`
const BarREP = styled(BarDEM)`
  width: ${props => (props.count/540)*100 +"%"};
  background: ${colors['REP']};
  border: 2px solid solid;
`

function CountBar(props) {
  const {DEM_count, REP_count} = props;
  return (
    <Container>
      <BarDEM count={DEM_count}></BarDEM>
      <BarHalf></BarHalf>
      <BarREP count={REP_count}></BarREP>
    </Container>
  )
}

export default React.memo(CountBar);