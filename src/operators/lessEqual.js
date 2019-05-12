export default (apply, data, raw_args) => {
  const [a, b, c] = apply(raw_args, data);
  return c === undefined ? a <= b : a <= b && b <= c;
}
