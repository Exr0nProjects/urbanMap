import React, { useState } from 'react';
import logo from './logo.png';

import { COORDINATE_SYSTEM } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import { ColumnLayer, PointCloudLayer, GeoJsonLayer, ArcLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';


// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 65,
    bearing: 0
};

const COLUMNS = 'http://localhost:3000/data/cities.json';

function App() {
    const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

    const layers = [
        new ColumnLayer({
            id: 'population-columns',
            data: COLUMNS,
            diskResolution: 40,
            coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
            radius: 1000,
            opacity: 0.5,
            extruded: true,
            pickable: true,
            //elevationScale: 1e6,
            elevationScale: 1,
            //getElevationScale: d => { console.log(viewState.zoom); return viewState.zoom },
            getPosition: d => [d.lon, d.lat],
            getFillColor: d => [48, 128, d.value * 255, 255],
            getLineColor: (d, di) => [0, 0, 0],
            getElevation: d => {
                if (Math.random() < 1e-4) console.log(Math.pow(3.2, (16 - viewState.zoom)))

                //return Math.pow((1 - viewState.zoom/20) * 200, 2);
                return d.value * Math.min(Math.max(Math.pow(2.8, (18 - viewState.zoom)), 1e4), 1e6);
                //return d.value * Math.max(Math.pow(3.2, (16 - viewState.zoom)), 5e4);
            },


            //getElevation: d => d.value / viewState.zoom
            //elevation: d => { if (Math.random() < 1e-4) console.log(viewState.zoom); return Math.pow(2, viewState.zoom) * 1000 }
            //getElevation: d => { if (Math.random() < 1e-4) console.log(viewState.zoom); return Math.pow(1-viewState.zoom/20, 2) * 1e3 },
            updateTriggers: {
                getElevation: viewState.zoom,
            }
        }),
    ];

    //let zoom_reference = INITIAL_VIEW_STATE.zoom;

    return (
        <div className="bg-gray-700 text-white w-screen h-screen overflow-hidden scroll-none">
        <div className="z-40 position-fixed h-20 w-40 border-2 border-blue-700 mb-0 ml-0">hewwo</div>
        <DeckGL
            controller={true}
            viewState={viewState}
            onViewStateChange={ e => { setViewState(e.viewState) } }
            layers={layers} >
            <Map
                className="w-full h-full"
                mapLib={maplibregl}
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            />
        </DeckGL>
        </div>
    );
}

export default App;
