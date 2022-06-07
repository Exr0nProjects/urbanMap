# breadcrumbs

## maplibre-gl

1. had to `yarn add mapbox-gl@npm:empty-npm-package@1.0.0` as per https://visgl.github.io/react-map-gl/docs/get-started/get-started#using-with-a-mapbox-gl-fork
    - from https://github.com/maplibre/maplibre-gl-js 
    - got hint to use maplibre-gl from https://documentation.maptiler.com/hc/en-us/articles/4405444890897-How-to-display-MapLibre-GL-JS-map-using-React-JS
    - since the official docs aren't about react: https://maplibre.org/maplibre-gl-js-docs/api/
1. nevermind, we are now going to use maplibre-gl 1.x to directly replace mapbox-gl, as per https://www.npmjs.com/package/maplibre-gl, pointed to by https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens

1. The missing links were in the examples (who would've guessed)
    - see here: https://github.com/visgl/react-map-gl/blob/7.0-release/examples/get-started/maplibre/app.js
