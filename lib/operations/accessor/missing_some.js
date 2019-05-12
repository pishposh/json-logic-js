import missing from './missing';

function missing_some(need_count, options) {
  // missing_some takes two arguments, how many (minimum) items must be present, and an array of keys (just like 'missing') to check for presence.
  var are_missing = missing.call(this, options);

  if (options.length - are_missing.length >= need_count) {
    return [];
  }

  return are_missing;
}

export default missing_some;