export default (function (apply, data, raw_args) {
  var _apply = apply(raw_args, data),
      a = _apply[0],
      b = _apply[1];

  if (!b || typeof b.indexOf === 'undefined') return false;
  return b.indexOf(a) !== -1;
});