import truthy from '../../helpers/truthy';

export default (apply, data, raw_args) => {
  const [a] = apply(raw_args, data);
  return !truthy(a);
};
