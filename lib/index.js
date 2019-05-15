function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import createJsonLogic from './createJsonLogic';
import isArray from './helpers/isArray';
import is_logic from './helpers/is_logic';
import truthy from './helpers/truthy';
import get_operator_name from './helpers/get_operator_name';
import get_values from './helpers/get_values';
import uses_data from './helpers/uses_data';
import rule_like from './helpers/rule_like';
import * as op from './operations'; // export original public API:

export default _extends({}, createJsonLogic({
  /* eslint-disable */
  '+': op.add,
  'all': op.all,
  'and': op.and,
  'cat': op.cat,
  '/': op.divide,
  '==': op.equal,
  'filter': op.filter,
  '>': op.greater,
  '>=': op.greaterEqual,
  '?:': op["if"],
  'if': op["if"],
  'in': op["in"],
  '<': op.less,
  '<=': op.lessEqual,
  'log': op.log,
  'map': op.map,
  'max': op.max,
  'merge': op.merge,
  'method': op.method,
  'min': op.min,
  'missing': op.missing,
  'missing_some': op.missing_some,
  '%': op.modulo,
  '*': op.multiply,
  'none': op.none,
  '!': op.not,
  '!=': op.notEqual,
  '!!': op.notnot,
  'or': op.or,
  'reduce': op.reduce,
  'some': op.some,
  '===': op.strictEqual,
  '!==': op.strictNotEqual,
  'substr': op.substr,
  '-': op.subtract,
  'var': op["var"]
  /* eslint-enable */

}, true), {
  is_logic: is_logic,
  truthy: truthy,
  get_operator_name: get_operator_name,
  get_values: get_values,
  uses_data: uses_data,
  rule_like: rule_like
});