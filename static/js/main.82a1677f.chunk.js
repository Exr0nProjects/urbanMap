(this.webpackJsonpurbanMap=this.webpackJsonpurbanMap||[]).push([[0],{115:function(e,t){},147:function(e,t){},156:function(e,t){},185:function(e,t,a){e.exports=a(198)},190:function(e,t,a){},191:function(e,t){},194:function(e,t,a){e.exports=a.p+"static/media/logo.1ffea6bb.png"},198:function(e,t,a){"use strict";a.r(t);var n=a(2),o=a.n(n),i=a(94),l=a.n(i),r=(a(190),a(0)),c=a(1),s=a(8),u=a(17),g=a(228),m=a(231),p=a(232),d=a(161),f=a(159),b=a.n(f),v="https://urbanmap.exr0n.com",h={longitude:-103.90699029686266,latitude:31.884715226569835,altitude:1.5,zoom:3.2,minZoom:2.35,maxZoom:15,pitch:60,bearing:-27.747183979974977},w=v+"/data/cities_livability.json",y=function(e){return Math.min(Math.max(Math.pow(2.8,18-e),1e4),1e6)},k=function(e){return Math.min(Math.max(Math.pow(1.4,Math.floor(Math.log(Math.pow(2.3,18-e))/Math.log(1.4))),500),1e5)},x=function(e){var t=e.layerNames,a=e.mapStyle,i=Object(n.useState)(h),l=Object(s.a)(i,2),r=l[0],c=l[1],f={"walkability-agg-hexagons-max":new p.a({id:"walkability-agg-hexagons-max",data:w,colorRange:[[221,152,112],[172,133,111],[121,114,109],[92,164,106],[67,207,103],[39,255,100]],opacity:.1,coverage:.3,lowerPercentile:2,pickable:!0,extruded:!0,radius:k(r.zoom),elevationRange:[0,y(r.zoom)],getPosition:function(e){return[e.snapped_lon,e.snapped_lat]},getElevationWeight:function(e){return e.walkscore/100},elevationAggregation:"MAX"}),"walkability-agg-hexagons-avg":new p.a({visible:!0,id:"walkability-agg-hexagons-avg",data:w,colorRange:[[221,152,12],[172,133,11],[121,114,9],[92,164,6],[67,207,3],[39,255,0]],opacity:.7,lowerPercentile:2,pickable:!0,extruded:!0,radius:.8*k(r.zoom),coverage:.7,elevationRange:[0,y(r.zoom)],getPosition:function(e){return[e.snapped_lon,e.snapped_lat]},getElevationWeight:function(e){return e.walkscore/100},elevationAggregation:"AVG"}),"walkability-columns":new m.a({id:"walkability-columns",data:w,diskResolution:40,coordinateSystem:u.a.LNGLAT,radius:800,opacity:.8,extruded:!0,pickable:!0,elevationScale:1,getPosition:function(e){return[e.snapped_lon,e.snapped_lat]},getFillColor:function(e){return[255*(1-e.walkscore/100),e.walkscore/100*255,52,255]},getLineColor:function(e,t){return[0,0,0]},getElevation:function(e){return e.walkscore/100*y(r.zoom)*1.2},updateTriggers:{getElevation:r.zoom}}),"population-agg-hexagons":new p.a({id:"population-agg-hexagons",data:"https://urbanmap.exr0n.com/data/cities.json",opacity:.2,lowerPercentile:2,pickable:!0,extruded:!0,radius:k(r.zoom),elevationRange:[0,.6*y(r.zoom)],getPosition:function(e){return[e.lon,e.lat]},getElevationWeight:function(e){return e.value},elevationAggregation:"SUM"}),"population-columns":new m.a({id:"population-columns",data:"https://urbanmap.exr0n.com/data/cities.json",diskResolution:40,coordinateSystem:u.a.LNGLAT,radius:1e3,opacity:.5,extruded:!0,pickable:!0,elevationScale:1,getPosition:function(e){return[e.lon,e.lat]},getFillColor:function(e){return[48,128,255*e.value,255]},getLineColor:function(e,t){return[0,0,0]},getElevation:function(e){return e.value*y(r.zoom)},updateTriggers:{getElevation:r.zoom}}),"political-columns":new m.a({visible:!0,id:"political-columns",data:"https://urbanmap.exr0n.com/data/politics_by_coords.json",diskResolution:40,coordinateSystem:u.a.LNGLAT,radius:3e4,opacity:.6,extruded:!1,pickable:!0,elevationScale:1,getPosition:function(e){return[e.coords[1],e.coords[0]]},getFillColor:function(e){return"DEMOCRAT"==e.party?[0,21,188]:[222,1,0]},getLineColor:function(e,t){return[0,0,0]},getElevation:function(e){return e.value*y(r.zoom)},updateTriggers:{getElevation:r.zoom}})},v=t.map((function(e){return f[e]}));return o.a.createElement(g.a,{controller:!0,viewState:r,onViewStateChange:function(e){c(e.viewState)},layers:v},o.a.createElement(d.a,{className:"w-full h-full",mapLib:b.a,mapStyle:a,reuseMaps:!0,preventStyleDiffering:!0}))},E=(a(194),a(237)),j=a(234),M=a(229);var S=function(){var e={"walkability-agg-hexagons-max":["Max aggregate walkability",!1],"walkability-agg-hexagons-avg":["Avg aggregate walkability",!0],"walkability-columns":["Walkability datapoints",!0],"population-agg-hexagons":["Aggregate population",!1],"population-columns":["Population centers",!1],"political-columns":["Political scatter plot",!0]},t=Object.fromEntries(Object.entries(e).map((function(e){var t=Object(s.a)(e,2);return[t[0],t[1][1]]}))),a=Object(n.useState)(t),i=Object(s.a)(a,2),l=i[0],u=i[1],g=function(e){u(Object(c.a)(Object(c.a)({},l),{},Object(r.a)({},e.target.name,e.target.checked)))},m=Object.keys(l).filter((function(e){return l[e]}));return console.log(m),o.a.createElement("div",{className:"w-screen overflow-hidden bg-gray-700",style:{height:"100vh",zIndex:-1}},o.a.createElement("div",{className:"relative w-screen h-full"},o.a.createElement(x,{layerNames:m,mapStyle:"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"})),o.a.createElement("div",{className:"fixed bottom-0 left-0 z-10 flex flex-col-reverse mb-0 ml-0",style:{padding:"1rem"}},o.a.createElement("div",{className:"relative flex flex-col text-white",style:{padding:"1rem",borderRadius:"1rem",width:"21rem",backgroundColor:"rgba(30, 30, 30, 0.2)",fontFamily:"Helvetica",userSelect:"none"}},o.a.createElement("p",null,"Drag to pan, scroll to zoom, shift to rotate.",o.a.createElement("br",null)),o.a.createElement(E.a,{style:{pointerEvents:"revert"}},Object.entries(l).map((function(t,a){var n=Object(s.a)(t,2),i=n[0],l=n[1];return o.a.createElement(j.a,{control:o.a.createElement(M.a,{checked:l,onChange:g,name:i}),label:e[i][0],key:a})}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[185,1,2]]]);
//# sourceMappingURL=main.82a1677f.chunk.js.map