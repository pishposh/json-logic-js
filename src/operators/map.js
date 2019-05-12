import isArray from '../helpers/isArray';

export default (apply, data, raw_args) => {
  const scopedData = apply(raw_args[0], data);
  const scopedLogic = raw_args[1];

  if (!isArray(scopedData)) {
    return [];
  }

  return scopedData.map(datum => apply(scopedLogic, datum));
}
