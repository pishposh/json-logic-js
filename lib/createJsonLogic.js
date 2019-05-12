import isArray from './helpers/isArray';
import is_logic from './helpers/is_logic';
import get_operator from './helpers/get_operator';

function createJsonLogic(_operations) {
  var operations = {};

  if (_operations) {
    Object.keys(_operations).forEach(function (name) {
      var operation = _operations[name];
      add_operation(operation.op || name, operation);
    });
  }

  function add_operation(name, op) {
    if (isArray(name)) {
      name.forEach(function (key) {
        return add_operation(key, op);
      });
      return;
    }

    operations[name] = op;
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
    if (data === void 0) {
      data = {};
    }

    // Does this array contain logic? Only one way to find out.
    if (isArray(logic)) {
      return logic.map(function (l) {
        return apply(l, data);
      });
    } // You've recursed to a primitive, stop!


    if (!is_logic(logic)) {
      return logic;
    }

    var op = get_operator(logic);
    var values = logic[op];
    var i; // easy syntax for unary operators, like {"var" : "x"} instead of strict {"var" : ["x"]}

    if (!isArray(values)) {
      values = [values];
    }

    var operator = operations[op];

    if (typeof operator === 'function') {
      var _operator$deepFirst = operator.deepFirst,
          deepFirst = _operator$deepFirst === void 0 ? true : _operator$deepFirst; // apply matching visitors first

      if (!deepFirst) {
        return operator(apply, data, values);
      }
    } // Everyone else gets immediate depth-first recursion


    values = values.map(function (val) {
      return apply(val, data);
    }); // The operation is called with "data" bound to its "this" and "values" passed as arguments.
    // Structured commands like % or > can name formal arguments while flexible commands (like missing or merge) can operate on the pseudo-array arguments
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments

    if (typeof operator === 'function') {
      return operator.apply(data, values);
    }

    if (op.indexOf('.') > 0) {
      // Contains a dot, and not in the 0th position
      var sub_ops = String(op).split('.');
      var operation = operations;

      for (i = 0; i < sub_ops.length; i++) {
        // Descending into operations
        operation = operation[sub_ops[i]];

        if (operation === undefined) {
          throw new Error("Unrecognized operation " + op + " (failed at " + sub_ops.slice(0, i + 1).join('.') + ")");
        }
      }

      return operation.apply(data, values);
    }

    throw new Error("Unrecognized operation " + op);
  }

  return {
    apply: apply,
    add_operation: add_operation,
    rm_operation: rm_operation
  };
}

export default createJsonLogic;