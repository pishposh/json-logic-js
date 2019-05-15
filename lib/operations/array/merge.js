export default (function (apply, data, raw_args) {
  var args = apply(raw_args, data);
  return args.reduce(function (a, b) {
    return a.concat(b);
  }, []);
});