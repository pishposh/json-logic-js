export default (apply, data, raw_args) => {
  const [a, b] = apply(raw_args, data);
  // eslint-disable-next-line eqeqeq
  return a == b;
}
