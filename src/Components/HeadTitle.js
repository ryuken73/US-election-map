import React from 'react';
import CountBar from './CountBar';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 2%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  
`
const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  /* background: rgba(15, 23, 42, 0.8); */
  padding: 10px;
  width: 70%;
  border-radius: 10px;
`
const BarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  z-index: 10;
  min-width: 40%;
`

function HeadTitle(props) {
  const {activeYear, DEM_count, REP_count, REMAIN_count} = props;
  
  return (
    <Container>
      <Title>{activeYear} 미국 대선</Title>
      {activeYear === 2024 &&(
        <BarContainer>
          <div>DEM:{DEM_count}</div>
          <CountBar
            DEM_count={DEM_count}
            REP_count={REP_count}
          ></CountBar>
          <div>REP:{REP_count}</div>
        </BarContainer>
      )}
    </Container>
  )
}

export default React.memo(HeadTitle);