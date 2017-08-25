const slugify = require('slugify')
const _ = require('underscore')

export type Cloudinary = {
  name: string;
  url: string;
}

export type Pointer = {
  id: string
}


export type User = {
  // Basic Fields
  id: string;
  createdAt: Date;
  updatedAt: Date;
  // Attributes
  username: string;
  loginType: string;
  email: string;
  // Photos
  listPhotoId: string;
  // voting
  useful: Array;
  funny: Array;
  cool: Array;
}

export type Photo = {
  id: string;
  original: string;
  thumbnail: string;
  url: string;
  photoType: string;
}


export type Event = {
  // Basic Fields
  id: string;
  createdAt: Date;
  updatedAt: Date;
  // Attributes
  displayName: string;
  start: Date;
  end: Date;
  want: string;
  // Pointer
  restaurant: Restaurant;
}


export type Recipe = {
  // Basic Fields
  id: string;
  createdAt: Date;
  updatedAt: Date;
  // Attributes
  displayName: string;
  price: string;
  // Point
  photos: Array<Photo>;
  // Relation
  restaurant: Restaurant;
  event: Event;
  user: User;
}


export type Restaurant = {
  // Basic Fields
  id: string;
  createdAt: Date;
  updatedAt: Date;
  // Attributes
  displayName: string;
  geoLocation: Any;
  // Google Address
  address: string;
  street_number: string,
  route: string,
  locality: string,
  sublocality: string,
  country: string,
  postal_code: string,
  administrative_area: string,
  // Photos
  listPhotoId: string;
};


export type Review = {
  // Basic Fields
  id: string;
  createdAt: Date;
  updatedAt: Date;
  // Attributes
  rate: int;
  body: string;
  reviewType: string;
  // Pointer
  restaurant: Restaurant;
  event: Event;
  recipe: Recipe;
  // Relation
  user: User;
  // voting
  useful: int;
  funny: int;
  cool: int;
};

export type PeopleInEvent = {
  // Basic Fields
  id: string;
  createdAt: Date;
  updatedAt: Date;
  // Attributes
  //...
  // Pointer
  restaurant: Restaurant,
  event: Event,
  user: User
}

export function fromParsePointer(map: Object): Pointer {
  return {
    id: map.id,
  }
}


function _get_default_image_photo_id(map) {
  const photos = map.get('photos') || []

  // debugger
  if (photos.length > 0) {
    return photos[0].id;
  }
  return '';
}

export function fromParseUser(map: Object): User {
  return {
    // Basic Fields
    id: map.id,
    createdAt: map.get('createdAt'),
    updatedAt: map.get('updatedAt'),
    // Attributes
    username: map.get('username'),
    loginType: map.get('loginType'),
    email: map.get('email') || "",
    // Photos
    listPhotoId: _get_default_image_photo_id(map),
    // Photos
    photos: (map.get('photos') || []).map(fromParsePhotoNormal),
    // voting
    useful: _.pluck((map.get('useful') || []).map(fromParsePointer), 'id').join(';'),
    funny: _.pluck((map.get('funny') || []).map(fromParsePointer), 'id').join(';'),
    cool: _.pluck((map.get('cool') || []).map(fromParsePointer), 'id').join(';')
  }
}

function parsePhotoNormal(map: Object): Object {
  return {
    // Basic Fields
    id: map.id,
    createdAt: map.get('createdAt'),
    updatedAt: map.get('updatedAt'),
    // Attributes
    original: map.get('original'),
    thumbnail: map.get('thumbnail'),
    url: map.get('url'),
    photoType: map.get('photoType'),
  };
}

function fromParsePhotoNormal(map: Object): Photo {
  return parsePhotoNormal(map)
}

export function fromParsePhoto(map: Object): Photo {
  const instance = {
    ...parsePhotoNormal(map),
    // Relations
    restaurant: map.get('restaurant') && fromParseRestaurant(map.get('restaurant')),
    event: map.get('event') && fromParseEvent(map.get('event')),
    recipe: map.get('recipe') && fromParseRecipe(map.get('recipe')),
    user: map.get('user') && fromParseUser(map.get('user'))
  }
  return instance
}


export function fromParseRecipe(map: Object): Recipe {
  return {
    // Basic Fields
    id: map.id,
    createdAt: map.get('createdAt'),
    updatedAt: map.get('updatedAt'),
    // Attributes
    displayName: map.get('displayName'),
    price: map.get('price'),
    // Pointer
    photos: (map.get('photos') || []).map(fromParsePhotoNormal),
    // Relations
    restaurant: map.get('restaurant') && fromParseRestaurant(map.get('restaurant')),
    event: map.get('event') && fromParseEvent(map.get('event')),
    user: map.get('user') && fromParseUser(map.get('user'))
  }
}


export function fromParseEvent(map: Object): Event {
  return {
    // Basic Fields
    id: map.id,
    createdAt: map.get('createdAt'),
    updatedAt: map.get('updatedAt'),
    // Attributes
    displayName: map.get('displayName'),
    slug: map.get('slug'),
    start: map.get('start'),
    end: map.get('end'),
    want: map.get('want'),
    // Pointer
    restaurant: map.get('restaurant') && fromParseRestaurant(map.get('restaurant'))
  }
}


export function fromParseRestaurant(map: Object): Restaurant {
  return {
    // Basic Fields
    id: map.id,
    createdAt: map.get('createdAt') || new Date(),
    updatedAt: map.get('updatedAt') || new Date(),
    // Attributes
    displayName: map.get('displayName') || '',
    geoLocation: map.get('geoLocation') || '',
    // Google address
    address: map.get('address') || '',
    street_number: map.get('street_number') || '',
    route: map.get('route') || '',
    locality: map.get('locality') || '',
    sublocality: map.get('sublocality') || '',
    country: map.get('country') || '',
    postal_code: map.get('postal_code') || '',
    administrative_area: map.get('administrative_area') || '',
    // Photos
    photos: (map.get('photos') || []).map(fromParsePhotoNormal),
  }
}


export function fromParsePeopleInEvent(map: Object): PeopleInEvent {
  // debugger
  return {
    // Basic Fields
    id: map.id,
    createdAt: map.get('createdAt') || new Date(),
    updatedAt: map.get('updatedAt') || new Date(),
    // Attributes
    // ...
    // Pointer
    restaurant: map.get('restaurant') && fromParseRestaurant(map.get('restaurant')),
    event: map.get('event') && fromParseEvent(map.get('event')),
    user: map.get('user') && fromParseUser(map.get('user'))
  }
}


export function fromParseReview(map: Object): Review {
  return {
    // Basic Fields
    id: map.id,
    createdAt: map.get('createdAt'),
    updatedAt: map.get('updatedAt'),
    // Attributes
    rate: map.get('rate'),
    body: map.get('body'),
    reviewType: map.get('reviewType'),
    // Pointer
    restaurant: map.get('restaurant') && fromParseRestaurant(map.get('restaurant')),
    event: map.get('event') && fromParseEvent(map.get('event')),
    recipe: map.get('recipe') && fromParseRecipe(map.get('recipe')),
    // Relation
    user: map.get('user') && fromParseUser(map.get('user')),
    // voting
    useful: map.get('useful'),
    funny: map.get('funny'),
    cool: map.get('cool')
  }
}
