import preapply_args from '../helpers/preapply_args';

export default preapply_args((...args) => {
  return Math.min(...args);
});
