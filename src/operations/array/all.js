import truthy from '../../helpers/truthy';

export default (apply, data, raw_args) => {
  const scopedData = apply(raw_args[0], data);
  const scopedLogic = raw_args[1];
  // All of an empty set is false. Note, some and none have correct fallback after the for loop
  if (!scopedData.length) {
    return false;
  }
  for (let i = 0; i < scopedData.length; i += 1) {
    if (!truthy(apply(scopedLogic, scopedData[i]))) {
      return false; // First falsy, short circuit
    }
  }
  return true; // All were truthy
};
