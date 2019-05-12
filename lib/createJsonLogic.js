import isArray from './helpers/isArray';
import is_logic from './helpers/is_logic';
import get_operator_name from './helpers/get_operator_name';

function createJsonLogic(operations) {
  if (operations === void 0) {
    operations = {};
  }

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
      operations[name] = function (apply, data, raw_args) {
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

    delete operations[name];
  }

  function apply(logic, data) {
    if (!data) data = {}; // Does this array contain logic? Only one way to find out.

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

    var operator = operations[op_name];

    if (!operator) {
      throw new Error("Unrecognized operation " + op_name);
    }

    return operator(apply, data, args);
  }

  return {
    apply: apply,
    add_operation: add_operation,
    rm_operation: rm_operation
  };
}

export default createJsonLogic;