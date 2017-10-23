const _ = require('underscore')
const md5 = require('blueimp-md5')
import moment from 'moment'

const UUID = require('../components/vendor/uuid');

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
    dict[user.id] = {
      peopleInEvent: item,
      recipes: item.recipes
    }
  })

  return dict;
}


PeopleInEvent.getOrderedRecipeCount = function (user, peopleInEventListDict) {
  if (Object.keys(peopleInEventListDict).indexOf(user.id) === -1) {
    return 0;
  }

  return peopleInEventListDict[user.id].recipes.length;
}

PeopleInEvent.getOrderedRecipeIds = function (props) {
  const {
    peopleInEventListDict,
    selectedUserId,
  } = props;

  if (Object.keys(peopleInEventListDict).indexOf(selectedUserId) !== -1) {
    const orderedRecipes = peopleInEventListDict[selectedUserId].recipes;
    return _.pluck(orderedRecipes, 'id')
  }

  return []
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

/**
 * Update or New an 'PeopleInEvent' Parse Instance
 * @param props
 * @param orderedRecipeIds
 * @param hasOrdered
 * @param recipe
 * @returns {*}
 */
PeopleInEvent.updatePeopleInEventParseInstance = function (props, orderedRecipeIds, hasOrdered, recipe) {
  let newOrderedRecipeIds = orderedRecipeIds

  if (hasOrdered) { // remove
    newOrderedRecipeIds = _.without(orderedRecipeIds, recipe.id)
  } else { // add
    newOrderedRecipeIds.push(recipe.id)
  }

  const {peopleInEventListDict, selectedUserId} = props;
  const event = props.forObject;
  const restaurant = event.restaurant;
  const peopleInEvent = peopleInEventListDict[selectedUserId].peopleInEvent;

  let updatedPeopleInEvent = null;
  if (!!peopleInEvent) {
    updatedPeopleInEvent = Object.assign(peopleInEvent, {
      newOrderedRecipeIds
    })
  } else {
    updatedPeopleInEvent = {
      objectId: UUID.create().toString(),
      uniqueId: PeopleInEvent.generateParseObjectUniqueId(event, selectedUserId),
      restaurant,
      event,
      newOrderedRecipeIds,
      user: {
        id: selectedUserId
      }
    }
    debugger
  }

  return updatedPeopleInEvent;
}


/**
 * Basically, the 'peopleInEvent' parse instance can be created and removed as the same instance.
 * For Example:
 *     1. Created a 'PeopleInEvent' parse object for some use in the event and flagged it as '1'.
 *     2. One day, the 'PeopleInEvent' parse object will be removed only flagged as '0'.
 *     3. Other day, some user also want to create it again, but the parse instance already exist,
 *        So do not need to create a new 'PeopleInEvent' parse object,
 *        Just query it using 'PeopleInEvent' uniqueId.
 * @param event
 * @param userId
 * @returns {string}
 */
PeopleInEvent.generateParseObjectUniqueId = function (event, userId) {
  return `${event.uniqueId}_${userId}`
}


export default PeopleInEvent;
