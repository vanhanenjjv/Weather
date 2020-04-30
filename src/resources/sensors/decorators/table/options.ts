const key = 'table:options';

interface TableOptions {
  rowKey: string;
}

export function options(options: TableOptions) {
  return (target: object) => {
    Reflect.defineMetadata(
      key,
      options,
      target);
  };
}

export function getOptions(target: object, model: Function) {
  if (!target)
    return;

  const options = Reflect.getMetadata(key, model);

  return options;
}
