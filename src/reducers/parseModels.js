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

export type Event = {
  id: string;
  displayname: string;
  slug: string;
  post: Post;
  servers: Server;
  users: User;
  start: string;
  end: string;
  status: string;
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
  id: string;
  url: string;
  displayName: string;
  slug: string;
  body: string;
  sourceFrom: string;
  thumbnailUrl: string;
  userId: string;
  author: string;
  status: int;
  postedAt: Date;
  upvoters: Array<string>, // UserId array
  downvoters: Array<string> // UserId array
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
    defaultFolderId: fromParseFolder(map.get('folders')[0]).id,
    folders: (map.get('folders') || []).map(fromParseFolder),

    upvotedPosts: _.pluck((map.get('upvotedPosts') || []).map(fromParsePointer), 'id'),
    downvotedPosts: _.pluck((map.get('downvotedPosts') || []).map(fromParsePointer), 'id'),
    upvotedComments: _.pluck((map.get('upvotedComments') || []).map(fromParsePointer), 'id'),
    downvotedComments: _.pluck((map.get('downvotedComments') || []).map(fromParsePointer), 'id')
  };
}

export function fromParseTopic(map: Object): Topic {
  return {
    id: map.id,
    name: map.get('name'),
    slug: map.get('slug'),
    status: map.get('status'),
    isIgnore: map.get('isIgnore'),
    active: map.get('active')
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

export function fromParseRestaurant(map: Object): Restaurant {
  return {
    id: map.id,
    displayName: map.get('displayName'),
    address: map.get('address'),
    geoLocation: map.get('geoLocation'),
    photos: map.get('photos'),
    url: map.get('url'),
    status: map.get('status') || 2,
  };
}


