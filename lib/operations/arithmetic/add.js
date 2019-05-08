function add() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (a, b) {
    return parseFloat(a) + parseFloat(b);
  }, 0);
}

add.op = '+';
export default add;