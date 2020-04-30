import BasePlot, { PlotConfig } from '@antv/g2plot/lib/base/plot';
import { Bar } from '@antv/g2plot';


const key = 'chart:configuration';


interface Configuration<T extends BasePlot, E extends PlotConfig> {
  plot: T,
  config: E
};

export function type<Configuration>(config: C, plot: T) {

  const configuration = {
    plot: plot,
    config: config
  };

  return (target: object) => {
    Reflect.defineMetadata(key, configuration, target);
  };
}

export function getType(object: Function): PlotConfig {
  const configuration = Reflect.getMetadata(key, object);

  return configuration;
}
