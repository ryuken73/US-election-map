import React from 'react';
import styled from 'styled-components';
import { colors } from 'lib/mapUtil';

const Container = styled.div`
  background: #1e293b;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
`
const Text = styled.div`
  font-size: 25px;
  text-align: left;
`
const StateName = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`
const TotalVotes = styled(Text)`
  font-size: 20px;
  margin-bottom: 10px;
`
const Bold = styled.span`
  font-weight: bold;
`
const ResultBanner = styled(StateName)`
`
const WinnerText = styled(TotalVotes)`
  font-size: 20px;
  font-family: Consolas, Monaco, Lucida Console, monospace;
`
const GraphContainer = styled.div``
const PartyPercent = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 3px;
`
const PartyName = styled.div`
  font-size: 20px;
  margin-right: 20px;
  font-family: Consolas, Monaco, Lucida Console, monospace;
`
const Percentage = styled.div`
  background: ${props => colors[props.party]};
  height: 15px;
  width: ${props => (props.value*3) + 'px'};
  margin-right: 20px;
  transition: width 0.5s;
`
const PercentageValue = styled.div`
  font-size: 15px;
`

function StateVoteInfo(props) {
  const {voteData={}, activeYear} = props;
  const {
    year=2008,
    state,
    state_po,
    total_votes,
    winner,
    DEM_percentage,
    REP_percentage,
    OTHER_percentage
  } = voteData
  console.log(voteData)
  return (
    <Container>
      <StateName>{state}, {state_po}</StateName>
      <TotalVotes><Bold>전체 투표수:</Bold> {total_votes.toLocaleString()}</TotalVotes>
      <ResultBanner>{activeYear} 선거결과</ResultBanner>
      <WinnerText><Bold>Winner:</Bold> {winner}</WinnerText>
      <GraphContainer>
        <PartyPercent>
          <PartyName>DEM</PartyName>
          <Percentage value={DEM_percentage} party="DEM" />
          <PercentageValue>{DEM_percentage}%</PercentageValue>
        </PartyPercent>
        <PartyPercent>
          <PartyName>REP</PartyName>
          <Percentage value={REP_percentage} party="REP" />
          <PercentageValue>{REP_percentage}%</PercentageValue>
        </PartyPercent>
        <PartyPercent>
          <PartyName>OTH</PartyName>
          <Percentage value={OTHER_percentage} party="OTH" />
          <PercentageValue>{OTHER_percentage}%</PercentageValue>
        </PartyPercent>
      </GraphContainer>
    </Container>
  )
}

export default React.memo(StateVoteInfo);
