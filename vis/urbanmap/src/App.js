import React, { useState } from 'react';
import UrbanMap from './components/UrbanMap.jsx';
import logo from './logo.png';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

//const MAPSTYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
const MAPSTYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
//const MAPSTYLE = "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";


function App() {
    //const [ layerNames, setLayerNames ] = useState(['walkability-agg-hexagons-avg', 'walkability-columns', 'political-columns']);

    const checkboxesText = {
        "walkability-agg-hexagons-max": ["Max aggregate walkability", false],
        "walkability-agg-hexagons-avg": ["Avg aggregate walkability", true],
        "walkability-columns": ["Walkability datapoints", true],
        "population-agg-hexagons": ["Aggregate population", false],
        "population-columns": ["Population centers", false],
        "political-columns": ["Political scatter plot", true],
    };


    // we handle the checkbox state ourselves, so that we can pass it down to components
    const defaultStates = Object.fromEntries(Object.entries(checkboxesText).map(([k, v]) => [k, v[1]]));  // get the second thing in the tuple for each one, then convert back to a dicitonary
    const [ checkboxesState, setCheckboxesState ] = useState(defaultStates);
    const handleCheck = e => {
        setCheckboxesState({
            ...checkboxesState,
            [e.target.name]: e.target.checked
        });
    }

    const layerNames = Object.keys(checkboxesState).filter(k => checkboxesState[k]);
    console.log(layerNames)

    return (
        <div className="w-screen overflow-hidden bg-gray-700" style={{height: '100vh', zIndex: -1}}>
            <div className="relative w-screen h-full">
                <UrbanMap layerNames={layerNames} mapStyle={MAPSTYLE} />
            </div>


            <div className="fixed bottom-0 left-0 z-10 flex flex-col-reverse w-screen mb-0 ml-0" style={{padding: '1rem', pointerEvents: 'none'}}>
                <div className="relative flex flex-col text-white" style={{padding: '1rem', borderRadius: '1rem', width: '21rem', backgroundColor: 'rgba(30, 30, 30, 0.2)', fontFamily: 'Helvetica', userSelect: 'none'}}>
        <p>Drag to pan, scroll to zoom, shift to rotate.<br/></p>

        <FormGroup>
        { Object.entries(checkboxesState).map(([k, v], i) =>
            <FormControlLabel
                control={<Checkbox checked={v} onChange={handleCheck} name={k} />}
                label={checkboxesText[k][0]} key={i} /> ) }
        </FormGroup>

                </div>
            </div>
        </div>

    );
}

export default App;
