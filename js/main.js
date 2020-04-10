/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [37.756532, -122.443790],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


// Loading park data

var parkdata = "https://data.sfgov.org/resource/gtr9-ntp6.geojson"
var featureGroup;

// set styling
var myStyle = function(feature) {
  if (feature.properties.COLLDAY=="MON"){
    return {fillColor: 'red'}
  } else if (feature.properties.COLLDAY=="TUE"){
    return {fillColor: 'orange'}
  } else if (feature.properties.COLLDAY=="WED"){
    return {fillColor: 'yellow'}
  } else if (feature.properties.COLLDAY=="THU"){
    return {fillColor: 'green'}
  } else {
    return {fillColor: 'blue'}
  }
};


// have a list of centers and zoom-in levels when we move around

var centers= [[37.756532, -122.443790],[37.756532, -122.443790],[37.769119, -122.483227],[37.756532, -122.443790],[37.785905, -122.401072]]

var zoomInLevels=[11,11,13,11,13]

var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).show() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};


var eachFeatureFunction = function(layer) {
  layer.on('click', function (event) {
    /* =====================
    The following code will run every time a layer on the map is clicked.
    Check out layer.feature to see some useful data about the layer that
    you can use in your application.
    ===================== */
    // console.log(layer.feature);
    console.log(layer.feature.properties.COLLDAY)
    $("span.day-of-week").text(layer.feature.properties.COLLDAY)
    showResults();
  });
};

var myFilter = function(feature) {
  if (feature.properties.COLLDAY!== ""){
    return true;
  }
};

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    //console.log(parsedData)
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      filter: myFilter
    }).addTo(map);

    // quite similar to _.each
    featureGroup.eachLayer(eachFeatureFunction);
  });
});
