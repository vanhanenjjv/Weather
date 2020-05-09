import BasePlot, { PlotConfig } from '@antv/g2plot/lib/base/plot';
import { ScatterConfig } from '@antv/g2plot';


const key = 'chart:configuration';


// interface Configuration<T extends BasePlot> {
//   plot: T,
// };

export function configuration<T extends PlotConfig>(/* not guud */ config: T) {
  return (target: object) => {
    Reflect.defineMetadata(key, config, target);
  };
}

export function getConfiguration(object: Function): any {
  const config = Reflect.getMetadata(key, object);

  return config;
}
