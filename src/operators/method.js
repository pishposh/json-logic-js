import preapply_args from '../helpers/preapply_args';

export default preapply_args((obj, methodName, args) => {
  // eslint-disable-next-line prefer-spread
  return obj[methodName].apply(obj, args);
});
