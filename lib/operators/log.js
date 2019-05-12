export default (function (apply, data, raw_args) {
  var _apply = apply(raw_args, data),
      a = _apply[0]; // eslint-disable-next-line no-console


  console.log(a);
  return a;
});