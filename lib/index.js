import createJsonLogicApply from './createJsonLogicApply';
import isArray from './helpers/isArray';
import is_logic from './helpers/is_logic';
import truthy from './helpers/truthy';
import get_operator_name from './helpers/get_operator_name';
import get_values from './helpers/get_values';
import uses_data from './helpers/uses_data';
import rule_like from './helpers/rule_like';
import * as op from './operations';
var defaultOperators = {
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

};

function add_operation(name, operator) {
  if (isArray(name)) {
    name.forEach(function (key) {
      return add_operation(key, operator);
    });
    return;
  }

  if (typeof operator === 'function') {
    // `operator` is a function(args...)
    // need to rework as function(apply, data, raw_args)
    defaultOperators[name] = function (apply, data, raw_args) {
      var args = raw_args.map(function (raw_arg) {
        return apply(raw_arg, data);
      });
      return operator.apply(void 0, args);
    };
  } else if (typeof operator === 'object') {
    Object.getOwnPropertyNames(operator).forEach(function (prop_name) {
      add_operation(name + "." + prop_name, operator[prop_name]);
    });
  }
}

function rm_operation(name) {
  if (isArray(name)) {
    name.forEach(function (key) {
      return rm_operation(key);
    });
    return;
  }

  delete defaultOperators[name];
} // export original public API:


export default {
  apply: createJsonLogicApply(defaultOperators),
  add_operation: add_operation,
  rm_operation: rm_operation,
  is_logic: is_logic,
  truthy: truthy,
  get_operator_name: get_operator_name,
  get_values: get_values,
  uses_data: uses_data,
  rule_like: rule_like
};