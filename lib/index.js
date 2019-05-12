import createJsonLogic from './createJsonLogic';
import is_logic from './helpers/is_logic';
import truthy from './helpers/truthy';
import get_operator_name from './helpers/get_operator_name';
import get_values from './helpers/get_values';
import uses_data from './helpers/uses_data';
import rule_like from './helpers/rule_like';
import op_add from './operators/add';
import op_all from './operators/all';
import op_and from './operators/and';
import op_cat from './operators/cat';
import op_divide from './operators/divide';
import op_equal from './operators/equal';
import op_filter from './operators/filter';
import op_greater from './operators/greater';
import op_greaterEqual from './operators/greaterEqual';
import op_if from './operators/if';
import op_in from './operators/in';
import op_less from './operators/less';
import op_lessEqual from './operators/lessEqual';
import op_log from './operators/log';
import op_map from './operators/map';
import op_max from './operators/max';
import op_merge from './operators/merge';
import op_method from './operators/method';
import op_min from './operators/min';
import op_missing from './operators/missing';
import op_missing_some from './operators/missing_some';
import op_modulo from './operators/modulo';
import op_multiply from './operators/multiply';
import op_none from './operators/none';
import op_not from './operators/not';
import op_notEqual from './operators/notEqual';
import op_notnot from './operators/notnot';
import op_or from './operators/or';
import op_reduce from './operators/reduce';
import op_some from './operators/some';
import op_strictEqual from './operators/strictEqual';
import op_strictNotEqual from './operators/strictNotEqual';
import op_substr from './operators/substr';
import op_subtract from './operators/subtract';
import op_var from './operators/var'; // console.log(less);

var jsonLogic = createJsonLogic({
  /* eslint-disable */
  '+': op_add,
  'all': op_all,
  'and': op_and,
  'cat': op_cat,
  '/': op_divide,
  '==': op_equal,
  'filter': op_filter,
  '>': op_greater,
  '>=': op_greaterEqual,
  '?:': op_if,
  'if': op_if,
  'in': op_in,
  '<': op_less,
  '<=': op_lessEqual,
  'log': op_log,
  'map': op_map,
  'max': op_max,
  'merge': op_merge,
  'method': op_method,
  'min': op_min,
  'missing': op_missing,
  'missing_some': op_missing_some,
  '%': op_modulo,
  '*': op_multiply,
  'none': op_none,
  '!': op_not,
  '!=': op_notEqual,
  '!!': op_notnot,
  'or': op_or,
  'reduce': op_reduce,
  'some': op_some,
  '===': op_strictEqual,
  '!==': op_strictNotEqual,
  'substr': op_substr,
  '-': op_subtract,
  'var': op_var
  /* eslint-enable */

}); // restore original public API

jsonLogic.is_logic = is_logic;
jsonLogic.truthy = truthy;
jsonLogic.get_operator = get_operator_name;
jsonLogic.get_values = get_values;
jsonLogic.uses_data = uses_data;
jsonLogic.rule_like = rule_like;
export default jsonLogic;