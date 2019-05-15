import isArray from '../../helpers/isArray';
import truthy from '../../helpers/truthy';

export default (apply, data, raw_args) => {
  const scopedData = apply(raw_args[0], data);
  const scopedLogic = raw_args[1];

  if (!isArray(scopedData)) {
    return [];
  }
  // Return only the elements from the array in the first argument,
  // that return truthy when passed to the logic in the second argument.
  // For parity with JavaScript, reindex the returned array
  return scopedData.filter(datum => truthy(apply(scopedLogic, datum)));
};
