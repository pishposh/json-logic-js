import preapply_args from '../helpers/preapply_args';

export default preapply_args((a, b, c) => {
  return c === undefined ? a <= b : a <= b && b <= c;
});
