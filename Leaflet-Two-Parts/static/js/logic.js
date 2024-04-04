
// Store the URL for the GeoJSON data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Add Leaflet tile layer, give it an attribution
let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create Leaflet map object with center coordinates
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3,
    layers: [streets]
});

//define basemaps
let baseMaps = {
    "streets": streets
};

//define the earthquake and tectonic plates layergroups
let earthquake_data = new L.LayerGroup();
let tectonics = new L.LayerGroup();

//define the overlays and link them to our layergroups
let overlays = {
    "Earthquakes": earthquake_data,
    "Tectonic Plates": tectonics
};

//add a control layer
L.control.layers(baseMaps, overlays).addTo(myMap);

//the styleInfo function for all earthquake points on map -- 3 functions
function styleInfo(feature) {
    return {
        color: chooseColor(feature.geometry.coordinates[2]), //third coordinate is the second in array
        radius: chooseRadius(feature.properties.mag), //sets radius based on magnitude 
        fillColor: chooseColor(feature.geometry.coordinates[2]) //sets fillColor based on the depth
    }
};

//function to choose the fillColor 
function chooseColor(depth) {
    if (depth <= 10) return "red";
    else if (depth > 10 & depth <= 25) return "orange";
    else if (depth > 25 & depth <= 40) return "yellow";
    else if (depth > 40 & depth <= 55) return "pink";
    else if (depth > 55 & depth <= 70) return "blue";
    else return "green";
};

//function to determine the radius of each earthquake marker (based on magnitude)
function chooseRadius(magnitude) {
    return magnitude*5;
};


//Pull data from the geoJSON sample with d3 -- all earthquakes within last week
d3.json(url).then(function (data) {
    L.geoJson(data, {
        pointToLayer: function (feature, latlon) {  //declare a point with lat and lon
            return L.circleMarker(latlon).bindPopup(feature.id); //binds marker with the earthquake id
        },
        style: styleInfo //style
    }).addTo(earthquake_data);
    earthquake_data.addTo(myMap); //add earthquake data to map layer

    //pull the tectonic plate data with d3
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (data) {
        L.geoJson(data, {
            color: "purple",  //line color
            weight: 3
        }).addTo(tectonics); //add the tectonic data to the tectonic layergroup
        tectonics.addTo(myMap);
    });

});
//create legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function(myMap) {
    var div = L.DomUtil.create("div", "legend");
       div.innerHTML += "<h4>Depth Color Legend</h4>";
       div.innerHTML += '<i style="background: red"></i><span>(Depth < 10)</span><br>';
       div.innerHTML += '<i style="background: orange"></i><span>(10 < Depth <= 25)</span><br>';
       div.innerHTML += '<i style="background: yellow"></i><span>(25 < Depth <= 40)</span><br>';
       div.innerHTML += '<i style="background: pink"></i><span>(40 < Depth <= 55)</span><br>';
       div.innerHTML += '<i style="background: blue"></i><span>(55 < Depth <= 70)</span><br>';
       div.innerHTML += '<i style="background: green"></i><span>(Depth > 70)</span><br>';
  
    return div;
  };
  //add the legend to the map
  legend.addTo(myMap);




//EXTRA check
//to get all information from one earthquake in dataset; in this case, "nc73872510"
//and put it all into console to log for verification
d3.json(url).then(function (data) {
    console.log(data);
    let features = data.features;
    console.log(features);

    let results = features.filter(id => id.id == "nc73872510"); //replace the id string with the argument of the function once created
    let first_result = results[0];
    console.log(first_result);

    let geometry = first_result.geometry;
    console.log(geometry);

    let coordinates = geometry.coordinates;
    console.log(coordinates);
    console.log(coordinates[0]); // longitude
    console.log(coordinates[1]); // latitude
    console.log(coordinates[2]); // depth of earthquake

    let magnitude = first_result.properties.mag;
    console.log(magnitude);

    //define depth
    let depth = geometry.coordinates[2];
    console.log(depth);

    let id = first_result.id;
    console.log(id);

});






