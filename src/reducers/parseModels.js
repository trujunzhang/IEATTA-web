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
  id: string;
  displayname: string;
  slug: string;
  price: string;
  photos: Array<Photo>;
  restaurant: Post;
  event: Event;
  user: User;
  status: string;
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
    id: map.id,
    name: map.get('name'),
    description: map.get('description'),
    slug: map.get('slug'),
    status: map.get('status'),
    visible: map.get('visible'),
    posts: (map.get('posts') || []).map(fromParseRestaurant)
  };
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
    userId: map.get('user') && map.get('user').id,
  }
}
