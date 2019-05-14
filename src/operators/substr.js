import preapply_args from '../helpers/preapply_args';

export default preapply_args((source, start, end) => {
  if (end < 0) {
    // JavaScript doesn't support negative end, this emulates PHP behavior
    const temp = String(source).substr(start);
    return temp.substr(0, temp.length + end);
  }
  return String(source).substr(start, end);
});
