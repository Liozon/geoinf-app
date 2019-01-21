# Geography information application (also known as GeoInf)

- [Geography information application (also known as GeoInf)](#geography-information-application-also-known-as-geoinf)
  - [Introduction](#introduction)
  - [Preview](#preview)
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

![Map view](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/map.png "Map view")

## Introduction

This app was developped during the GeoInf course at the HEIG-VD school of Yverdon-les-Bains. While all comments in this code and ReadMe are in english, the content is displayed in french exclusively.

![Home screen](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/home%20screen.png "Home screen")

## Preview

You can [click here](http://tiny.cc/geoinf-readme-git) to preview the app directly in your browser with GitHub Pages or [here on my mirror/backup website](http://tiny.cc/geoinf-readme-own).

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

![Here Maps](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/here%20maps%20map.png "Here Maps")

Here Maps is the default map for this app.

### Outdoor activities

![Outdoor activities](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/outdoor%20activities%20map.png "Outdoor activities")

Outdoor activities is a map that contains all outdoors activities, perfect if you plan to go hiking.

### Bing Maps

![Bing Maps](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/bing%20map.png "Bing Maps")

Bing Maps is used to display a satellite view of Switzerland.

### High contrast

![High contrast](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/high%20contrast.png "High contrast")

High contrast is a map that is highly readable outside in a sunny place.

### Slope map

![Slope map](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/slope%20map.png "Slope map")

Slope map is useful if you plan to go in the mountains. This map contains the elevation marking.

### OpenStreetMap

![OpenStreetMap](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/openstreetmap.png "OpenStreetMap")

OpenStreetMap is an alternative to the other maps.

## Layers presentation

![Available layers](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/selection%20of%20layers.jpg "Available layers")

![All layers activated](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/all%20layers.png "All layers activated")