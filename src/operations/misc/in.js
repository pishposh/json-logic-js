export default (apply, data, raw_args) => {
  const [a, b] = apply(raw_args, data);
  if (!b || typeof b.indexOf === 'undefined') return false;
  return b.indexOf(a) !== -1;
};
