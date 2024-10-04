import React from 'react';
import styled from 'styled-components';
import StateVoteInfo from './StateVoteInfo';

const Container = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  /* background: rgb(15 23 42); */
  background: #0f172a;
  width: 450px;
  padding: 20px;
  border-radius: 10px;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`
const Button = styled.div`
  cursor: pointer;
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 20px;
  padding-left: 20px;
  max-width: 100px;
  background: ${props => props.color};
  border-radius: 5px;
  border: ${props => props.isActive ? '1px dashed white' : '1px solid black' };
`

function StateSummary(props) {
  const {
    years=[2008, 2012, 2016, 2020, 2024],
    activeYear=2008,
    activeVoteData,
    setActiveYear,
    setFeatureVoteData,
    activeState
  } = props;

  console.log('active state:', activeState, activeVoteData)

  const voteData = activeVoteData?.find(voteData => {
    return voteData.state_fips_str === activeState;
  })

  console.log(voteData)

  const handleClick = React.useCallback((event) => {
    const targetYear = parseInt(event.target.id);
    setActiveYear(targetYear);
    setFeatureVoteData(targetYear);
  }, [setActiveYear, setFeatureVoteData])

  return (
    <Container>
      {activeState !== null && voteData !== undefined && (
        <StateVoteInfo
          activeYear={activeYear}
          voteData={voteData}
        ></StateVoteInfo>
      )}
      <ButtonContainer>
        {years.map(year => (
          <Button
            id={year}
            isActive={activeYear === year}
            color="rgb(69 10 10)"
            onClick={handleClick}
          >{year}</Button>
        ))}

      </ButtonContainer>
    </Container>
  )
}

export default React.memo(StateSummary);