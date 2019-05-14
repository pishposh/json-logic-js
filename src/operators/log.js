import preapply_args from '../helpers/preapply_args';

export default preapply_args(a => {
  // eslint-disable-next-line no-console
  console.log(a);
  return a;
});
