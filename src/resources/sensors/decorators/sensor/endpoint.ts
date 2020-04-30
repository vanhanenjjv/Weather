import 'reflect-metadata';


const key = 'sensor:endpoint';

export function endpoint(url: string) {
  return (target: object) => {
    Reflect.defineMetadata(key, url, target);
  };
}

export function getEndpoint(target: object) {
  const endpoint: string = Reflect.getMetadata(key, target);

  return endpoint;
}
