import truthy from '../../helpers/truthy'; // function or(apply, data, values) {

export default (function (apply, data, raw_args) {
  var current;

  for (var i = 0; i < raw_args.length; i++) {
    current = apply(raw_args[i], data);

    if (truthy(current)) {
      return current;
    }
  }

  return current; // Last
});