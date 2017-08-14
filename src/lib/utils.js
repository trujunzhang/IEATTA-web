const {isImmutable, Map, List, Stack} = require('immutable')

// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
const delay = (function () {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

export function convertToObject(source: Any) {
  if (isImmutable(source)) {
    return source.toJS()
  }
  return source
}

export function delayEvent(callback, ms) {
  delay(() => {
    callback();
  }, ms);
}
