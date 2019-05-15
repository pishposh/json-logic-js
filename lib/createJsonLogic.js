import isArray from './helpers/isArray';
import createJsonLogicApply from './createJsonLogicApply';

function createJsonLogic(_operations, raw) {
  var operations = {};

  if (_operations) {
    Object.keys(_operations).forEach(function (name) {
      var operation = _operations[name];
      add_operation(operation.op || name, operation, raw);
    });
  }

  function add_operation(name, op, raw) {
    if (isArray(name)) {
      name.forEach(function (key) {
        return add_operation(key, op);
      });
      return;
    }

    if (typeof op === 'function') {
      // handle `deepFirst`, `withApply`, `op` properties for compatibility
      // with @axa-ch/json-logic-js:
      if (raw || op.deepFirst === false) {
        operations[name] = op;
      } else if (op.withApply) {
        operations[name] = function (apply, data, raw_args) {
          var args = apply(raw_args, data);
          return op.apply(void 0, [apply].concat(args));
        };
      } else {
        operations[name] = function (apply, data, raw_args) {
          var args = apply(raw_args, data);
          return op.apply(void 0, args);
        };
      }
    } else if (typeof op === 'object') {
      Object.getOwnPropertyNames(op).forEach(function (prop_name) {
        add_operation(name + "." + prop_name, op[prop_name]);
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

  return {
    apply: createJsonLogicApply(operations),
    add_operation: add_operation,
    rm_operation: rm_operation
  };
}

export default createJsonLogic;