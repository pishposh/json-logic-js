import preapply_args from '../helpers/preapply_args';

export default preapply_args((...args) => {
  return args.reduce((a, b) => parseFloat(a) * parseFloat(b), 1);
});
