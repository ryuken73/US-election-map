import React from 'react';
import HeadTitle from 'Components/HeadTitle';
import MapControl from 'Components/MapControl';
import ShowControl from 'Components/ShowControl';
import AlberUSAMap from './Components/AlberUSAMap';
import Fetch2024 from 'Components/Fetch2024';
import StateSummary from './Components/StateSummary';
import useLocalStorage from 'hooks/useLocalStorage';
import {
  getAllFeatures,
  getCellColor,
  getCellColorPredict,
  setCellColor,
  setLineColor,
  updatePaint,
  updatePaintLinecolor
} from 'lib/mapUtil'
import './App.css';

const PAST_YEARS = [2008, 2012, 2016, 2020];
const LAYERS = ['state-boundaries'];
const LAYER_LINE = ['state-boundaries-line'];
const LOCAL_STORAGE_KEY = 'SBS-US-ELECTION-2024'

function App() {
  const [activeYear, setActiveYear] = React.useState(null);
  const [activeState, setActiveState] = React.useState(null);
  const [voteData, setVoteData] = React.useState({});
  const [predictData, setPredictData] = React.useState([]);
  const [showControl, setShowControl] = React.useState(false);
  const mapRef = React.useRef(null);
  const popupRef = React.useRef(null);
  const [savedOptions, saveOptions] = useLocalStorage(LOCAL_STORAGE_KEY, {});

  const saveMapOption = React.useCallback((key, value) => {
    saveOptions({
      ...savedOptions,
      [key]: value
    })
  }, [saveOptions, savedOptions])

  console.log('predictData:', predictData)
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
    // const stateFeaturesLine = getAllFeatures(map, LAYER_LINE);
    // stateFeaturesLine.forEach((stateFeature, i) => {
    //   console.log('processing...', stateFeaturesLine, stateFeature.properties.state_abbrev, i)
    //   setLineColor(map, stateFeature, 'white');
    // })
    // stateFeaturesLine.forEach((stateFeature, i) => {
    //   if(['WI', 'MI', 'PA', 'NC', 'GA', 'NV', 'AZ'].includes(stateFeature.properties.state_abbrev)){
    //     setLineColor(map, stateFeature, 'yellow');
    //   }
    // })
    // updatePaintLinecolor(map)
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
    updatePaint(map);
  }, [])

  React.useEffect(() => {
    PAST_YEARS.forEach(year => loadPastVote(year));
  }, [loadPastVote])

  return (
    <div className="App">
      <header className="App-header">
        <HeadTitle 
          activeYear={activeYear}
          DEM_count={DEM_count} 
          REMAIN_count={REMAIN_count}
          REP_count={REP_count}
        ></HeadTitle>
        {showControl && (
          <MapControl
            mapRef={mapRef}
            savedOptions={savedOptions}
            saveMapOption={saveMapOption}
          ></MapControl>
        )}
        <AlberUSAMap 
          activeYear={activeYear}
          activeVoteData={activeVoteData}
          setActiveState={setActiveState}
          setPredictData={setPredictData}
          savedOptions={savedOptions}
          mapRef={mapRef}
          popupRef={popupRef}
        ></AlberUSAMap>
        <ShowControl 
          showControl={showControl}
          setShowControl={setShowControl}
        >
        </ShowControl>
        {activeYear === 2024 && (
          <Fetch2024
            setPredictData={setPredictData}
            setFeatureVotePredict={setFeatureVotePredict}
          ></Fetch2024>
        )}
        <StateSummary
          years={[...PAST_YEARS, 2024]}
          activeYear={activeYear}
          activeVoteData={activeVoteData}
          setActiveYear={setActiveYear}
          setActiveState={setActiveState}
          setFeatureVoteData={setFeatureVoteData}
          setFeatureVotePredict={setFeatureVotePredict}
          setPredictData={setPredictData}
          activeState={activeState}
          predictData={predictData}
          popupRef={popupRef}
        ></StateSummary>
      </header>
    </div>
  );
}

export default App;
