import get_operator_name from './get_operator_name';

function get_values(logic) {
  return logic[get_operator_name(logic)];
}

export default get_values;
