export default (apply, data, raw_args) => {
  const [a, b] = apply(raw_args, data);
  if (b === undefined) {
    return -a;
  }
  return a - b;
}
