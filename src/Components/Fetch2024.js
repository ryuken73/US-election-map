import React from 'react';
import styled from 'styled-components';
import csv from 'csvtojson';
import config from 'config.json';

const Container = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`

const {GOOGLE_SHEET_CSV} = config;
const fetchGoogleSheet = () => {
  return new Promise((resolve, reject) => {
    fetch(GOOGLE_SHEET_CSV)
    .then(data => {
      return data.text()
    })
    .then(results => {
      console.log(results)
      csv().fromString(results)
      .then(data => {
        console.log(data)
        resolve(data);
      })
    })
  })
}

function Fetch2024(props) {
  const {
    setPredictData,
    setFeatureVotePredict,
  } = props;

  const fetchData = React.useCallback(async () => {
    const predictData = await fetchGoogleSheet();
    setPredictData(predictData);
    setFeatureVotePredict(predictData);
  }, [setFeatureVotePredict, setPredictData])

  return (
    <Container>
      <button onClick={fetchData}>Fetch2024</button>
    </Container>
  )
}

export default React.memo(Fetch2024);