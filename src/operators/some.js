export default (apply, data, raw_args) => {
  const filtered = apply({ filter: raw_args }, data);

  return filtered.length > 0;
}
