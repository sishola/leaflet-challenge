// Store the API endpoint in the variable queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var myMap = L.map("map", {
    center: [
      35.8406667, -117.6626667
    ],
    zoom: 5
});


// Define streetmap and darkmap layers
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(myMap);



// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

  
function createFeatures(earthquakeData) { 

    //This function returns the colour of the circle marker
    function chooseColor(magnitude) {
        var colorValue = "";
        if (magnitude > 5) {
            colorValue =  "#F06B6B";
        }
        else if (magnitude > 4 && magnitude <=5 ) {
            colorValue =  "#F0A76B";
        }
        else if (magnitude > 3 && magnitude <=4 ) {
            colorValue =  "#F3BA4D";
        }
        else if (magnitude > 2 && magnitude <=3 ) {
            colorValue =  "#F3DB4D";
        }
        else if (magnitude > 1 && magnitude <=2 ) {
            colorValue =  "#E1F34D";
        }
        else if (magnitude > 0 && magnitude <=1 ) {
            colorValue =  "#B7F34D";
        }
        return colorValue;
    };

    L.geoJSON(earthquakeData, {
        //Converts the point to a circle marker
        pointToLayer: function (feature, latlng) {

            var currentMagnitude = feature.properties.mag
            console.log(currentMagnitude)

            function getgeojsonMarkerOptions(mag){

                return {
                    radius: mag * 5, //Multiply the magnitude by 5 to scale up
                    fillColor: chooseColor(mag),
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                };
                
            }

		    return L.circleMarker(latlng, getgeojsonMarkerOptions(currentMagnitude));
        }
    }).addTo(myMap);


    //Creates the legend
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            magnitudeRange = [0, 1, 2, 3, 4, 5],
            labels = ['#B7F34D','#E1F34D','#F3DB4D','#F3BA4D','#F0A76B','#F06B6B'];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < magnitudeRange.length; i++) {
            div.innerHTML +=
                '<i style="background:' + labels[i] + '"></i> ' +  
                magnitudeRange[i] + (magnitudeRange[i + 1] ? '&ndash;' + magnitudeRange[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);

}

