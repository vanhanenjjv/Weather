import Axios from 'axios';
// import { createResource } from '../common';
import { baseUrl, sensors } from '../../content/sensors/configuration.json';
import { Light, Temperature } from './models';
import * as Sensora from './decorators';
import { Sensor as Sensei, getJsonProperties } from './decorators';
import { getColumns } from './decorators/table/column';
import Activator from './common/activator';
import * as Json from './common/json';


// export interface SensorsConfiguration {
//   baseUrl: string;
//   sensors: SensorOptions[];
// }

// export interface SensorOptions {
//   name: string;
//   model: string;
//   route: string;
// }

// export interface SensorDataOptions {
//   label: string;
//   model: string;
//   url: string;
//   converters: string[];
// }


interface SensorConfiguration {
  model: Function;
  url: string;
}


export type SensorName =
  'temperature' |
  'pressure_in' |
  'pressure_out';


export interface Sensor<T extends Function> {
  name: string;
  model: T;
  get: (amount: number) => Promise<any[]>;
}

export default () => {
  const models = require('./models');

  const sensors: Sensor<Function>[] = Object.values(models)
    .filter(isFunction)
    .map(build);

  return sensors;
};

function isFunction<T>(object: T): boolean {
  return typeof object === 'function';
}

function build<T extends Function>(object: any): Sensor<T> {
  const model = object as T;

  const name = Sensei.getName(object);
  const endpoint = Sensei.getEndpoint(object);

  const sensor: Sensor<typeof model> = {
    name: name,
    model: model,
    get: async (amount: number) => {
      const response = await Axios.get<typeof model[]>(Url.build(endpoint));

      const result = mapJson<typeof model>(response.data, model);

      console.group('Measurements');
      console.table(result);
      console.groupEnd();

      return result;
    }
  };

  return sensor;
}

function mapJson<T extends Function>(input: any[], model: T): any[] {
  if (input.length === 0)
    return [];



  const result = input.map(i => {
    const m = Activator.createInstance(model);

    Json.fill(i, m);

    return m;
  });

  return result;
}



class Url {
  static build(...path: (object | string | number)[]): string {
    let url = '';

    for (const route of path)
      url += format(route.toString());

    return url;

    function format(route: string) {
      return route.endsWith('/') ?
        route :
        route + '/';
    }
  }
};



function ensureArray<T>(itemOrItems: T | T[]) {
  return Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];
}
