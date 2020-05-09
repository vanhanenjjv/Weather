import React from 'react';
import Axios from 'axios';
// import { createResource } from '../common';
import { baseUrl, sensors } from '../../content/sensors/configuration.json';
import { Light, Temperature } from './models';
import * as Sensora from './decorators';
import { Sensor as Sensei, getJsonProperties } from './decorators';
import { getColumns } from './decorators/table/column';
import moment from 'moment';


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

function createInstance<T extends Function>(type: T): T {
  // Bad bad bad
  return new (type as any)();
}

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
      const response = await Axios.get(Url.build(endpoint));

      console.log(response);

      const result = mapJson<typeof model>(response.data, model);

      return result;
    }
  };

  return sensor;
}

function mapJson<T extends Function>(input: any[], model: T): T[] {
  if (input.length === 0)
    return [];

  const mappings = getJsonProperties(createInstance(model));

  const result = input.map(i => {
    const m: any = {};

    for (const mapping of mappings) {
      const [modelProp, jsonProp] = mapping;

      // uuuuuuufff
      if (jsonProp === 'date_time') {
        const d = moment(i[jsonProp]);
        m[modelProp] = d;
      } else
        m[modelProp] = Number.parseFloat(i[jsonProp]);
    }

    const a = createInstance(model);
    Object.assign(a, m);

    return a;
  });

  return result;

  // console.log(object);
  // const meme = Object.create(model);
  // console.log(meme);
  // const props = Object.getOwnPropertyNames(createInstance(model));
  // console.log(Reflect.getMetadataKeys(meme, propertyName));
}

// function buildSensors(models: object): Sensor<any>[] {
//   const sensors: Sensor<any>[] = [];

//   for (const model of Object.values(models)) {
//     if (typeof model !== 'function') {
//       console.warn(`${model} is not a function.`);
//       continue;
//     }

//     const sensor = build(model);

//     sensors.push(sensor);
//   }

//   return sensors;


// function build<T extends Function>(model: T): (amount: number) => Sensor<T> {
//   const endpoint = Sensora.getEndpoint(model);
//   const name = Sensora.getName(model);

//   return <T extends Function>(amount: number): Sensor<T> => {
//     const [sensor, setSensor] = React.useState<Sensor<T>>({
//       name: name,
//       measurements: [],

//     });

//     Axios.get<T[]>(Url.build(endpoint, amount))
//       .then(response => {
//         if (response.status !== 200)
//           return;

//         setSensor({
//           ...sensor,
//           measurements: response.data
//         });

//         console.log(sensor);
//       });

//     return sensor;
//   };
// }

// return {
//   name: name,
//   model: model,
//   measurements: {
//     get: function (amount: number) {
//       const fetch = async function () {
//         const response = await Axios.get<T>(Url.build(endpoint, amount));

//         return response.data;
//       }();

//       suspender = Promise.resolve(fetch).then(
//         r => {
//           status = 'success';
//           result = r;
//         },
//         e => {
//           status = 'error';
//           result = e;
//         }
//       );
//     },
//     read: function () {
//       if (status === 'pending') {
//         throw suspender;
//       } else if (status === 'error') {
//         throw result;
//       } else if (status === 'success') {
//         return result;
//       }
//     }
//   }
// };

// (async ({ model, url }: SensorConfiguration) => {
//   const measurements = await fetchMeasurements<typeof model[]>(url);



// })(getConfiguration(name))
// );

// async function fetchMeasurements<T>(url: string): Promise<T> {
//   const response = await Axios.get(url);

//   return response.data;
// }

// function getConfiguration(name: SensorName): { model: Function, url: string } {
//   const config = configuration.sensors[name];

//   return {
//     model: importModel(config.model),
//     url: Url.build(configuration.baseUrl, config.route)
//   };

//   function importModel(name: string) {
//     return require(`../models/${name}`).default;
//   }
// }


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


// export default (options: SensorOptions) => createResource(
//   Promise.all(
//     ensureArray(options.dataOptions)
//       .map(async ({ model, url, converters }) => {
//         const { data } = await Axios.get<typeof model[]>(url);

//         for (const converter of converters) {
//           require('./' + converter).default(data);
//         }

//         return data;
//       })
//   )
// );O

function ensureArray<T>(itemOrItems: T | T[]) {
  return Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];
}

// type SensorDataOptionsWithResponse =
//   SensorDataOptions &
//   { response: AxiosResponse<any> };

// interface Sensor {
//   name: string;
// }

// class Url {
//   static build(...path: (object | string | number)[]): string {
//     let url = '';

//     for (const route of path)
//       url += format(route.toString());

//     return url;

//     function format(route: string) {
//       return route.endsWith('/') ?
//         route :
//         route + '/';
//     }
//   }
// };



// export function fetchData(baseUrl: string, sensor: Sensor, amount: number);

// export async function get(baseUrl: string, options: SensorOptions, amount: number = 10)
//   : Promise<Sensor[]> {
//   return (await Promise
//     .all(getResponses()))
//     .filter(failedResponses)
//     .map(toSensors);

//   function getResponses(): SensorDataOptionsWithResponse[] {
//     const dataOptions = Array.isArray(options.dataOptions) ?
//       options.dataOptions : [options.dataOptions];

//     const a = dataOptions.map(options => ({
//       ...options,
//       response: Axios.get(Url.build(baseUrl, options.url, amount))
//     }));
//   }

//   function failedResponses(
//     dataOptionsWithResponse: SensorDataOptionsWithResponse): boolean {
//     const { label, response } = dataOptionsWithResponse;

//     const success = response.status === 200;

//     if (!success)
//       console.error(`Failed to fetch ${label}.`);

//     return success;
//   }

//   function toSensors(response: AxiosResponse<any>): Sensor {
//     return {
//       name: response.data
//     };
//   }
// }


