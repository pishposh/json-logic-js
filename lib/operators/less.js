export default (function (apply, data, raw_args) {
  var _apply = apply(raw_args, data),
      a = _apply[0],
      b = _apply[1],
      c = _apply[2];

  return c === undefined ? a < b : a < b && b < c;
});