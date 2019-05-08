function multiply(...args) {
  return args.reduce((a, b) => parseFloat(a) * parseFloat(b), 1);
}

multiply.op = '*';

export default multiply;
