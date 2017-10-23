const _ = require('underscore')
const md5 = require('blueimp-md5')
import moment from 'moment'

const PeopleInEvent = {
  config: {
    paginationCountPerPage: 10, //Using it now.
  }
}

PeopleInEvent.getRecipeIdsForQuery = function (peopleInEventModels) {
  const multipleArrays = _.pluck(peopleInEventModels, 'recipes')
  const arrays = _.reduce(multipleArrays, function (result, arr) {
    return result.concat(arr)
  }, [])

  let recipeIds = _.pluck(arrays, 'id')
  recipeIds = _.unique(recipeIds);
  recipeIds = recipeIds.slice(0, 0 + PeopleInEvent.config.paginationCountPerPage)

  return recipeIds;
}

PeopleInEvent.getOtherUsersAlsoOrderedRecipe = function (list) {
  const users = []
  const userIds = []
  list.map(({user}) => {
    if (userIds.indexOf(user.id) === -1) {
      users.push(user)
      userIds.push(user.id)
    }
  })

  return users;
}

PeopleInEvent.getOrderedRecipeDict = function (peopleInEventListTask) {
  let dict = {};
  peopleInEventListTask.results.map(function (item) {
    const user = item.user;
    dict[user.id] = item.recipes;
  })

  return dict;
}

PeopleInEvent.getSelectedUserId = function (nextProps, peopleInEventListTask, leftUsersListTask) {
  const {location} = nextProps;
  const {query} = location;
  if (!!query.userId) {
    return query.userId;
  }

  const usersResults = leftUsersListTask.results;
  if (usersResults.length > 0) {
    return usersResults[0].id
  }

  return '';
}

PeopleInEvent.getOrderedRecipeIds = function (props) {
  const {
    peopleInEventListDict,
    selectedUserId,
  } = props;

  const orderedRecipes = peopleInEventListDict[selectedUserId]

  return _.pluck(orderedRecipes, 'id')
}

PeopleInEvent.getOrderedRecipeCount = function (user, peopleInEventListDict) {
  if (Object.keys(peopleInEventListDict).indexOf(user.id) === -1) {
    return 0;
  }

  return peopleInEventListDict[user.id].length;
}


PeopleInEvent.generateParseObjectUniqueId = function (event, user) {
  return `${event.uniqueId}_${user.uniqueId}`
}


export default PeopleInEvent;
