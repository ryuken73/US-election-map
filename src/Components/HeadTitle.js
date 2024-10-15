import React from 'react';
import CountBar from './CountBar';
import styled from 'styled-components';
import FlipNumbers from 'react-flip-numbers';

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
  width: 70%;
  
`
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
`
const PartyContainer = styled(TitleContainer)`
  width: auto;
  align-items: center;
`
const Party = styled.div`
  margin-right: 5px;
`
const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  /* background: rgba(15, 23, 42, 0.8); */
  padding: 10px;
  border-radius: 10px;
  width: 100%;
`
const BarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  z-index: 10;
  width: 100%;
`

function HeadTitle(props) {
  const {activeYear, DEM_count, REP_count, REMAIN_count} = props;
  
  return (
    <Container>
      <TitleContainer>
        {activeYear === 2024 && (
          <PartyContainer>
            <Party>DEM:</Party>
            <FlipNumbers 
              height={40}
              width={25}
              color="white"
              duration={1.5}
              background="transparent"
              perspective={400}
              play 
              numbers={DEM_count.toString()}
            ></FlipNumbers>
          </PartyContainer>
        )}
        <Title>{activeYear} 미국 대선</Title>
        {activeYear === 2024 && (
          <PartyContainer>
            <Party>REP:</Party>
            <FlipNumbers 
              height={40}
              width={25}
              color="white"
              duration={1.5}
              background="transparent"
              perspective={400}
              play 
              numbers={REP_count.toString()}
            ></FlipNumbers>
          </PartyContainer>
        )}
      </TitleContainer>
      {activeYear === 2024 &&(
        <BarContainer>
          <CountBar
            DEM_count={DEM_count}
            REP_count={REP_count}
          ></CountBar>
        </BarContainer>
      )}
    </Container>
  )
}

export default React.memo(HeadTitle);