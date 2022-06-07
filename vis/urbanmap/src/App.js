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
            id: 'column-layer',
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
            getLineColor: [0, 0, 0],
            getElevation: d => d.value
        }),
    ];

    return (
        <div className="bg-gray-700 text-white w-screen h-screen overflow-none scroll-none">
        <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            layers={layers} >
            <Map
                className="w-full h-full"
                initialViewState={INITIAL_VIEW_STATE}
                mapLib={maplibregl}
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            />
        </DeckGL>
        </div>
    );
}

export default App;
