function add(...args) {
  return args.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
}

add.op = '+';

export default add;
