export default (apply, data, raw_args) => {
  const args = apply(raw_args, data);
  return args.reduce((a, b) => a.concat(b), []);
};
