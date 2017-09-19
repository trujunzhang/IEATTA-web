/**
 * The states were interested in
 */
const {
  PARSE_RESTAURANTS,
  PARSE_USERS,
  PARSE_RECORDS,
  PARSE_EVENTS,
  PARSE_RECIPES,
  PARSE_PHOTOS,
  PARSE_REVIEWS,
  PARSE_PEOPLE_IN_EVENTS
} = require('./constants').default

import Reviews from "./reviews";
import {getCurrentPageIndex} from './link'

const UUID = require('../components/vendor/uuid');

const PaginationTerms = {}

PaginationTerms.generateTermsForReviewsList = function (props, prefix = "list") {
  const {id} = props.forObject;
  const limit = prefix === "page" ? Reviews.config.paginationCountPerPage : 10;

  const listId = `reviews-${prefix}-view-for-${id}`;

  const currentPageIndex = getCurrentPageIndex(props)

  return {
    ...props,
    ...props.location.query,

    listId: listId,
    limit: limit,
    pageIndex: parseInt(currentPageIndex)
  };
}

export default PaginationTerms;

