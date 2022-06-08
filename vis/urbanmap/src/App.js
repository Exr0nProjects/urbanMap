import React, { useState } from 'react';
import logo from './logo.png';

import { COORDINATE_SYSTEM } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import { ColumnLayer, PointCloudLayer, GeoJsonLayer, ArcLayer } from '@deck.gl/layers';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';

const DOMAIN_NAME = 'http://localhost:3000'

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

const POPULATION_COLUMNS_DATA = DOMAIN_NAME + '/data/cities.json';
const LIVABILITY_COLUMNS_DATA = DOMAIN_NAME + '/data/cities_livability.json';

function createLinearGradientRange(left, right, num) {  // create an array of num RGB arrays, including the endpoints
    return Array(num).fill([left, right]).map(([a, b], i) =>
        Array(Math.min(a.length, b.length)).fill(0)
            .map((_, j) => i/(num-1) * b[j] + (1 - i/(num-1)) * a[j])
    );
}

function App() {
    const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

    const geo_elevation_scale_from_zoom = (zoom) => Math.min(Math.max(Math.pow(2.8, (18 - zoom)), 1e4), 1e6);
    const geo_radius_snapping_log_base = 1.4;
    const geo_radius_from_zoom = (zoom) => Math.min(Math.max(Math.pow(geo_radius_snapping_log_base, Math.floor(Math.log(Math.pow(2.3, 18-zoom))/Math.log(geo_radius_snapping_log_base))), 500), 1e5);

    const layers = [
        new HexagonLayer({
            visible: true,
            id: 'walkability-agg-hexagons-avg',
            data: LIVABILITY_COLUMNS_DATA,
            //colorRange: createLinearGradientRange([150, 0, 0], [50, 255, 50], 6),
            colorRange: [[221, 152, 12], [172, 133, 11], [121, 114, 9], [92, 164, 6], [67, 207, 3], [39, 255, 0]],
            opacity: 0.5,
            lowerPercentile: 2,
            pickable: true,
            extruded: true,
            radius: geo_radius_from_zoom(viewState.zoom),
            elevationRange: [0, geo_elevation_scale_from_zoom(viewState.zoom)],
            getPosition: d => [d.snapped_lon, d.snapped_lat],
            getElevationWeight: d => d.walkscore / 100,
            elevationAggregation: 'AVG',
        }),
        new ColumnLayer({
            visible: true,
            id: 'walkability-columns',
            data: LIVABILITY_COLUMNS_DATA,
            diskResolution: 40,
            coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
            radius: 800,
            opacity: 0.8,
            extruded: true,
            pickable: true,
            elevationScale: 1,
            getPosition: d => [d.snapped_lon, d.snapped_lat],
            getFillColor: d => [(1 - d.walkscore / 100) * 255, d.walkscore/100 * 255, 52, 255],
            getLineColor: (d, di) => [0, 0, 0],
            getElevation: d => d.walkscore / 100 * geo_elevation_scale_from_zoom(viewState.zoom) * 1.2,
            updateTriggers: {
                getElevation: viewState.zoom,
            }
        }),
        new HexagonLayer({
            visible: false,
            id: 'population-agg-hexagons',
            data: POPULATION_COLUMNS_DATA,
            opacity: 0.2,
            lowerPercentile: 2,
            pickable: true,
            extruded: true,
            radius: geo_radius_from_zoom(viewState.zoom),
            elevationRange: [0, geo_elevation_scale_from_zoom(viewState.zoom) * 0.7],
            getPosition: d => [d.lon, d.lat],
            getElevationWeight: d => d.value,
            elevationAggregation: 'SUM',
        }),
        //new ColumnLayer({
        //    visible: false,
        //    id: 'population-columns',
        //    data: POPULATION_COLUMNS_DATA,
        //    diskResolution: 40,
        //    coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
        //    radius: 1000,
        //    opacity: 0.5,
        //    extruded: true,
        //    pickable: true,
        //    elevationScale: 1,
        //    getPosition: d => [d.lon, d.lat],
        //    getFillColor: d => [48, 128, d.value * 255, 255],
        //    getLineColor: (d, di) => [0, 0, 0],
        //    getElevation: d => d.value * geo_elevation_scale_from_zoom(viewState.zoom),
        //    updateTriggers: {
        //        getElevation: viewState.zoom,
        //    }
        //}),
    ];

    return (
        <div className="bg-gray-700 text-white w-screen h-screen overflow-hidden scroll-none">
        <div className="z-40 position-fixed h-20 w-40 border-2 border-blue-700 mb-0 ml-0">hewwo</div>
        <DeckGL
            controller={true}
            viewState={viewState}
            onViewStateChange={ e => {
                //console.log(e.viewState);
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
