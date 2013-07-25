/*global define */
define(['jquery', 'async!http://maps.google.com/maps/api/js?sensor=false'],
	function ($) {
    'use strict';

	var map,
		latlng = new google.maps.LatLng(50.720081,-1.879894);

	var createMap = function(){
		var mapDiv = document.getElementById('map-canvas');
    	map = new google.maps.Map(mapDiv, {
	        center: latlng,
	        zoom: 16,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        navigationControl: true,
	        navigationControlOptions: {
	            style: google.maps.NavigationControlStyle.SMALL
	        }
	    });
	};

	var createPano = function(){
	    var panoramaOptions = {
	    	pano: 'thesquare',
	        panoProvider:  getCustomPanorama,
	        visible: true
	    };
	    var panorama = map.getStreetView();
	    panorama.setOptions(panoramaOptions);
	};

	var getCustomPanorama = function(pano) {
      switch(pano) {
        case 'thesquare':
          return {
            location: {
              pano: 'thesquare',
              description: 'Bournemouth - The Square',
              latLng: new google.maps.LatLng(-33.86684, 151.19583)
            },
            links: [],
            // The text for the copyright control.
            copyright: 'Imagery (c) 2013 Flickr',
            // The definition of the tiles for this panorama.
            tiles: {
              tileSize: new google.maps.Size(512, 512),
              worldSize: new google.maps.Size(4096, 2048),
              // The heading at the origin of the panorama tile set.
              centerHeading: 105,
              getTileUrl: getCustomPanoramaTileUrl
            }
          };
          break;
        default:
          return null;
      }
    };

    var getCustomPanoramaTileUrl = function(pano, zoom, tileX, tileY) {
	  // Return a pano image given the panoID.
	  var imagepath = 'images/thesquare-' + zoom + '-' + tileX + '-' +tileY +
	      '.jpg';
	  return imagepath;
	}

    return {

    	init: function(){
			createMap();
			createPano();
    	}

    };
});