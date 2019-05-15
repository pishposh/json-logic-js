import truthy from '../../helpers/truthy';
export default (function (apply, data, raw_args) {
  var arg; // eslint-disable-next-line no-restricted-syntax

  for (var _iterator = raw_args, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var raw_arg = _ref;
    arg = apply(raw_arg, data);

    if (!truthy(arg)) {
      return arg;
    }
  }

  return arg; // Last
});