import React from 'react';
import HeadTitle from 'Components/HeadTitle';
import AlberUSAMap from './Components/AlberUSAMap';
import StateSummary from './Components/StateSummary';
import {
  getAllFeatures,
  getCellColor,
  getCellColorPredict,
  setCellColor,
  updatePaint,
} from 'lib/mapUtil'
import './App.css';

const PAST_YEARS = [2008, 2012, 2016, 2020];
const LAYERS = ['state-boundaries']

function App() {
  const mapRef = React.useRef(null);
  const [activeYear, setActiveYear] = React.useState(2008);
  const [activeState, setActiveState] = React.useState(null);
  const [voteData, setVoteData] = React.useState({});
  const [predictData, setPredictData] = React.useState([]);

  const {DEM_count, REP_count, REMAIN_count} = predictData.reduce((acct, data) => {
    const newAcct = {...acct};
    const {winner, electoral} = data;
    if(winner === 'DEM'){
      newAcct.DEM_count = acct.DEM_count + parseInt(electoral);
    }
    if(winner === 'REP'){
      newAcct.REP_count = acct.REP_count + parseInt(electoral);
    }
    if(winner === ''){
      newAcct.REMAIN_count = acct.REMAIN_count + parseInt(electoral);
    }
    return newAcct;
  }, {DEM_count: 0, REP_count: 0, REMAIN_count: 0})
  // load past vote data and save voteData state variable
  const loadPastVote = React.useCallback((year) => {
    fetch(`/${year}.json`)
    .then(data => {
      return data.json()
    })
    .then(results => {
      console.log(results);
      setVoteData(voteData => {
        return {
          ...voteData,
          [year]: results
        }
      })
    })
  }, [])

  const activeVoteData = React.useMemo(() => {
    return voteData[activeYear]
  }, [activeYear, voteData]);

  const setFeatureVoteData = React.useCallback((targetYear) => {
    const map = mapRef.current;
    const targetVoteData = voteData[targetYear];
    const stateFeatures = getAllFeatures(map, LAYERS);
    console.log(stateFeatures);
    stateFeatures.forEach((stateFeature, i) => {
      console.log('processing...', stateFeature.properties.state_abbrev, i)
      const cellColor = getCellColor(stateFeature, targetVoteData)
      setCellColor(map, stateFeature, cellColor);
    })
    updatePaint(map);
  }, [voteData])

  const setFeatureVotePredict = React.useCallback((predictData) => {
    const map = mapRef.current;
    const stateFeatures = getAllFeatures(map, LAYERS);
    stateFeatures.forEach((stateFeature, i) => {
      console.log('processing...', stateFeature.properties.state_abbrev, i)
      const cellColor = getCellColorPredict(stateFeature, predictData)
      setCellColor(map, stateFeature, cellColor);
    })
  }, [])

  React.useEffect(() => {
    PAST_YEARS.forEach(year => loadPastVote(year));
  }, [loadPastVote])

  return (
    <div className="App">
      <header className="App-header">
        <HeadTitle 
          DEM_count={DEM_count} 
          REMAIN_count={REMAIN_count}
          REP_count={REP_count}
        ></HeadTitle>

        <AlberUSAMap 
          activeYear={activeYear}
          activeVoteData={activeVoteData}
          setActiveState={setActiveState}
          mapRef={mapRef}
        ></AlberUSAMap>
        <StateSummary
          years={[...PAST_YEARS, 2024]}
          activeYear={activeYear}
          activeVoteData={activeVoteData}
          setActiveYear={setActiveYear}
          setFeatureVoteData={setFeatureVoteData}
          setFeatureVotePredict={setFeatureVotePredict}
          setPredictData={setPredictData}
          activeState={activeState}
        ></StateSummary>
      </header>
    </div>
  );
}

export default App;
