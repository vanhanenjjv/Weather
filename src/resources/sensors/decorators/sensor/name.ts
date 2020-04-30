const key = 'sensor:name';

export function name(value: string) {
  return (target: object) => {
    Reflect.defineMetadata(key, value, target);
  };
}

export function getName(target: object) {
  const value: string = Reflect.getMetadata(key, target);

  return value;
}

