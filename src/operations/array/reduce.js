import isArray from '../../helpers/isArray';

export default (apply, data, raw_args) => {
  const scopedData = apply(raw_args[0], data);
  const scopedLogic = raw_args[1];
  const initial = typeof raw_args[2] !== 'undefined' ? raw_args[2] : null;

  if (!isArray(scopedData)) {
    return initial;
  }

  return scopedData.reduce(
    (accumulator, current) => apply(scopedLogic, { current, accumulator }),
    initial
  );
};
