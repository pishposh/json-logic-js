export default (function (fn) {
  return function (apply, data, raw_args) {
    return fn.apply(void 0, apply(raw_args, data));
  };
});