import isArray from './helpers/isArray';
import is_logic from './helpers/is_logic';
import get_operator_name from './helpers/get_operator_name';

function createJsonLogic(operations = {}) {
  function add_operation(name, operator) {
    if (isArray(name)) {
      name.forEach(key => add_operation(key, operator));
      return;
    }

    if (typeof operator === 'function') {
      // `operator` is a function(args...)
      // need to rework as function(apply, data, raw_args)
      operations[name] = (apply, data, raw_args) => {
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

    delete operations[name];
  }

  function apply(logic, data) {
    if (!data) data = {};

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

    const operator = operations[op_name];
    if (!operator) {
      throw new Error(`Unrecognized operation ${op_name}`);
    }

    return operator(apply, data, args);
  }

  return {
    apply,
    add_operation,
    rm_operation,
  };
}

export default createJsonLogic;
