let Parameters = {}

Parameters.Restaurants= require('./restaurants').default
Parameters.Events = require('./events').default
Parameters.Users = require('./users').default
Parameters.Reviews = require('./reviews').default
Parameters.Recipes = require('./recipes').default
Parameters.Photos = require('./photos').default
Parameters.PeopleInEvent = require('./peopleInEvent').default

export default Parameters

