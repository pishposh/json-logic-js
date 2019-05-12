import missing from './missing';
export default (function (apply, data, raw_args) {
  var _apply = apply(raw_args, data),
      need_count = _apply[0],
      options = _apply[1]; // missing_some takes two arguments, how many (minimum) items must be present, and an array of keys (just like 'missing') to check for presence.


  var are_missing = missing(apply, data, [options]);

  if (options.length - are_missing.length >= need_count) {
    return [];
  }

  return are_missing;
});