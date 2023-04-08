'use strict'

const flyToBtn = document.querySelector('#fly-btn');
const trackBtn = document.querySelector('.track');

mapboxgl.accessToken =
  "pk.eyJ1IjoiMWFtc2h1YmhhbWhlcmUiLCJhIjoiY2xnNWNxeGlrMDI3eDNkbjlqc2U0dmExZiJ9.a_PifubAnkVodM62G7_JiQ"


const options = {
  enableHighAccuracy: true
}

function errorHandler(){
  console.log('Unable to retrieve your location ');
}

let lat, long;
function getLocation(position){
  console.log(position);
  setupMap([position.coords.longitude, position.coords.latitude])

  const { latitude, longitude } = position.coords;
  lat = latitude;
  long = longitude;
}

let map; // Declare the map variable outside the setupMap function

trackBtn.addEventListener('click', function(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
    flyToBtn.style.visibility = 'visible';
  } else {
    console.log(`Geolocation is not supported by your browser`);
  }
})

flyToBtn.addEventListener('click', () => {
  map.flyTo({
    center: [long , lat],
    duration: 3,
    easeLinearity: 0.5,
    essential: true
  });
  
})

function setupMap(center) {
  map = new mapboxgl.Map({
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
  const marker = new mapboxgl.Marker({
    color: "#ffa500",
    draggable: true
  }).setLngLat(center)
    .addTo(map);
}