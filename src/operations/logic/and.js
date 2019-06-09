import truthy from '../../helpers/truthy';

export default (apply, data, raw_args) => {
  let arg;

  for (let i = 0; i < raw_args.length; i++) {
    const raw_arg = raw_args[i];
    arg = apply(raw_arg, data);
    if (!truthy(arg)) {
      return arg;
    }
  }
  return arg; // Last
};
