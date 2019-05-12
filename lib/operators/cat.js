export default (function (apply, data, raw_args) {
  var args = apply(raw_args, data);
  return args.join('');
});