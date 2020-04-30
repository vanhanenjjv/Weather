import 'reflect-metadata';


export const key = 'chart:field';

export type Field = 'x' | 'y';

export function field(field: Field) {
  return (target: object, propertyName: string) => {
    Reflect.defineMetadata(
      key,
      field,
      target,
      propertyName);
  };
}

export function getField(target: object, field: Field): string | undefined {
  const propertyNames = Object.getOwnPropertyNames(target);

  for (const propertyName of propertyNames) {
    const f = Reflect.getMetadata(key, target, propertyName);

    if (f && f === field)
      return propertyName;
  }
}

export default {
  xField: () => field('x'),
  yField: () => field('y'),
  getField
};
