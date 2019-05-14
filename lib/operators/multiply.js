import preapply_args from '../helpers/preapply_args';
export default preapply_args(function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (a, b) {
    return parseFloat(a) * parseFloat(b);
  }, 1);
});