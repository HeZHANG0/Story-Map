/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [37.756532, -122.443790],
  zoom: 12
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

// have a list of centers and zoom-in levels when we move around

var centers= [[37.756532, -122.443790],[37.756532, -122.443790],[37.769119, -122.483227],[37.756532, -122.443790],[37.785905, -122.401072]]

var zoomInLevels=[12,13,15,13,15]

var length=4
var currentSlide = 0

// define the map functions. 5 map styles and 5 map functions
var style = function(feature) {
  if (feature.properties.propertytype==="Regional Park"){
    return {fillColor: '#7fc97f'}
  } else if (feature.properties.propertytype==="Civic Plaza or Square"){
    return {fillColor: '#beaed4'}
  } else if (feature.properties.propertytype==="Neighborhood Park or Playground"){
    return {fillColor: '#fdc086'}
  } else if (feature.properties.propertytype==="Mini Park" || feature.properties.propertytype==="Community Garden"){
    return {fillColor: '#ffff99'}
  } else {
    return {fillColor: '#386cb0'}
  }
};

// var style1= {fillColor: '#7fc97f'}
// var style2= {fillColor: '#beaed4'}
// var styles=[style0, style1,style1,style2,style2]

var filter0= function(feature){
  return true
}

var filter1= function(feature){
  if (feature.properties.propertytype==="Regional Park"){
    return true
  }
}

var filter2= function(feature){
  if (feature.properties.propertytype==="Civic Plaza or Square"){
    return true
  }
}

var filters= [filter0,filter1,filter1,filter2,filter2]

// define the dictionary to store image reference
var images={2: $('#teaGarden'),4:$('#moma')}
var imageTitles= {2:'Image: The Japanese Tea Garden inside the Golden State Park', 4:'Image: San Francisco Museum of Modern Art'}

var count=[236,18,18,10,10]
var park_kind=['all kinds of parks','regional parks','regional parks','civic plazas or squares','civic plazas or squares']

// define loadSlide function
// have the slide number as i, to simplify
var loadSlide= function(i,data){
  // zoom-in level and center
  map.setView(centers[i],zoomInLevels[i])
  if (i in images){
    images[6-i].hide()
    images[i].show()
    $('#parkName').text(imageTitles[i]).show()
  } else{
    images[2].hide()
    images[4].hide()
    $('#parkName').hide()
  }
  // only show the legend and texts on the first slides
  if (i=== 0){
    $('.legend').show()
    $('p.main').show()
  } else{
    $('.legend').hide()
    $('p.main').hide()
  }
  // show different summaries
  $('.summary p').text(`Currently on display: there are ${count[i]} ${park_kind[i]} in San Francisco.`)
  // show different maps
  if (featureGroup !== undefined) {
    map.removeLayer(featureGroup)
  }
  featureGroup = L.geoJson(data,{
     style: style,
     filter: filters[i]
  }).addTo(map)
}

// define next and previous function
var next = function(data) {
  currentSlide += 1
  loadSlide(currentSlide,data)
  $('#previousButton').show()
  if (currentSlide !== length) {
    $('#nextButton').show()
  }
  else {
    $('#nextButton').hide()
  }
}

var previous = function(data){
  currentSlide-=1
  loadSlide(currentSlide,data)
  $('#nextButton').show()
  if(currentSlide!== 0){
    $("#previousButton").show()
  }
  else{
    $('#previousButton').hide()
  }
}

//
// var showResults = function() {
//   /* =====================
//   This function uses some jQuery methods that may be new. $(element).hide()
//   will add the CSS "display: none" to the element, effectively removing it
//   from the page. $(element).show() removes "display: none" from an element,
//   returning it to the page. You don't need to change this part.
//   ===================== */
//   // => <div id="intro" css="display: none">
//   $('#intro').hide();
//   // => <div id="results">
//   $('#results').show();
// };

//
// var eachFeatureFunction = function(layer) {
//   layer.on('click', function (event) {
//     /* =====================
//     The following code will run every time a layer on the map is clicked.
//     Check out layer.feature to see some useful data about the layer that
//     you can use in your application.
//     ===================== */
//     // console.log(layer.feature);
//     console.log(layer.feature.properties.COLLDAY)
//     $("span.day-of-week").text(layer.feature.properties.COLLDAY)
//     showResults();
//   });
// };
