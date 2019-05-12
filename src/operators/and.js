import truthy from '../helpers/truthy';

export default (apply, data, raw_args) => {
  let arg;

  for (const raw_arg of raw_args) {
    arg = apply(raw_arg, data);
    if (!truthy(arg)) {
      return arg;
    }
  }
  return arg; // Last
}
