import React from 'react';
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
            elevationScale: 1e6,
            getPosition: d => [d.lon, d.lat],
            getFillColor: d => [48, 128, d.value * 255, 255],
            getLineColor: (d, di) => { console.log(d, di); return [0, 0, 0]; },
            getElevation: d => d.value
        }),
    ];

    let zoom_reference = INITIAL_VIEW_STATE.zoom;

    return (
        <div className="bg-gray-700 text-white w-screen h-screen overflow-hidden scroll-none">
        <div className="z-40 position-fixed h-20 w-40 border-2 border-blue-700 mb-0 ml-0">hewwo</div>
        <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            layers={layers} >
            <Map
                className="w-full h-full"
                initialViewState={INITIAL_VIEW_STATE}
                onViewStateChange={ ({viewState}) => {
                    console.log(viewState);
                    zoom_reference = viewState.zoom;
                    return viewState;
                } }
                mapLib={maplibregl}
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            />
        </DeckGL>
        </div>
    );
}

export default App;
