export default (function (apply, data, raw_args) {
  var _apply = apply(raw_args, data),
      a = _apply[0],
      b = _apply[1];

  return a > b;
});