import createJsonLogicApply from './createJsonLogicApply';

import isArray from './helpers/isArray';
import is_logic from './helpers/is_logic';
import truthy from './helpers/truthy';
import get_operator_name from './helpers/get_operator_name';
import get_values from './helpers/get_values';
import uses_data from './helpers/uses_data';
import rule_like from './helpers/rule_like';

import * as op from './operations';

const defaultOperators = {
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
  '?:': op.if,
  'if': op.if,
  'in': op.in,
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
  'var': op.var,
  /* eslint-enable */
};

function add_operation(name, operator) {
  if (isArray(name)) {
    name.forEach(key => add_operation(key, operator));
    return;
  }
  if (typeof operator === 'function') {
    // `operator` is a function(args...)
    // need to rework as function(apply, data, raw_args)
    defaultOperators[name] = (apply, data, raw_args) => {
      const args = raw_args.map(raw_arg => apply(raw_arg, data));
      return operator(...args);
    };
  } else if (typeof operator === 'object') {
    Object.getOwnPropertyNames(operator).forEach(prop_name => {
      add_operation(`${name}.${prop_name}`, operator[prop_name]);
    });
  }
}

function rm_operation(name) {
  if (isArray(name)) {
    name.forEach(key => rm_operation(key));
    return;
  }
  delete defaultOperators[name];
}

// export original public API:
export default {
  apply: createJsonLogicApply(defaultOperators),
  add_operation,
  rm_operation,

  is_logic,
  truthy,
  get_operator_name,
  get_values,
  uses_data,
  rule_like,
};
