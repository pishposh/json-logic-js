import truthy from '../helpers/truthy';

// function or(apply, data, values) {
export default (apply, data, raw_args) => {
  let current;

  for (let i = 0; i < raw_args.length; i++) {
    current = apply(raw_args[i], data);
    if (truthy(current)) {
      return current;
    }
  }
  return current; // Last
}
