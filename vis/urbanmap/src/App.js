import React, { useState } from 'react';
import logo from './logo.png';

import { COORDINATE_SYSTEM } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import { ColumnLayer, PointCloudLayer, GeoJsonLayer, ArcLayer } from '@deck.gl/layers';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';

//const MAPSTYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
const MAPSTYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -103.90699029686266,
    latitude: 31.884715226569835,
    altitude: 1.5,
    zoom: 3.2,
    minZoom: 2.35,
    maxZoom: 15,
    pitch: 60,
    bearing: -27.747183979974977,
};

const POPULATION_COLUMNS_DATA = 'http://localhost:3000/data/cities.json';

function App() {
    const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

    const geo_elevation_scale_from_zoom = (zoom) => Math.min(Math.max(Math.pow(2.8, (18 - zoom)), 1e4), 1e6);
    const geo_radius_snapping_log_base = 1.4;
    const geo_radius_from_zoom = (zoom) => Math.min(Math.max(Math.pow(geo_radius_snapping_log_base, Math.floor(Math.log(Math.pow(2.3, 18-zoom))/Math.log(geo_radius_snapping_log_base))), 500), 1e5);

    const layers = [
        new HexagonLayer({
            id: 'population-agg-hexagons',
            data: POPULATION_COLUMNS_DATA,
            opacity: 0.5,
            lowerPercentile: 2,
            pickable: true,
            extruded: true,
            radius: geo_radius_from_zoom(viewState.zoom),
            elevationRange: [0, geo_elevation_scale_from_zoom(viewState.zoom)],
            getPosition: d => [d.lon, d.lat],
            getElevationWeight: d => d.value,
            elevationAggregation: 'SUM',
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
            onViewStateChange={ e => {
                console.log(e.viewState);
                setViewState(e.viewState);
            } }
            layers={layers} >
            <Map
                className="w-full h-full"
                mapLib={maplibregl}
                mapStyle={MAPSTYLE}
            />
        </DeckGL>
        </div>
    );
}

export default App;
