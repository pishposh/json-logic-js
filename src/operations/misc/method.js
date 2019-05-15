export default (apply, data, raw_args) => {
  const [obj, methodName, args] = apply(raw_args, data);

  // eslint-disable-next-line prefer-spread
  return obj[methodName].apply(obj, args);
};
