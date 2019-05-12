(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.jsonLogic = factory());
}(this, function () { 'use strict';

  var isArray = Array.isArray;

  function is_logic(logic) {
    return typeof logic === 'object' && // An object
    logic !== null && // but not null
    !isArray(logic) && // and not an array
    Object.keys(logic).length === 1 // with exactly one key
    ;
  }

  function get_operator_name(logic) {
    return Object.keys(logic)[0];
  }

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

  /*
    This helper will defer to the JsonLogic spec as a tie-breaker when different language interpreters define different behavior for the truthiness of primitives.  E.g., PHP considers empty arrays to be falsy, but Javascript considers them to be truthy. JsonLogic, as an ecosystem, needs one consistent answer.

    Spec and rationale here: http://jsonlogic.com/truthy
    */

  function truthy(value) {
    if (isArray(value) && value.length === 0) {
      return false;
    }

    return !!value;
  }

  function get_values(logic) {
    return logic[get_operator_name(logic)];
  }

  /**
   * Return an array that contains no duplicates (original not modified)
   * @param  {array} array   Original reference array
   * @return {array}         New array with no duplicates
   */
  function arrayUnique(array) {
    var a = [];

    for (var i = 0, l = array.length; i < l; i++) {
      if (a.indexOf(array[i]) === -1) {
        a.push(array[i]);
      }
    }

    return a;
  }

  function uses_data(logic) {
    var collection = [];

    if (is_logic(logic)) {
      var op = get_operator_name(logic);
      var values = logic[op];

      if (!isArray(values)) {
        values = [values];
      }

      if (op === 'var') {
        // This doesn't cover the case where the arg to var is itself a rule.
        collection.push(values[0]);
      } else {
        // Recursion!
        values.forEach(function (val) {
          collection.push.apply(collection, uses_data(val));
        });
      }
    }

    return arrayUnique(collection);
  }

  function rule_like(rule, pattern) {
    // console.log("Is ". JSON.stringify(rule) . " like " . JSON.stringify(pattern) . "?");
    if (pattern === rule) {
      return true;
    } // TODO : Deep object equivalency?


    if (pattern === '@') {
      return true;
    } // Wildcard!


    if (pattern === 'number') {
      return typeof rule === 'number';
    }

    if (pattern === 'string') {
      return typeof rule === 'string';
    }

    if (pattern === 'array') {
      // !logic test might be superfluous in JavaScript
      return isArray(rule) && !is_logic(rule);
    }

    if (is_logic(pattern)) {
      if (is_logic(rule)) {
        var pattern_op = get_operator_name(pattern);
        var rule_op = get_operator_name(rule);

        if (pattern_op === '@' || pattern_op === rule_op) {
          // echo "\nOperators match, go deeper\n";
          return rule_like(get_values(rule, false), get_values(pattern, false));
        }
      }

      return false; // pattern is logic, rule isn't, can't be eq
    }

    if (isArray(pattern)) {
      if (isArray(rule)) {
        if (pattern.length !== rule.length) {
          return false;
        }
        /*
          Note, array order MATTERS, because we're using this array test logic to consider arguments, where order can matter. (e.g., + is commutative, but '-' or 'if' or 'var' are NOT)
        */


        for (var i = 0; i < pattern.length; i += 1) {
          // If any fail, we fail
          if (!rule_like(rule[i], pattern[i])) {
            return false;
          }
        }

        return true; // If they *all* passed, we pass
      }

      return false; // Pattern is array, rule isn't
    } // Not logic, not array, not a === match for rule.


    return false;
  }

  // export default function add(...args) {
  var op_add = (function (apply, data, raw_args) {
    var args = apply(raw_args, data);
    return args.reduce(function (a, b) {
      return parseFloat(a) + parseFloat(b);
    }, 0);
  });

  var op_all = (function (apply, data, raw_args) {
    var scopedData = apply(raw_args[0], data);
    var scopedLogic = raw_args[1]; // All of an empty set is false. Note, some and none have correct fallback after the for loop

    if (!scopedData.length) {
      return false;
    }

    for (var i = 0; i < scopedData.length; i += 1) {
      if (!truthy(apply(scopedLogic, scopedData[i]))) {
        return false; // First falsy, short circuit
      }
    }

    return true; // All were truthy
  });

  var op_and = (function (apply, data, raw_args) {
    var arg;

    for (var _iterator = raw_args, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var raw_arg = _ref;
      arg = apply(raw_arg, data);

      if (!truthy(arg)) {
        return arg;
      }
    }

    return arg; // Last
  });

  var op_cat = (function (apply, data, raw_args) {
    var args = apply(raw_args, data);
    return args.join('');
  });

  var op_divide = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0],
        b = _apply[1];

    return a / b;
  });

  var op_equal = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0],
        b = _apply[1]; // eslint-disable-next-line eqeqeq


    return a == b;
  });

  var op_filter = (function (apply, data, raw_args) {
    var scopedData = apply(raw_args[0], data);
    var scopedLogic = raw_args[1];

    if (!isArray(scopedData)) {
      return [];
    } // Return only the elements from the array in the first argument,
    // that return truthy when passed to the logic in the second argument.
    // For parity with JavaScript, reindex the returned array


    return scopedData.filter(function (datum) {
      return truthy(apply(scopedLogic, datum));
    });
  });

  var op_greater = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0],
        b = _apply[1];

    return a > b;
  });

  var op_greaterEqual = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0],
        b = _apply[1];

    return a >= b;
  });

  var op_if = (function (apply, data, raw_args) {
    var i;
    /* 'if' should be called with a odd number of parameters, 3 or greater
      This works on the pattern:
      if( 0 ){ 1 }else{ 2 };
      if( 0 ){ 1 }else if( 2 ){ 3 }else{ 4 };
      if( 0 ){ 1 }else if( 2 ){ 3 }else if( 4 ){ 5 }else{ 6 };
       The implementation is:
      For pairs of values (0,1 then 2,3 then 4,5 etc)
      If the first evaluates truthy, evaluate and return the second
      If the first evaluates falsy, jump to the next pair (e.g, 0,1 to 2,3)
      given one parameter, evaluate and return it. (it's an Else and all the If/ElseIf were false)
      given 0 parameters, return NULL (not great practice, but there was no Else)
      */

    for (i = 0; i < raw_args.length - 1; i += 2) {
      if (truthy(apply(raw_args[i], data))) {
        return apply(raw_args[i + 1], data);
      }
    }

    if (raw_args.length === i + 1) {
      return apply(raw_args[i], data);
    }

    return null;
  });

  var op_in = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0],
        b = _apply[1];

    if (!b || typeof b.indexOf === 'undefined') return false;
    return b.indexOf(a) !== -1;
  });

  var op_less = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0],
        b = _apply[1],
        c = _apply[2];

    return c === undefined ? a < b : a < b && b < c;
  });

  var op_lessEqual = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0],
        b = _apply[1],
        c = _apply[2];

    return c === undefined ? a <= b : a <= b && b <= c;
  });

  var op_log = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0]; // eslint-disable-next-line no-console


    console.log(a);
    return a;
  });

  var op_map = (function (apply, data, raw_args) {
    var scopedData = apply(raw_args[0], data);
    var scopedLogic = raw_args[1];

    if (!isArray(scopedData)) {
      return [];
    }

    return scopedData.map(function (datum) {
      return apply(scopedLogic, datum);
    });
  });

  var op_max = (function (apply, data, raw_args) {
    var args = apply(raw_args, data);
    return Math.max.apply(Math, args);
  });

  var op_merge = (function (apply, data, raw_args) {
    var args = apply(raw_args, data);
    return args.reduce(function (a, b) {
      return a.concat(b);
    }, []);
  });

  var op_method = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        obj = _apply[0],
        methodName = _apply[1],
        args = _apply[2]; // eslint-disable-next-line prefer-spread


    return obj[methodName].apply(obj, args);
  });

  var op_min = (function (apply, data, raw_args) {
    var args = apply(raw_args, data);
    return Math.min.apply(Math, args);
  });

  var op_var = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        var_name = _apply[0],
        default_value = _apply[1];

    if (var_name == null || var_name === '') {
      // TODO: shorten to var_name == null?
      return data;
    }

    for (var _iterator = String(var_name).split('.'), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var sub_var_name = _ref;
      data = data[sub_var_name];
      if (!data) break;
    }

    return data != null ? data : default_value != null ? default_value : null;
  });

  var op_missing = (function (apply, data, raw_args) {
    var args = apply(raw_args, data);
    /*
    Missing can receive many keys as many arguments, like {"missing:[1,2]}
    Missing can also receive *one* argument that is an array of keys,
    which typically happens if it's actually acting on the output of another command
    (like 'if' or 'merge')
    */

    var are_missing = [];
    var keys = isArray(args[0]) ? args[0] : args;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = op_var(apply, data, [key]);

      if (value === null || value === '') {
        are_missing.push(key);
      }
    }

    return are_missing;
  });

  var op_missing_some = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        need_count = _apply[0],
        options = _apply[1]; // missing_some takes two arguments, how many (minimum) items must be present, and an array of keys (just like 'missing') to check for presence.


    var are_missing = op_missing(apply, data, [options]);

    if (options.length - are_missing.length >= need_count) {
      return [];
    }

    return are_missing;
  });

  var op_modulo = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0],
        b = _apply[1];

    return a % b;
  });

  var op_multiply = (function (apply, data, raw_args) {
    var args = apply(raw_args, data);
    return args.reduce(function (a, b) {
      return parseFloat(a) * parseFloat(b);
    }, 1);
  });

  var op_none = (function (apply, data, raw_args) {
    var filtered = apply({
      filter: raw_args
    }, data);
    return filtered.length === 0;
  });

  var op_not = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0];

    return !truthy(a);
  });

  var op_notEqual = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0],
        b = _apply[1]; // eslint-disable-next-line eqeqeq


    return a != b;
  });

  var op_notnot = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0];

    return truthy(a);
  });

  var op_or = (function (apply, data, raw_args) {
    var current;

    for (var i = 0; i < raw_args.length; i++) {
      current = apply(raw_args[i], data);

      if (truthy(current)) {
        return current;
      }
    }

    return current; // Last
  });

  var op_reduce = (function (apply, data, raw_args) {
    var scopedData = apply(raw_args[0], data);
    var scopedLogic = raw_args[1];
    var initial = typeof raw_args[2] !== 'undefined' ? raw_args[2] : null;

    if (!isArray(scopedData)) {
      return initial;
    }

    return scopedData.reduce(function (accumulator, current) {
      return apply(scopedLogic, {
        current: current,
        accumulator: accumulator
      });
    }, initial);
  });

  var op_some = (function (apply, data, raw_args) {
    var filtered = apply({
      filter: raw_args
    }, data);
    return filtered.length > 0;
  });

  var op_strictEqual = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0],
        b = _apply[1];

    return a === b;
  });

  var op_strictNotEqual = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0],
        b = _apply[1];

    return a !== b;
  });

  var op_substr = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        source = _apply[0],
        start = _apply[1],
        end = _apply[2];

    if (end < 0) {
      // JavaScript doesn't support negative end, this emulates PHP behavior
      var temp = String(source).substr(start);
      return temp.substr(0, temp.length + end);
    }

    return String(source).substr(start, end);
  });

  var op_subtract = (function (apply, data, raw_args) {
    var _apply = apply(raw_args, data),
        a = _apply[0],
        b = _apply[1];

    if (b === undefined) {
      return -a;
    }

    return a - b;
  });

  var jsonLogic = createJsonLogic({
    /* eslint-disable */
    '+': op_add,
    'all': op_all,
    'and': op_and,
    'cat': op_cat,
    '/': op_divide,
    '==': op_equal,
    'filter': op_filter,
    '>': op_greater,
    '>=': op_greaterEqual,
    '?:': op_if,
    'if': op_if,
    'in': op_in,
    '<': op_less,
    '<=': op_lessEqual,
    'log': op_log,
    'map': op_map,
    'max': op_max,
    'merge': op_merge,
    'method': op_method,
    'min': op_min,
    'missing': op_missing,
    'missing_some': op_missing_some,
    '%': op_modulo,
    '*': op_multiply,
    'none': op_none,
    '!': op_not,
    '!=': op_notEqual,
    '!!': op_notnot,
    'or': op_or,
    'reduce': op_reduce,
    'some': op_some,
    '===': op_strictEqual,
    '!==': op_strictNotEqual,
    'substr': op_substr,
    '-': op_subtract,
    'var': op_var
    /* eslint-enable */

  }); // restore original public API

  jsonLogic.is_logic = is_logic;
  jsonLogic.truthy = truthy;
  jsonLogic.get_operator = get_operator_name;
  jsonLogic.get_values = get_values;
  jsonLogic.uses_data = uses_data;
  jsonLogic.rule_like = rule_like;

  return jsonLogic;

}));
//# sourceMappingURL=jsonLogic.js.map
