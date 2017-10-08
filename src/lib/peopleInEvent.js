const _ = require('underscore')
const md5 = require('blueimp-md5')
import moment from 'moment'

const PeopleInEvent = {
  config: {
    paginationCountPerPage: 10, //Using it now.
  }
}

PeopleInEvent.getRecipeIds = function (peopleInEventModels) {

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

export default PeopleInEvent;