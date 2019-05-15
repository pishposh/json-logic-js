export default (apply, data, raw_args) => {
  const [a, b] = apply(raw_args, data);
  return a >= b;
};
