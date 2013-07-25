require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        async: '../bower_components/requirejs-plugins/src/async'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'jquery', 'bootstrap', 'async!http://maps.google.com/maps/api/js?sensor=false'], function (app, $) {
    'use strict';

    var latlng = new google.maps.LatLng(50.720081,-1.879894),
        mapDiv = document.getElementById('map-canvas');
    var sydneyOffice = new google.maps.LatLng(-33.867386, 151.195767);

    var map = new google.maps.Map(mapDiv, {
        center: latlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControl: true,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        }
    });

    var panoramaOptions = {
        position: latlng,
        panoProvider:  getCustomPanorama,
        visible: true
    };
    var panorama = map.getStreetView();
    panorama.setOptions(panoramaOptions);


    function getCustomPanorama(pano) {
      switch(pano) {
        case 'reception':
          return {
            location: {
              pano: 'reception',
              description: 'Google Sydney - Reception',
              latLng: new google.maps.LatLng(-33.86684, 151.19583)
            },
            links: [],
            // The text for the copyright control.
            copyright: 'Imagery (c) 2010 Google',
            // The definition of the tiles for this panorama.
            tiles: {
              tileSize: new google.maps.Size(1024, 512),
              worldSize: new google.maps.Size(2048, 1024),
              // The heading at the origin of the panorama tile set.
              centerHeading: 105,
              getTileUrl: getCustomPanoramaTileUrl
            }
          };
          break;
        default:
          return null;
      }
    }



});
