'use strict'

/**
 * ## Mocks
 *
 * We don't want to use the devices storage, nor actually call
 * the server
 *
 * Need to mock router so the "keys" are available (see src/__mocks__)
 */

/**
 * ## Tests
 *
 * authActions
 */

const Client = require('node-rest-client').Client;

const client = new Client();

function getGoogleAddres() {
// direct way
  client.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=35.1330343,-90.0625056", function (data, response) {
    // client.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=3.889385,102.460485", function (data, response) {
    // client.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=32.399995,120.555723", function (data, response) {
    const final = parse_address(data);

    debugger

    // parsed response body as js object
    console.log(data);
    // raw response
    console.log(response);
  });
}

setTimeout(getGoogleAddres, 3000);


// import GoogleMapResults from './google-map-results.json'
const GoogleMapResults = require('./google-map-results.json'); //with path

function googleMap_rest() {

}

function parse_address(response) {
  const results = response.results;

  let final = {// length(7)
    'street_number': '',
    'route': '',
    'locality': '',
    "sublocality": '',
    'country': '',
    'postal_code': '',
    'administrative_area': ''
  };

  const item = results[0];
  const value = item.formatted_address;
  const component = item.address_components;

  // step1: get the whole address.
  final['address'] = value;
  // step2: get the detailed info.
  component.map((data, index) => {
    const dataTypes = data.types.join(';');


    if (dataTypes.indexOf('street_number') !== -1) {
      final['street_number'] = data.long_name;
    } else if (dataTypes.indexOf('route') !== -1) {
      final['route'] = data.long_name;
    } else if (dataTypes.indexOf('sublocality') !== -1) {
      final['sublocality'] = data.long_name;
    } else if (dataTypes.indexOf('locality') !== -1) {
      final['locality'] = data.long_name;
    } else if (dataTypes.indexOf('country') !== -1) {
      final['country'] = data.short_name;
    } else if (dataTypes.indexOf('postal_code') !== -1) {
      final['postal_code'] = data.short_name;
    } else if (dataTypes.indexOf('administrative_area_level_1') !== -1) {
      final['administrative_area'] = data.short_name;
    }
  })

  return final;
}

// const final = parse_address(GoogleMapResults)
// console.log(JSON.stringify(final))

