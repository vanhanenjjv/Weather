import BasePlot, { PlotConfig } from '@antv/g2plot/lib/base/plot';
import { Bar } from '@antv/g2plot';


const key = 'chart:type';


// interface Configuration<T extends BasePlot> {
//   plot: T,
// };

export function type(/* not guud */ plot: any) {
  return (target: object) => {
    Reflect.defineMetadata(key, plot, target);
  };
}

export function getType(object: Function): any {
  const plot = Reflect.getMetadata(key, object);

  return plot;
}
