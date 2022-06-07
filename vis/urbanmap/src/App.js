import React from 'react';
import logo from './logo.png';

import { COORDINATE_SYSTEM } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import { ColumnLayer, PointCloudLayer, GeoJsonLayer, ArcLayer } from '@deck.gl/layers';
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


// from https://github.com/visgl/deck.gl/blob/master/examples/get-started/react/arcgis/app.js
const AIR_PORTS = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const COLUMNS = 'http://localhost:3000/data/simplemaps_basic_top20_columns.json';

function App() {

    //const layers = [
    //    new GeoJsonLayer({
    //        id: 'airports',
    //        data: AIR_PORTS,
    //         Styles
    //        filled: true,
    //        pointRadiusMinPixels: 2,
    //        pointRadiusScale: 2000,
    //        getPointRadius: f => 11 - f.properties.scalerank,
    //        getFillColor: [200, 0, 80, 180],
    //         Interactive props
    //        pickable: true,
    //        autoHighlight: true,
    //        onClick: info =>
    //        info.object &&
    //         eslint-disable-next-line
    //        alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
    //    }),
    //    new ArcLayer({
    //        id: 'arcs',
    //        data: AIR_PORTS,
    //        dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
    //         Styles
    //        getSourcePosition: f => [-0.4531566, 51.4709959],  London
    //        getTargetPosition: f => f.geometry.coordinates,
    //        getSourceColor: [0, 128, 200],
    //        getTargetColor: [200, 0, 80],
    //        getWidth: 1
    //    })
    //]

    const layers = [
        new ColumnLayer({
            id: 'column-layer',
            data: COLUMNS,
            diskResolution: 40,
            coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
            radius: 1000,
            opacity: 1,
            extruded: true,
            pickable: true,
            elevationScale: 18000000,
            getPosition: d => d.centroid,
            getFillColor: d => [48, 128, d.value * 255, 255],
            //getFillColor: d => [48, 128, 255, 255],
            //getLineColor: [0, 0, 0],
            getElevation: d => d.value
            //getElevation: d => 1000000
        }),
    //    new PointCloudLayer({
    //        id: 'point-cloud-layer',
    //        cities_locations_pointcloud,
    //        pickable: false,
    //        coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    //        coordinateOrigin: [-122.4, 37.74],
    //        radiusPixels: 4,
    //        getPosition: d => d.position,
    //        getNormal: d => d.normal,
    //        getColor: d => d.color
    //    })
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
