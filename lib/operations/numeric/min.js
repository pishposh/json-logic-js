export default (function (apply, data, raw_args) {
  var args = apply(raw_args, data);
  return Math.min.apply(Math, args);
});