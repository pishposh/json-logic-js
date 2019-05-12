import isArray from './isArray';
import is_logic from './is_logic';
import get_operator_name from './get_operator_name';
import arrayUnique from './arrayUnique';

function uses_data(logic) {
  const collection = [];

  if (is_logic(logic)) {
    const op = get_operator_name(logic);
    let values = logic[op];

    if (!isArray(values)) {
      values = [values];
    }

    if (op === 'var') {
      // This doesn't cover the case where the arg to var is itself a rule.
      collection.push(values[0]);
    } else {
      // Recursion!
      values.forEach(val => {
        collection.push(...uses_data(val));
      });
    }
  }

  return arrayUnique(collection);
}

export default uses_data;
