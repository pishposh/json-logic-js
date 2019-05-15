import isArray from '../../helpers/isArray';
export default (function (apply, data, raw_args) {
  var scopedData = apply(raw_args[0], data);
  var scopedLogic = raw_args[1];
  var initial = typeof raw_args[2] !== 'undefined' ? raw_args[2] : null;

  if (!isArray(scopedData)) {
    return initial;
  }

  return scopedData.reduce(function (accumulator, current) {
    return apply(scopedLogic, {
      current: current,
      accumulator: accumulator
    });
  }, initial);
});