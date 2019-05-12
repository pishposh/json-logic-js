// export default function add(...args) {
export default (apply, data, raw_args) => {
  const args = apply(raw_args, data);
  return args.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
}
