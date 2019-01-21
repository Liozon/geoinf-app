// Julien Muggli - 2019

// CartoDB data format
var format = "GeoJSON";

// Main function
(function () {
  $("input[type=checkbox]").removeAttr("checked");
  var inputButton = document.getElementById("searchbox");
  inputButton.addEventListener("click", geocodage);
  var inputText = document.getElementById("adress");
  inputText.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      geocodage();
    }
  });
  var view = new ol.View({
    center: ol.proj.transform([8.2, 46.7], "EPSG:4326", "EPSG:3857"),
    zoom: 8.5
  });
  var map = new ol.Map({
    target: "map",
    view: view,
    layers: [
      new ol.layer.Group({
        title: "Cartes",
        layers: [
          new ol.layer.Tile({
            title: "OpenStreetMap",
            type: "base",
            visible: false,
            source: new ol.source.OSM()
          }),
          new ol.layer.Tile({
            title: "Dénivelation",
            type: "base",
            visible: false,
            source: new ol.source.XYZ({
              url: "https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=" +
                thunderKey
            })
          }),
          new ol.layer.Tile({
            title: "Contraste élevé",
            type: "base",
            visible: false,
            source: new ol.source.XYZ({
              url: "https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=" +
                thunderKey
            })
          }),
          new ol.layer.Tile({
            title: "Bing Maps",
            type: "base",
            visible: false,
            source: new ol.source.BingMaps({
              imagerySet: "AerialWithLabels",
              key: "AkHVW_WXt2nAK7HzcN7FAYn5OoAqGub21o8IpwCN6z7WGAIey6eAR8ODJ-4p56aU"
            })
          }),
          new ol.layer.Tile({
            title: "Activités extérieures",
            type: "base",
            visible: false,
            source: new ol.source.XYZ({
              url: "https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=" +
                thunderKey
            })
          }),
          new ol.layer.Tile({
            title: "Here Maps",
            type: "base",
            visible: true,
            source: new ol.source.XYZ({
              url: "https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?app_id=" +
                app_id +
                "&app_code=" +
                app_code
            })
          })
        ]
      }),
      new ol.layer.Group({
        title: "Météorologique",
        layers: [
          new ol.layer.Tile({
            title: "Humidité relative",
            visible: false,
            opacity: 0.7,
            source: new ol.source.XYZ({
              url: "https://g.sat.owm.io/vane/2.0/weather/HRD0/{z}/{x}/{y}?appid=" +
                weatherKey
            })
          }),
          new ol.layer.Tile({
            title: "Intensité des précipitations",
            visible: false,
            opacity: 0.7,
            source: new ol.source.XYZ({
              url: "https://g.sat.owm.io/vane/2.0/weather/PR0/{z}/{x}/{y}?appid=" +
                weatherKey
            })
          }),
          new ol.layer.Image({
            title: "Carte des vents",
            visible: false,
            opacity: 0.7,
            source: new ol.source.ImageWMS({
              ratio: 1,
              url: mapURL,
              params: {
                VERSION: "1.0.0",
                LAYERS: "ch.bfe.windenergie-geschwindigkeit_h150",
                FORMAT: "image/png"
              }
            })
          }),
          new ol.layer.Tile({
            title: "Direction des vents",
            visible: false,
            opacity: 0.7,
            source: new ol.source.XYZ({
              url: "https://g.sat.owm.io/vane/2.0/weather/WND/{z}/{x}/{y}?appid=" +
                weatherKey
            })
          })
        ]
      }),
      new ol.layer.Group({
        title: "Zones interdites",
        layers: [
          new ol.layer.Vector({
            title: "Cantons",
            visible: true,
            style: new ol.style.Style({
              fill: new ol.style.Fill({
                color: [255, 255, 255, 0]
              }),
              stroke: new ol.style.Stroke({
                color: "#4C4CFF",
                width: 5
              })
            }),
            source: new ol.source.Vector({
              url: "https://liozon.carto.com/api/v2/sql?q=select*from%20limites_des_cantons&format=" +
                format +
                "&api_key=" +
                key,
              format: new ol.format.GeoJSON()
            })
          }),
          new ol.layer.Vector({
            title: "Zones interdites de vol",
            visible: true,
            style: new ol.style.Style({
              fill: new ol.style.Fill({
                color: [255, 153, 153, 0.5]
              }),
              stroke: new ol.style.Stroke({
                color: "#cb1d1d",
                width: 2
              })
            }),
            source: new ol.source.Vector({
              url: "https://liozon.carto.com/api/v2/sql?q=select*from%20carte_de_restrictions&format=" +
                format +
                "&api_key=" +
                key,
              format: new ol.format.GeoJSON()
            })
          }),
          new ol.layer.Vector({
            title: "Aéroports",
            visible: true,
            style: new ol.style.Style({
              fill: new ol.style.Fill({
                color: [255, 255, 255, 0.8]
              }),
              stroke: new ol.style.Stroke({
                color: [0, 0, 0],
                width: 2
              })
            }),
            source: new ol.source.Vector({
              projection: "EPSG:4326",
              url: "https://liozon.carto.com/api/v2/sql?q=select*from%20airports&format=" +
                format +
                "&api_key=" +
                key,
              format: new ol.format.GeoJSON()
            })
          })
        ]
      })
    ]
  });

  // Searchbox
  function geocodage() {
    var adresse = $("#adress").val();
    var urlAdresse =
      "https://nominatim.openstreetmap.org/search?q=" +
      adresse +
      "&format=jsonv2&bounded=1";
    $.getJSON(urlAdresse, function (json) {
      var styleVecteur = new ol.style.Style({
        image: new ol.style.Circle({
          radius: 6,
          fill: new ol.style.Fill({
            color: "#3399CC"
          }),
          stroke: new ol.style.Stroke({
            color: "#fff",
            width: 2
          })
        })
      });
      var sourceVecteur = new ol.source.Vector({});
      var vecteur = new ol.layer.Vector({
        source: sourceVecteur,
        style: styleVecteur
      });
      map.addLayer(vecteur);
      if (json != "") {
        var latAdresse = json[0].lat;
        var lngAdresse = json[0].lon;
        var coord = [parseFloat(lngAdresse), parseFloat(latAdresse)];
        var newcoord = ol.proj.transform(coord, "EPSG:4326", "EPSG:3857");
        var locFeature = new ol.Feature({
          geometry: new ol.geom.Point(newcoord)
        });
        sourceVecteur.addFeature(locFeature);
        map.getView().animate({
          center: newcoord,
          zoom: 13
        });
      } else {
        alert("Erreur : lieu introuvable ou inexistant");
      }
    });
  }

  // Geolocation
  var geolocation = new ol.Geolocation({
    trackingOptions: {
      enableHighAccuracy: true
    },
    projection: view.getProjection()
  });

  function el(id) {
    return document.getElementById(id);
  }
  el("track").addEventListener("change", function () {
    geolocation.setTracking(this.checked);
  });
  // Handling geolocation error.
  geolocation.on("error", function (error) {
    var info = document.getElementById("info");
    info.innerHTML = error.message;
    info.style.display = "";
  });
  var accuracyFeature = new ol.Feature();
  geolocation.on("change:accuracyGeometry", function () {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  });
  var positionFeature = new ol.Feature();
  positionFeature.setStyle(
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
          color: "#3399CC"
        }),
        stroke: new ol.style.Stroke({
          color: "#fff",
          width: 2
        })
      })
    })
  );

  // Zoom on the map to the current location
  geolocation.on("change:position", function () {
    var coordinates = geolocation.getPosition();
    positionFeature.setGeometry(
      coordinates ? new ol.geom.Point(coordinates) : null
    );
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
    tipLabel: "Légende"
  });
  map.addControl(layerSwitcher);

  // Click anywhere on the map
  // Data obtained from the pixel of the map
  map.on("click", function (evt) {
    var styleVecteur = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
          color: "#3399CC"
        }),
        stroke: new ol.style.Stroke({
          color: "#fff",
          width: 2
        })
      })
    });
    var sourceVecteur = new ol.source.Vector({});
    var vecteur = new ol.layer.Vector({
      source: sourceVecteur,
      style: styleVecteur
    });
    map.addLayer(vecteur);
    var position = evt.coordinate;
    var newposition = ol.proj.transform(position, "EPSG:3857", "EPSG:4326");
    var latitude = newposition[1];
    var longitude = newposition[0];
    var urlPosition =
      "https://nominatim.openstreetmap.org/reverse?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&format=jsonv2&bounded=1";
    $.getJSON(urlPosition, function (json) {
      if (json != "") {
        var formatted_address = json.display_name;
        var locFeature = new ol.Feature({
          geometry: new ol.geom.Point(position)
        });
        sourceVecteur.addFeature(locFeature);
        map.getView().animate({
          center: position,
          zoom: 13
        });
        $("#adress").empty();
        $("#adress").val(formatted_address);
      } else {
        alert("Une erreur est survenue");
      }
    });
  });

  // Infocard controls
  var selectInteraction = new ol.interaction.Select({
    condition: ol.events.condition.singleClick
  });
  map.addInteraction(selectInteraction);
  selectInteraction.on("select", function (e) {
    if (e.selected.length > 0) {
      var restrictionName = e.selected[0].get("name_f");
      var restrictionType = e.selected[0].get("restr_f");
      var restrictionAuth = e.selected[0].get("appro_f");
      var restrictionLink = e.selected[0].get("link_f");
      var cantonName = e.selected[0].get("name");
      var airportName = e.selected[0].get("airport_name");
      var airportType = e.selected[0].get("type");
      if (restrictionName) {
        $("#info").empty();
        $("#info").html("<table id='table'></table>");
        $("#table").html(
          "<p>Nom: " +
          restrictionName +
          "\n</p><p>Restriction: " +
          restrictionType +
          "</p><p>Autorisations: " +
          restrictionAuth +
          "</p><p><a href=" +
          restrictionLink +
          " target='_blank' class='link'>Site Web</a></p>"
        );
      } else if (cantonName) {
        $("#info").empty();
        $("#info").html("<table id='table'></table>");
        $("#table").html("<p>Canton de " + cantonName + "</p>");
      } else if (airportName) {
        $("#info").empty();
        $("#info").html("<table id='table'></table>");
        $("#table").html("<p>" + airportType + " de " + airportName + "</p>");
      }
    } else {
      $("#info").empty();
      $("#info").html(
        "Cliquez sur des éléments de la carte pour obtenir des informations"
      );
    }
  });
})();

// Overlay
function off() {
  document.getElementById("overlay").style.zIndex = "-1";
  document.getElementById("content").style.backgroundColor = "white";
  document.getElementById("info").style.display = "block";
  document.getElementById("tracking").style.display = "block";
  document.getElementById("bloc-input").style.display = "block";
  window.setTimeout(() => {
    document.getElementById("overlay").remove();
    document.getElementById("content").style.backgroundImage = "none";
  }, 5000);
  $('#content').unfold({
    duration: 1500,
    slices: 6,
    shadow: true,
    perspective: 500
  });
}