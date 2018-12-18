 function on() {
     document.getElementById("overlay").style.display = "block";
     setTimeout(function () {
         $("#overlay").fadeOut(300);
     }, 2000);
 }

 function off() {
     document.getElementById("overlay").style.display = "none";
 }

 var mapURL = 'https://wms.geo.admin.ch';

 (function () {
     on();
     var map = new ol.Map({
         target: 'map',
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
                         source: new ol.source.ImageWMS({
                             ratio: 1,
                             url: mapURL,
                             params: {
                                 VERSION: "1.0.0",
                                 LAYERS: "ch.vbs.sachplan-infrastruktur-militaer_kraft",
                                 FORMAT: "image/png"
                             }
                         })
                     })
                 ]
             })
         ],
         view: new ol.View({
             center: ol.proj.transform([8.2, 46.8], 'EPSG:4326', 'EPSG:3857'),
             zoom: 8.5
         })
     });

     var layerSwitcher = new ol.control.LayerSwitcher({
         tipLabel: 'Légende' // Optional label for button
     });
     map.addControl(layerSwitcher);

 })();