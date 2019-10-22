// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

 // Create our map, giving it the streetmap and earthquakes layers to display on load
 var myMap = L.map("map", {
    center: [
      35.8406667, -117.6626667
    ],
    zoom: 5
  });
  

  
function createFeatures(earthquakeData) {

    

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
//    layer.bindPopup("<h3>" + feature.properties.place +
//      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" 
//      + "<p>" + feature.properties.mag +"</p>"
//      + "<p>" + feature.geometry.coordinates +"</p>")

    var loc = [feature.geometry.coordinates[1],feature.geometry.coordinates[0]]
    //console.log(loc)
     layer.circle(loc, {
    // layer.circle([35.8406667, -117.6626667], {
        fillOpacity: 0.75,
        color: "white",
        fillColor: "purple",
        // Setting our circle's radius equal to the output of our markerSize function
        // This will make our marker's size proportionate to its population
        radius: 100000//(feature.properties.mag)*100000
        //markerSize(cities[i].population)
     });
     

    
  }

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  }).addTo(myMap);

}

function createMap(earthquakes) {

 
  // Define streetmap and darkmap layers
  var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  }).addTo(myMap);

  


 
}
