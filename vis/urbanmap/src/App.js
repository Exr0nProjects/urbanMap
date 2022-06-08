import React, { useState } from 'react';
import UrbanMap from './components/UrbanMap.jsx';
import logo from './logo.png';

//const MAPSTYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
const MAPSTYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
//const MAPSTYLE = "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";


function App() {
    const [ layerNames, setLayerNames ] = useState(['walkability-agg-hexagons-avg', 'walkability-columns', 'political-columns']);

    return (
        <div className="w-screen overflow-hidden bg-gray-700" style={{height: '100vh', zIndex: -1}}>
            <div className="relative w-screen h-full">
                <UrbanMap layerNames={layerNames} mapStyle={MAPSTYLE} />
            </div>
            <div className="fixed bottom-0 left-0 z-10 flex flex-col-reverse w-screen mb-0 ml-0" style={{padding: '1rem'}}>
                <div className="relative flex flex-col text-white" style={{padding: '1rem', borderRadius: '1rem', width: '20rem', backgroundColor: 'rgba(30, 30, 30, 0.2)', fontFamily: 'Source Code Pro, monospace'}}>
        <p>drag to pan, scroll to zoom, shift to rotate.</p>
                </div>
            </div>
        </div>

    );
}

export default App;
