import React, { useState } from 'react';
import logo from './logo.png';

import { COORDINATE_SYSTEM } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import { ColumnLayer, PointCloudLayer, GeoJsonLayer, ArcLayer } from '@deck.gl/layers';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
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

const POPULATION_COLUMNS_DATA = 'http://localhost:3000/data/cities.json';

function App() {
    const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

    const geo_elevation_scale_from_zoom = (zoom) => Math.min(Math.max(Math.pow(2.8, (18 - zoom)), 1e4), 1e6);

    const layers = [
        new HexagonLayer({
            id: 'population-hexagons',
            data: POPULATION_COLUMNS_DATA,
            pickable: true,
            extruded: true,
            radius: 1000,
            elevationScale: 1,
            getPosition: d => [d.lon, d.lat],

            //getElevationWeight: d => d.value * geo_elevation_scale_from_zoom(viewState.zoom),
            //elevationAggregation: 'SUM',
            getElevationValue: d => {
                //console.log(d);
                //if (Math.random() < 1e-4) console.log('elevation = ',d.map(x => x.value).reduce((a, b) => a+b, 0) * geo_elevation_scale_from_zoom(viewState.zoom));
                const sum_of_values = d.map(x => x.value).reduce((a, b) => a+b, 0);
                if (Math.random() < 1e-4) console.log(sum_of_values, geo_elevation_scale_from_zoom(viewState.zoom));
                return sum_of_values * geo_elevation_scale_from_zoom(viewState.zoom);
            return d.value * geo_elevation_scale_from_zoom(viewState.zoom);
            },

            updateTriggers: {
                getElevationValue: viewState.zoom,
            }

            //getColorValue: d => d.value,
            //getFillColor: d => [48, 128, d.value * 255, 255],
            //lineColor: [0, 0, 0],
        }),
        new ColumnLayer({
            visible: false,
            id: 'population-columns',
            data: POPULATION_COLUMNS_DATA,
            diskResolution: 40,
            coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
            radius: 1000,
            opacity: 0.5,
            extruded: true,
            pickable: true,
            elevationScale: 1,
            getPosition: d => [d.lon, d.lat],
            getFillColor: d => [48, 128, d.value * 255, 255],
            getLineColor: (d, di) => [0, 0, 0],
            getElevation: d => d.value * geo_elevation_scale_from_zoom(viewState.zoom),
            updateTriggers: {
                getElevation: viewState.zoom,
            }
        }),
    ];

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
