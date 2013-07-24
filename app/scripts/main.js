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

    var map = new google.maps.Map(mapDiv, {
        center: latlng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControl: true,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        }
    });

    var panoramaOptions = {
        position: latlng,
        pov: {
          heading: 34,
          pitch: 10
        }
    };
    var panorama = new  google.maps.StreetViewPanorama(document.getElementById('pano'),panoramaOptions);
    map.setStreetView(panorama);
});
