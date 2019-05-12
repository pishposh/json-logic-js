export default (apply, data, raw_args) => {
  const [source, start, end] = apply(raw_args, data);

  if (end < 0) {
    // JavaScript doesn't support negative end, this emulates PHP behavior
    const temp = String(source).substr(start);
    return temp.substr(0, temp.length + end);
  }
  return String(source).substr(start, end);
}
