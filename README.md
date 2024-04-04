# leaflet-challenge

Background
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

Part 1: Create the Earthquake Visualization

Part 1 - Create the earthquake visualization
Visualising the earthquakes around the world using the JSON data provided on the USGS website.
The circular markers indicate the sites of earthquake occurences in the past seven days.
The size of the markers indicate the magnitude of the earthquake. The bigger the marker, the higher the magnitude.
The color of the markers indicate the depth of the earthquakes. The legend for the colors is available in the right hand bottom corner of the visual.
Clicking on a marker displays the details of the earthquake which includes the location, the date and time, magnitude and the depth of the earthquake in a pop-up.

Import and visualize the data by doing the following:

Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

Hint: The depth of the earth can be found as the third coordinate for each earthquake.

Include popups that provide additional information about the earthquake when its associated marker is clicked.

Create a legend that will provide context for your map data.


Part 2: Gather and Plot More Data

Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplatesLinks to an external site..


