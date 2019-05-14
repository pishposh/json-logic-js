import preapply_args from '../helpers/preapply_args';

export default preapply_args((a, b) => {
  if (!b || typeof b.indexOf === 'undefined') return false;
  return b.indexOf(a) !== -1;
});
