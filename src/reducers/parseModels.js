let slugify = require('slugify')
let _ = require('underscore')

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
  address: string;
  geoLocation: Any;
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
  restaurantId: string,
  eventId: string,
  user: User
}

export function fromParsePointer(map: Object): Pointer {
  return {
    id: map.id,
  }
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
    photos: (map.get('photos') || []).map(fromParsePhoto),
    // voting
    useful: _.pluck((map.get('useful') || []).map(fromParsePointer), 'id').join(';'),
    funny: _.pluck((map.get('funny') || []).map(fromParsePointer), 'id').join(';'),
    cool: _.pluck((map.get('cool') || []).map(fromParsePointer), 'id').join(';')
  }
}

export function fromParsePhoto(map: Object): Photo {
  return {
    id: map.id,
    original: map.get('original'),
    thumbnail: map.get('thumbnail'),
    url: map.get('url'),
    photoType: map.get('photoType'),
  };
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
    photos: (map.get('photos') || []).map(fromParsePhoto),
    // Relations
    restaurant: map.get('restaurant') && fromParseRestaurant(map.get('restaurant')),
    event: map.get('event') && fromParseRestaurant(map.get('event')),
    user: map.get('user') && fromParseRestaurant(map.get('user'))
  }
}


export function fromParseCloudinary(map: Object): Cloudinary {
  return {
    name: map['name'],
    url: map['url']
  };
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
    createdAt: map.get('createdAt'),
    updatedAt: map.get('updatedAt'),
    // Attributes
    displayName: map.get('displayName'),
    address: map.get('address'),
    geoLocation: map.get('geoLocation'),
    // Photos
    photos: (map.get('photos') || []).map(fromParsePhoto),
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
    restaurantId: map.get('restaurant') && map.get('restaurant').id,
    eventId: map.get('event') && map.get('event').id,
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
