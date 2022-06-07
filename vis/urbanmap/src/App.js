import React from 'react';
import logo from './logo.png';

import { COORDINATE_SYSTEM } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import { ColumnLayer, PointCloudLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import cities_population from './data/simplemaps_basic_top20_columns.json';
import cities_locations_pointcloud from './data/simplemaps_basic_top20_pointcloud.json';
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
//const data = [
//    {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
//];
//
//c

function App() {

    const layers = [
        new ColumnLayer({
            id: 'column-layer',
            cities_population,
            diskResolution: 12,
            coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
            radius: 25,
            opacity: 1,
            extruded: true,
            pickable: true,
            elevationScale: 1/1000,
            getPosition: d => d.centroid,
            //getFillColor: d => [48, 128, d.value * 255, 255],
            getFillColor: d => [48, 128, 255, 255],
            //getLineColor: [0, 0, 0],
            //getElevation: d => d.value
            getElevation: d => 1000
        }),
        new PointCloudLayer({
            id: 'point-cloud-layer',
            cities_locations_pointcloud,
            pickable: false,
            coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
            coordinateOrigin: [-122.4, 37.74],
            radiusPixels: 4,
            getPosition: d => d.position,
            getNormal: d => d.normal,
            getColor: d => d.color
        })
    ];

    return (
        <div className="bg-gray-700 text-white w-screen h-screen overflow-none scroll-none">
        <DeckGL
            initialViewState={{longitude: -122.45, latitude: 37.78, zoom: 12, pitch: 45, bearing: 0}}
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
