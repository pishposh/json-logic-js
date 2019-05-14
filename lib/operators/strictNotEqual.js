import preapply_args from '../helpers/preapply_args';
export default preapply_args(function (a, b) {
  return a !== b;
});