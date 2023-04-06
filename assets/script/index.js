
'use strict'


const trackBtn = document.querySelector('.track');
mapboxgl.accessToken =
  "pk.eyJ1IjoiMWFtc2h1YmhhbWhlcmUiLCJhIjoiY2xnNWNxeGlrMDI3eDNkbjlqc2U0dmExZiJ9.a_PifubAnkVodM62G7_JiQ"


  const options = {
    enableHighAccuracy: true
 }

 function errorHandler(){
  console.log('Unable to retrieve your location ');
}

function getLocation(position){
  console.log(position);
  setupMap([position.coords.longitude, position.coords.latitude])

  const { latitude, longitude } = position.coords;
 
}

trackBtn.addEventListener('click', function(){

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
 }else{
    console.log(`Geolocation is not supported by your browser`);
 }

})


function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15
  })

  const nav = new mapboxgl.NavigationControl()
  map.addControl(nav)

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  })

  map.addControl(directions, "top-left")
}

// Marker

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    }
  ]
};


// add markers to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
}