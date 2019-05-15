import isArray from '../../helpers/isArray';
import truthy from '../../helpers/truthy';
export default (function (apply, data, raw_args) {
  var scopedData = apply(raw_args[0], data);
  var scopedLogic = raw_args[1];

  if (!isArray(scopedData)) {
    return [];
  } // Return only the elements from the array in the first argument,
  // that return truthy when passed to the logic in the second argument.
  // For parity with JavaScript, reindex the returned array


  return scopedData.filter(function (datum) {
    return truthy(apply(scopedLogic, datum));
  });
});