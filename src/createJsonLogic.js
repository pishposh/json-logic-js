import isArray from './helpers/isArray';
import createJsonLogicApply from './createJsonLogicApply';

function createJsonLogic(_operations, isRawOps) {
  const operations = {};

  if (_operations) {
    Object.keys(_operations).forEach(name => {
      const operation = _operations[name];

      add_operation(operation.op || name, operation, isRawOps);
    });
  }

  function add_operation(name, op, raw) {
    if (isArray(name)) {
      name.forEach(key => add_operation(key, op));
      return;
    }

    if (typeof op === 'function') {
      // handle `deepFirst`, `withApply`, `op` properties for compatibility
      // with @axa-ch/json-logic-js:

      if (raw || op.deepFirst === false) {
        operations[name] = op;
      } else if (op.withApply) {
        operations[name] = (apply, data, raw_args) => {
          const args = apply(raw_args, data);
          return op(apply, ...args);
        };
      } else {
        operations[name] = (apply, data, raw_args) => {
          const args = apply(raw_args, data);
          return op(...args);
        };
      }
    } else if (typeof op === 'object') {
      Object.getOwnPropertyNames(op).forEach(prop_name => {
        add_operation(`${name}.${prop_name}`, op[prop_name]);
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

  return {
    apply: createJsonLogicApply(operations),
    add_operation,
    rm_operation,
  };
}

export default createJsonLogic;
