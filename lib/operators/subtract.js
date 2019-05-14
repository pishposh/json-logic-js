import preapply_args from '../helpers/preapply_args';
export default preapply_args(function (a, b) {
  if (b === undefined) {
    return -a;
  }

  return a - b;
});