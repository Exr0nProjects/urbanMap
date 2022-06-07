import React from 'react';
import logo from './logo.png';

import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
//import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
//import 'maplibre-gl/dist/maplibre-gl.css';


// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0
};

// Data to be used by the LineLayer
const data = [
    {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
];

function App() {

    const layers = [
        new LineLayer({id: 'line-layer', data})
    ];
    return (
        <div className="bg-gray-700 p-4 text-white w-screen h-screen overflow-none">
        <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
        {/*            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={layers}>
                <Map />
            </DeckGL>
            */}
        </div>
    );
}

export default App;
