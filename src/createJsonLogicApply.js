import isArray from './helpers/isArray';
import is_logic from './helpers/is_logic';
import get_operator_name from './helpers/get_operator_name';

export default operators =>
  function apply(logic, data) {
    if (!data) data = {}; // eslint-disable-line no-param-reassign

    // Does this array contain logic? Only one way to find out.
    if (isArray(logic)) {
      return logic.map(l => apply(l, data));
    }
    // You've recursed to a primitive, stop!
    if (!is_logic(logic)) {
      return logic;
    }

    const op_name = get_operator_name(logic);
    let args = logic[op_name]; // operands

    // easy syntax for unary operators, like {"var" : "x"} instead of strict {"var" : ["x"]}
    if (!isArray(args)) {
      args = [args];
    }

    const operator = operators[op_name];
    if (!operator) {
      throw new Error(`Unrecognized operation ${op_name}`);
    }

    return operator(apply, data, args);
  };
