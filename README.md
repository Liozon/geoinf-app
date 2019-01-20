# Geography information application (also known as GeoInf)

- [Geography information application (also known as GeoInf)](#geography-information-application-also-known-as-geoinf)
  - [Intro](#intro)
  - [Preview](#preview)
  - [Installation](#installation)
  - [API keys](#api-keys)
  - [Maps presentation](#maps-presentation)
    - [Here Maps](#here-maps)
    - [Outdoor activities](#outdoor-activities)
    - [Bing Maps](#bing-maps)

![Map view](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/map.png "Map view")

## Intro

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

```<script src="api/api.sample.js"></script>```

at the end of the HTML file, juste before the `</body>` tag.

## Maps presentation

### Here Maps

![Here Maps](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/here%20maps%20map.png "Here Maps")

### Outdoor activities

![Outdoor activities](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/outdoor%20activities%20map.png "Outdoor activities")

### Bing Maps

![Bing Maps](https://raw.githubusercontent.com/Liozon/geoinf-app/master/screenshots/bing%20map.png "Bing Maps")