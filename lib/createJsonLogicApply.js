import isArray from './helpers/isArray';
import is_logic from './helpers/is_logic';
import get_operator_name from './helpers/get_operator_name';
export default (function (operators) {
  return function apply(logic, data) {
    if (!data) data = {}; // eslint-disable-line no-param-reassign
    // Does this array contain logic? Only one way to find out.

    if (isArray(logic)) {
      return logic.map(function (l) {
        return apply(l, data);
      });
    } // You've recursed to a primitive, stop!


    if (!is_logic(logic)) {
      return logic;
    }

    var op_name = get_operator_name(logic);
    var args = logic[op_name]; // operands
    // easy syntax for unary operators, like {"var" : "x"} instead of strict {"var" : ["x"]}

    if (!isArray(args)) {
      args = [args];
    }

    var operator = operators[op_name];

    if (!operator) {
      throw new Error("Unrecognized operation " + op_name);
    }

    return operator(apply, data, args);
  };
});