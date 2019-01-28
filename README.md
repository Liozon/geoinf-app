# Geography information application (also known as GeoInf)

![Map view](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/map.png "Map view")

- [Geography information application (also known as GeoInf)](#geography-information-application-also-known-as-geoinf)
  - [Introduction](#introduction)
  - [Preview](#preview)
  - [Client-server architecture](#client-server-architecture)
    - [Tiles](#tiles)
    - [Layers](#layers)
    - [Additional services](#additional-services)
  - [Installation](#installation)
  - [API keys](#api-keys)
  - [Maps presentation](#maps-presentation)
    - [Here Maps](#here-maps)
    - [Outdoor activities](#outdoor-activities)
    - [Bing Maps](#bing-maps)
    - [High contrast](#high-contrast)
    - [Slope map](#slope-map)
    - [OpenStreetMap](#openstreetmap)
  - [Layers presentation](#layers-presentation)
    - [List of all layers](#list-of-all-layers)
  - [Other](#other)

## Introduction

The idea behind this application is to differentiate the different areas where it is allowed to fly his drone areas where it is prohibited.

Reliable data from the Swiss Confederation are used, as well as live weather data, to enhance and better organize your next flights.

This app was developped during the GeoInf course at the HEIG-VD school of Yverdon-les-Bains. While all comments in this code and ReadMe are in english, the content is displayed in french exclusively.

![Home screen](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/home%20screen.png "Home screen")

## Preview

You can [click here](http://tiny.cc/geoinf-readme-git) to preview the app directly in your browser with GitHub Pages or [here on my mirror/backup website](http://tiny.cc/geoinf-readme-own).

## Client-server architecture

In order to offer the best user experience possible, some data are stored on external services.
Thoses services, such as Swiss Confederation's Web Map Tiling Services (or WMTS) and CartoDB Services.

### Tiles

Here is a list of all the tiles, their source and file format:

| Tile name             | Source                     | File format | API URL                                           |
| --------------------- | -------------------------- | ----------- | ------------------------------------------------- |
| Here Maps             | Here Maps API              | png         | https://developer.here.com/documentation          |
| Activités extérieures | Swiss Confederation's WMTS | png         | https://api3.geo.admin.ch/api/doc.html            |
| Bing Maps             | Bing Maps API              | jpeg        | https://docs.microsoft.com/en-us/bingmaps/        |
| Contraste élevé       | Thunderforest API          | png         | https://www.thunderforest.com/docs/map-tiles-api/ |
| Dénivelation          | Thunderforest API          | png         | https://www.thunderforest.com/docs/map-tiles-api/ |
| OpenStreetMap         | OpenStreetMap API          | png         | https://wiki.openstreetmap.org/wiki/OpenLayers    |

### Layers

Here is a list of all the layers, their source and file format:

| Layer name                   | Source                    | File format | URL                                                       |
| ---------------------------- | ------------------------- | ----------- | --------------------------------------------------------- |
| Aéroports                    | CartoDB                   | GeoJSON     | https://carto.com/developers/data-services-api/reference/ |
| Zones interdites de vol      | CartoDB                   | GeoJSON     | https://carto.com/developers/data-services-api/reference/ |
| Cantons                      | CartoDB                   | GeoJSON     | https://carto.com/developers/data-services-api/reference/ |
| Carte des vents              | Swiss Confederation's WMS | png         | https://api3.geo.admin.ch/api/faq/index.html              |
| Intensité des précipitations | OpenWeatherMap            | png         | https://openweathermap.org/api                            |
| Humidité relative            | OpenWeatherMap            | png         | https://openweathermap.org/api                            |

### Additional services

| Service name     | Use                                                   | Source    | URL                                           |
| ---------------- | ----------------------------------------------------- | --------- | --------------------------------------------- |
| Geocoder         | Service used for the searchbox                        | Nominatim | https://wiki.openstreetmap.org/wiki/Nominatim |
| Reverse Geocoder | Used to get the adress when the user click on the map | Nominatim | https://wiki.openstreetmap.org/wiki/Nominatim |

## Installation

In order to run this app locally on your computer, you'll need WAMP (or equivalent). You can download WAMP [here](http://www.wampserver.com/en/download-wampserver-64bits/) (for PC) and for Mac OS you can download MAMP [here](https://www.mamp.info/en/downloads/)

During the programming and tests, this is the version of WAMP and dependencies used:

| Dependencies | Version used |
| ------------ | ------------ |
| WAMP for PC  | 3.1.0        |
| Apache       | 2.4.27       |
| phpMyAdmin   | 4.7.4        |
| MySQL        | 5.7.19       |
| MariaDB      | 10.2.8       |

## API keys

In order to use this app and all resources, you'll need to provide your own API keys. You can find all the API keys you need here:

`/api/api.sample.js`

Replace every `YOUR_API_KEY` with your own API keys. Then, just paste this line in the `index.html` file:

```html
<script src="api/api.sample.js"></script>
```

at the end of the HTML file, juste before the `</body>` tag.

## Maps presentation

### Here Maps

Here Maps is the default map for this app.

![Here Maps](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/here%20maps%20map.png "Here Maps")

### Outdoor activities

Outdoor activities is a map that contains all outdoors activities, perfect if you plan to go hiking.

![Outdoor activities](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/outdoor%20activities%20map.png "Outdoor activities")

### Bing Maps

Bing Maps is used to display a satellite view of Switzerland.

![Bing Maps](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/bing%20map.png "Bing Maps")

### High contrast

High contrast is a map that is highly readable outside in a sunny place.

![High contrast](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/high%20contrast.png "High contrast")

### Slope map

Slope map is useful if you plan to go in the mountains. This map contains the elevation marking.

![Slope map](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/slope%20map.png "Slope map")

### OpenStreetMap

OpenStreetMap is an alternative to the other maps.

![OpenStreetMap](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/openstreetmap.png "OpenStreetMap")

## Layers presentation

### List of all layers

![Available layers](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/selection%20of%20layers.jpg "Available layers")

- Prohibited areas
  - Airports
  - Prohibited areas
  - Townships
  
- Meteorological
  - Wind direction (Live data)
  - Winds map (Statistics from the Swiss Confederation)
  - Intensity of rainfall (Live data)
  - Relative humidity (Live data)

Here is a view with all the possible layers activated:

![All layers activated](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/all%20layers.png "All layers activated")

## Other

If you find a bug, or have a suggestion on how to improve this code, do not hesitate to open an issue on GitHub, you can find a template for:

- [Bug report](https://github.com/Liozon/geoinf-app/blob/perfectioning/.github/ISSUE_TEMPLATE/bug_report.md)
- [Feature request](https://github.com/Liozon/geoinf-app/blob/perfectioning/.github/ISSUE_TEMPLATE/feature_request.md)
- [Other](https://github.com/Liozon/geoinf-app/blob/perfectioning/.github/ISSUE_TEMPLATE/custom.md)