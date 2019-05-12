import truthy from '../helpers/truthy';

const op = (apply, data, raw_args) => {
  let arg;

  // eslint-disable-next-line no-restricted-syntax
  for (const raw_arg of raw_args) {
    arg = apply(raw_arg, data);
    if (!truthy(arg)) {
      return arg;
    }
  }
  return arg; // Last
};

op.deepFirst = false;
export default op;
