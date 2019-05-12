export default (function (apply, data, raw_args) {
  var _apply = apply(raw_args, data),
      obj = _apply[0],
      methodName = _apply[1],
      args = _apply[2]; // eslint-disable-next-line prefer-spread


  return obj[methodName].apply(obj, args);
});