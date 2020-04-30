import 'reflect-metadata';


const key = 'json:property';

export function jsonProperty(name: string) {
  return (target: object, propertyName: string) => {
    Reflect.defineMetadata(key, name, target, propertyName);
  };
}

export function getJsonProperties(target: object): [string, string][] {
  const propertyNames = Object.getOwnPropertyNames(target);

  const mappings: [string, string][] = [];

  for (const propertyName of propertyNames) {
    const jsonProperty: string = Reflect.getMetadata(key, target, propertyName);

    if (jsonProperty)
      mappings.push([propertyName, jsonProperty]);
  }

  return mappings;
}


// export function getEndpoint(target: object) {
//   const endpoint: string = Reflect.getMetadata(key, target);

//   return endpoint;
// }
