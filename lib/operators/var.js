export default (function (apply, data, raw_args) {
  var _apply = apply(raw_args, data),
      var_name = _apply[0],
      default_value = _apply[1];

  if (var_name == null || var_name === '') {
    // TODO: shorten to var_name == null?
    return data;
  }

  for (var _iterator = String(var_name).split('.'), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var sub_var_name = _ref;
    data = data[sub_var_name];
    if (!data) break;
  }

  return data != null ? data : default_value != null ? default_value : null;
});