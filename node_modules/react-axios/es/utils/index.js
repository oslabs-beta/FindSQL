export function debounce(func, wait, immediate) {
  var timeout = void 0;
  var initialArgs = void 0;
  return function () {
    var context = this,
        args = arguments;
    if (!timeout) {
      initialArgs = args;
      if (immediate) func.apply(context, args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate || immediate && initialArgs != args) func.apply(context, args);
    }, wait);
  };
}