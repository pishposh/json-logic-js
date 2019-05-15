export default (function (apply, data, raw_args) {
  var _apply = apply(raw_args, data),
      source = _apply[0],
      start = _apply[1],
      end = _apply[2];

  if (end < 0) {
    // JavaScript doesn't support negative end, this emulates PHP behavior
    var temp = String(source).substr(start);
    return temp.substr(0, temp.length + end);
  }

  return String(source).substr(start, end);
});