import 'reflect-metadata';
import { Meta, ScatterConfig } from '@antv/g2plot';
import { LooseMap } from '@antv/g2plot/lib/interface/types';


export const key = 'chart:meta';


export function meta(meta: Meta) {
  return (target: object, propertyName: string) => {
    Reflect.defineMetadata(
      key,
      meta,
      target,
      propertyName);
  };
}

export function getMetas(target: object, model: Function): LooseMap<Meta> {
  const metas: LooseMap<Meta> = {};

  const propertyNames = Object.getOwnPropertyNames(target);

  for (const propertyName of propertyNames) {
    const meta: Meta =
      Reflect.getMetadata(key, target, propertyName);

    if (meta)
      // gonna explooode
      metas[propertyName] = meta;
  }

  return metas;
}
