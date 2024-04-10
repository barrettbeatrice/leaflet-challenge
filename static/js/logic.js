
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




// Pull data from the GeoJSON sample with d3 -- all earthquakes within the last week
d3.json(url).then(function(data) {
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            // Customize tooltip content to show required information
            var tooltipContent = `<b>Earthquake ID:</b> ${feature.id}<br>
                                <b>Magnitude:</b> ${feature.properties.mag}<br>
                                <b>Depth:</b> ${feature.geometry.coordinates[2]} km`;

            // Create circle marker with customized tooltip content
            var marker = L.circleMarker(latlng, {
                radius: chooseRadius(feature.properties.mag)
            });

            // Bind tooltip to each marker
            marker.bindTooltip(tooltipContent);

            return marker;
        },
        style: styleInfo // Style
    }).addTo(earthquake_data);
    earthquake_data.addTo(myMap); // Add earthquake data to map layer
});

// Function to choose the radius of each earthquake marker (based on magnitude)
function chooseRadius(magnitude) {
    return magnitude * 5;
};


//create legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function(myMap) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Depth Color Legend</h4>";
    // Define legend items with units of measure
    div.innerHTML += '<i style="background: red"></i><span>(Depth < 10 km)</span><br>';
    div.innerHTML += '<i style="background: orange"></i><span>(10 - 25 km)</span><br>';
    div.innerHTML += '<i style="background: yellow"></i><span>(25 - 40 km)</span><br>';
    div.innerHTML += '<i style="background: pink"></i><span>(40 - 55 km)</span><br>';
    div.innerHTML += '<i style="background: blue"></i><span>(55 - 70 km)</span><br>';
    div.innerHTML += '<i style="background: green"></i><span>(Depth > 70 km)</span><br>';


    // Style legend container
    div.style.width = '100px'; // Set the width of the legend container

    // Style legend items
    div.childNodes.forEach(function(item) {
        item.style.display = 'inline-block';
        item.style.width = '50px'; // Adjust width as needed
        item.style.height = '50px'; // Adjust height as needed
        item.style.marginRight = '5px'; // Adjust margin as needed
    });

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






