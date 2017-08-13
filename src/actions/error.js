const {
  RESET_ERROR
} = require('../lib/constants').default

export function resetError() {
  return {
    type: RESET_ERROR
  }
}
