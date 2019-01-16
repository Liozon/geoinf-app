function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("info").style.display = "block";
    document.getElementById("tracking").style.display = "block";
}

var mapURL = 'https://wms.geo.admin.ch';

// CartoDB/Carto.com API key and format definition
var format = "GeoJSON";
var key = "67770d5dedb2d2c4b4707425a84649c8fdc16551";

(function () {
    $('input[type=checkbox]').removeAttr('checked');
    on();
    var view = new ol.View({
        center: ol.proj.transform([8.2, 46.8], 'EPSG:4326', 'EPSG:3857'),
        zoom: 8.5,
        minZoom: 8.5
    });
    var map = new ol.Map({
        target: 'map',
        view: view,
        layers: [
            new ol.layer.Group({
                'title': 'Cartes',
                layers: [
                    new ol.layer.Group({
                        title: 'Aquarelle avec étiquettes',
                        type: 'base',
                        combine: true,
                        visible: false,
                        layers: [
                            new ol.layer.Tile({
                                source: new ol.source.Stamen({
                                    layer: 'watercolor'
                                })
                            }),
                            new ol.layer.Tile({
                                source: new ol.source.Stamen({
                                    layer: 'terrain-labels'
                                })
                            })
                        ]
                    }),
                    new ol.layer.Tile({
                        title: 'Aquarelle',
                        type: 'base',
                        visible: false,
                        source: new ol.source.Stamen({
                            layer: 'watercolor'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'Bing Maps',
                        type: 'base',
                        visible: false,
                        source: new ol.source.BingMaps({
                            imagerySet: 'AerialWithLabels',
                            key: 'AkHVW_WXt2nAK7HzcN7FAYn5OoAqGub21o8IpwCN6z7WGAIey6eAR8ODJ-4p56aU'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'Carte standard',
                        type: 'base',
                        visible: true,
                        source: new ol.source.OSM()
                    })
                ]
            }),
            new ol.layer.Group({
                title: 'Couches',
                layers: [
                    new ol.layer.Image({
                        title: 'Cadastre',
                        visible: false,
                        source: new ol.source.ImageWMS({
                            ratio: 1,
                            url: mapURL,
                            params: {
                                VERSION: "1.0.0",
                                LAYERS: "ch.kantone.cadastralwebmap-farbe",
                                FORMAT: "image/png"
                            }
                        })
                    }),
                    new ol.layer.Image({
                        title: 'Réserves naturelles',
                        visible: false,
                        source: new ol.source.ImageWMS({
                            ratio: 1,
                            url: mapURL,
                            params: {
                                VERSION: "1.0.0",
                                LAYERS: "ch.pronatura.naturschutzgebiete",
                                FORMAT: "image/png"
                            }
                        })
                    }),
                    new ol.layer.Image({
                        title: 'Casernes militaires',
                        visible: false,
                        source: new ol.source.ImageWMS({
                            ratio: 1,
                            url: mapURL,
                            params: {
                                VERSION: "1.0.0",
                                LAYERS: "ch.vbs.sachplan-infrastruktur-militaer_kraft",
                                FORMAT: "image/png"
                            }
                        })
                    }),
                    new ol.layer.Vector({
                        title: 'Cantons',
                        visible: true,
                        style: new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: [255, 255, 255, 0]
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#4C4CFF',
                                width: 5
                            })
                        }),
                        source: new ol.source.Vector({
                            url: "https://liozon.carto.com/api/v2/sql?q=select*from%20limites_des_cantons&format=" + format + "&api_key=" + key,
                            format: new ol.format.GeoJSON()
                        })
                    }),
                    new ol.layer.Vector({
                        title: 'Zones interdites de vol',
                        visible: true,
                        style: new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: [255, 153, 153, 0.5]
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#cb1d1d',
                                width: 2
                            })
                        }),
                        source: new ol.source.Vector({
                            url: "https://liozon.carto.com/api/v2/sql?q=select*from%20carte_de_restrictions&format=" + format + "&api_key=" + key,
                            format: new ol.format.GeoJSON()
                        })
                    }),
                    new ol.layer.Vector({
                        title: 'Aéroports',
                        visible: true,
                        style: new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: [255, 255, 255, 0.8],
                            }),
                            stroke: new ol.style.Stroke({
                                color: [0, 0, 0],
                                width: 2
                            })
                        }),
                        source: new ol.source.Vector({
                            projection: 'EPSG:4326',
                            url: "https://liozon.carto.com/api/v2/sql?q=select*from%20airports&format=" + format + "&api_key=" + key,
                            format: new ol.format.GeoJSON()
                        })
                    })
                    // CartoDB API documentation: https://carto.com/developers/data-services-api/reference/
                ]
            })
        ],

    });

    // Geolocation
    var geolocation = new ol.Geolocation({
        // enableHighAccuracy must be set to true to have the heading value.
        trackingOptions: {
            enableHighAccuracy: true
        },
        projection: view.getProjection()
    });

    function el(id) {
        return document.getElementById(id);
    }

    el('track').addEventListener('change', function () {
        geolocation.setTracking(this.checked);
    });

    // Handling geolocation error.
    geolocation.on('error', function (error) {
        var info = document.getElementById('info');
        info.innerHTML = error.message;
        info.style.display = '';
    });

    var accuracyFeature = new ol.Feature();
    geolocation.on('change:accuracyGeometry', function () {
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });

    var positionFeature = new ol.Feature();
    positionFeature.setStyle(new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: '#3399CC'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2
            })
        })
    }));

    // Zoom on the map to the current location
    geolocation.on('change:position', function () {
        var coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates ?
            new ol.geom.Point(coordinates) : null);
        map.getView().animate({
            center: coordinates,
            zoom: 13
        });
    });

    new ol.layer.Vector({
        map: map,
        source: new ol.source.Vector({
            features: [accuracyFeature, positionFeature]
        })
    });

    // Adding the Layer switcher
    var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Légende' // Label for button
    });
    map.addControl(layerSwitcher);

    // Interaction controls
    var selectInteraction = new ol.interaction.Select({
        condition: ol.events.condition.singleClick
    });
    map.addInteraction(selectInteraction);

    selectInteraction.on('select', function (e) {
        if (e.selected.length > 0) {
            var restrictionName = e.selected[0].get("name_f");
            var restrictionType = e.selected[0].get("restr_f");
            var restrictionAuth = e.selected[0].get("appro_f");
            var restrictionLink = e.selected[0].get("link_f");
            var cantonName = e.selected[0].get("name");
            var airportName = e.selected[0].get("airport_name");
            var airportType = e.selected[0].get("type");
            var airportCanton = e.selected[0].get("canton_name");

            if (restrictionName) {
                //$("#info").empty();
                $("#info").html("<table id='table'></table>");
                $("#table").html("<p>Nom: " + restrictionName + "\n</p><p>Restriction: " + restrictionType + "</p><p>Autorisations: " + restrictionAuth + "</p><p><a href=" + restrictionLink + " target='_blank' class='link'>Site Web</a></p>");
            } else if (cantonName) {
                //$("#info").empty();
                $("#info").html("<table id='table'></table>");
                $("#table").html("<p>Canton de " + cantonName + "</p>");
            } else if (airportName) {
                //$("#info").empty();
                $("#info").html("<table id='table'></table>");
                $("#table").html("<p>" + airportType + " de " + airportName + ", canton de " + airportCanton + "</p>");
            }


        } else {
            $("#info").empty();
            $("#info").html("Cliquez sur des éléments de la carte pour obtenir des informations");
        }
    })

})();