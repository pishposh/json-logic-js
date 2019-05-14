import preapply_args from '../helpers/preapply_args';
export default preapply_args(function () {
  return Math.max.apply(Math, arguments);
});