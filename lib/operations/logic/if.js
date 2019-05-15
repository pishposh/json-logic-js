import truthy from '../../helpers/truthy'; // function condition(apply, data, values) {

export default (function (apply, data, raw_args) {
  var i;
  /* 'if' should be called with a odd number of parameters, 3 or greater
    This works on the pattern:
    if( 0 ){ 1 }else{ 2 };
    if( 0 ){ 1 }else if( 2 ){ 3 }else{ 4 };
    if( 0 ){ 1 }else if( 2 ){ 3 }else if( 4 ){ 5 }else{ 6 };
     The implementation is:
    For pairs of values (0,1 then 2,3 then 4,5 etc)
    If the first evaluates truthy, evaluate and return the second
    If the first evaluates falsy, jump to the next pair (e.g, 0,1 to 2,3)
    given one parameter, evaluate and return it. (it's an Else and all the If/ElseIf were false)
    given 0 parameters, return NULL (not great practice, but there was no Else)
    */

  for (i = 0; i < raw_args.length - 1; i += 2) {
    if (truthy(apply(raw_args[i], data))) {
      return apply(raw_args[i + 1], data);
    }
  }

  if (raw_args.length === i + 1) {
    return apply(raw_args[i], data);
  }

  return null;
});