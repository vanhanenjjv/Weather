import 'reflect-metadata';


export type PropertyType = 'date' | 'string' | 'number';

export interface PropertyOptions {
  name?: string | string[];
  type: PropertyType;
}

interface PropertyMetadata {
  // First one is the target and the second is the source
  name: [string, string[]];
  type: PropertyType;
}

const key = 'json:property';

export function property(options: PropertyOptions) {
  return (target: any, propertyName: string) => {
    const metadata: PropertyMetadata = {
      name: [
        propertyName,
        options.name ?
          (typeof(options.name) === 'string' ?
            [options.name] :
            options.name)
          : [propertyName]],
      type: options.type
    };

    Reflect.defineMetadata(key, metadata, target, propertyName);
  };
}

export function fill<T extends Function>(source: any, target: any): T {
  const jsonProperties = getJsonProperties(target);

  for (const jsonProperty of jsonProperties) {
    const { name, type } = jsonProperty;

    const val = parseType(findProperty(name[1], source), type);

    target[name[0]] = val;
  }

  return target;

  function findProperty(possibleNames: string[], source: any): string {
    const name = source[possibleNames.filter(name => source[name])[0]];

    return name;
  }

  function getJsonProperties<T extends Function>(target: T)
  : PropertyMetadata[] {
    const jsonProperties: PropertyMetadata[] = [];

    const propertyNames = Object.getOwnPropertyNames(target);

    for (const propertyName of propertyNames) {
      const metadata = Reflect.getMetadata(key, target, propertyName);

      if (metadata)
        jsonProperties.push(metadata);
    }

    return jsonProperties;
  }

  function parseType(value: any, type: PropertyType) {
    switch (type) {
    case 'date': {
      return new Date(value);
    }
    case 'number': {
      return Number(value);
    }
    default:
      return value;
    }
  }
}

