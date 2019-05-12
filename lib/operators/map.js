import isArray from '../helpers/isArray';
export default (function (apply, data, raw_args) {
  var scopedData = apply(raw_args[0], data);
  var scopedLogic = raw_args[1];

  if (!isArray(scopedData)) {
    return [];
  }

  return scopedData.map(function (datum) {
    return apply(scopedLogic, datum);
  });
});