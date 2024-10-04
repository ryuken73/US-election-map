import React from 'react';
import AlberUSAMap from './Components/AlberUSAMap';
import StateSummary from './Components/StateSummary';
import {
  getAllFeatures,
  getCellColor,
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

  React.useEffect(() => {
    PAST_YEARS.forEach(year => loadPastVote(year));
  }, [loadPastVote])

  return (
    <div className="App">
      <header className="App-header">
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
          activeState={activeState}
        ></StateSummary>
      </header>
    </div>
  );
}

export default App;
