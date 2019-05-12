import truthy from '../helpers/truthy';
export default (function (apply, data, raw_args) {
  var _apply = apply(raw_args, data),
      a = _apply[0];

  return !truthy(a);
});