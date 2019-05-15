export default (apply, data, raw_args) => {
  const [var_name, default_value] = apply(raw_args, data);

  if (var_name == null || var_name === '') {
    // TODO: shorten to var_name == null?
    return data;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const sub_var_name of String(var_name).split('.')) {
    data = data[sub_var_name]; // eslint-disable-line no-param-reassign
    if (!data) break;
  }

  if (data == null) data = default_value; // eslint-disable-line no-param-reassign

  return data != null ? data : null;
};
