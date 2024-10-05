import React from 'react';
import styled from 'styled-components';
import { colors } from 'lib/mapUtil';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 540px;
  height: 20px;
  background: grey;
  transition: width 0.2s;
  box-sizing: border-box;
`

const BarDEM = styled(Container)`
  width: ${props => props.count+"px"};
  background: ${colors['DEM']};
  border: 2px solid white;
`
const BarHalf = styled(BarDEM)`
  position: absolute;
  background: white;
  width: 2px;
  z-index: 10;
  left: 269px;
  border: 1px solid yellow;
  height: 30px;
`
const BarREP = styled(BarDEM)`
  width: ${props => props.count+"px"};
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