import React from 'react';
import AlberUSAMap from './Components/AlberUSAMap';
import StateSummary from './Components/StateSummary';
import './App.css';

function App() {
  const mapRef = React.useRef();
  const [activeYear, setActiveYear] = React.useState(2008);
  return (
    <div className="App">
      <header className="App-header">
        <AlberUSAMap mapRef={mapRef}></AlberUSAMap>
        <StateSummary
          activeYear={activeYear}
          setActiveYear={setActiveYear}
        ></StateSummary>
      </header>
    </div>
  );
}

export default App;
