export default (apply, data, raw_args) => {
  const [var_name, default_value] = apply(raw_args, data);

  if (var_name == null || var_name === '') {
    // TODO: shorten to var_name == null?
    return data;
  }

  for (const sub_var_name of String(var_name).split('.')) {
    data = data[sub_var_name];
    if (!data) break;
  }

  return data != null ? data : default_value != null ? default_value : null;
}
