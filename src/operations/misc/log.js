export default (apply, data, raw_args) => {
  const [a] = apply(raw_args, data);
  // eslint-disable-next-line no-console
  console.log(a);
  return a;
};
