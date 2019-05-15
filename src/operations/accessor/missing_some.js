import missing from './missing';

export default (apply, data, raw_args) => {
  const [need_count, options] = apply(raw_args, data);
  // missing_some takes two arguments, how many (minimum) items must be present, and an array of keys (just like 'missing') to check for presence.
  const are_missing = missing(apply, data, [options]);

  if (options.length - are_missing.length >= need_count) {
    return [];
  }
  return are_missing;
};
