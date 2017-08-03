let Parameters = {}

Parameters.Posts = require('./restaurants').default
Parameters.Events = require('./events').default
Parameters.Users = require('./users').default
Parameters.Reviews = require('./reviews').default
Parameters.PeopleInEvent = require('./peopleInEvent').default

export default Parameters

