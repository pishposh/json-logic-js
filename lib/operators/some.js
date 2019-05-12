export default (function (apply, data, raw_args) {
  var filtered = apply({
    filter: raw_args
  }, data);
  return filtered.length > 0;
});