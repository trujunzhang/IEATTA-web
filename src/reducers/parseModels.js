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
  id: string,
  name: string,
  loginType: string,
  email: string,
  slug: string,
  defaultFolderId: string,
  folders: Array<Folder>,
  upvotedPosts: Array<string>, // PostId array
  downvotedPosts: Array<string>, // PostId array
  upvotedComments: Array<string>, // commentId array
  downvotedComments: Array<string>, // commentId array
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
  restaurantId: string;
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

export function fromParsePointer(map: Object): Pointer {
  return {
    id: map.id,
  }
}

export function fromParseUser(map: Object): User {
  return {
    id: map.id,
    name: map.get('username'),
    slug: map.get('slug'),
    loginType: map.get('loginType'),
    email: map.get('email'),

    upvotedPosts: _.pluck((map.get('upvotedPosts') || []).map(fromParsePointer), 'id'),
    downvotedPosts: _.pluck((map.get('downvotedPosts') || []).map(fromParsePointer), 'id'),
    upvotedComments: _.pluck((map.get('upvotedComments') || []).map(fromParsePointer), 'id'),
    downvotedComments: _.pluck((map.get('downvotedComments') || []).map(fromParsePointer), 'id')
  };
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


