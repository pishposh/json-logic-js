export default fn => {
  return (apply, data, raw_args) => {
    return fn(...apply(raw_args, data));
  };
};
