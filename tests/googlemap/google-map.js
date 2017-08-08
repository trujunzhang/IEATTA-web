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

// import GoogleMapResults from './google-map-results.json'
const GoogleMapResults = require('./google-map-results.json'); //with path

function parse_address(response) {
  const results = response.results;

  let final = {};

  results.map((item, index) => {
    const types = item.types.join(',');
    const value = item.formatted_address;

    if (types.indexOf('premise') !== -1) {
      const component = item.address_components;

      // step1: get the whole address.
      final['address'] = value;
      // step2: get the detailed info.

      component.map((data, index) => {
        const dataTypes = data.types.join(';')
        if (dataTypes.indexOf('street_number') !== -1) {
          final['street_number'] = data.short_name;
        } else if (dataTypes.indexOf('route') !== -1) {
          final['route'] = data.short_name;
        } else if (dataTypes.indexOf('locality') !== -1) {
          final['locality'] = data.short_name;
        } else if (dataTypes.indexOf('country') !== -1) {
          final['country'] = data.short_name;
        } else if (dataTypes.indexOf('postal_code') !== -1) {
          final['postal_code'] = data.short_name;
        } else if (dataTypes.indexOf('administrative_area_level_1') !== -1) {
          final['administrative_area'] = data.short_name;
        }
      })
    }
  })

  return final;
}

const final = parse_address(GoogleMapResults)
console.log(JSON.stringify(final))

