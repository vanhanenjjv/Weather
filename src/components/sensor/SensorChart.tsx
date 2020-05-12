import React from 'react';
import { Chart } from '../../resources/sensors/decorators';
import moment from 'moment';


interface SensorChartProps<T extends Function> {
  measurements: any[];
  model: T;
}

export function SensorChart<
T extends Function
>({ measurements, model }: SensorChartProps<T>) {
  const [reference] = React.useState(React.createRef<HTMLDivElement>());

  React.useEffect(() => {
    if (reference.current) {
      const Plot = Chart.getType(model);

      const x = Chart.getField(measurements[0], 'x');
      const y = Chart.getField(measurements[0], 'y');

      const config = Chart.getConfiguration(model);

      console.log(typeof measurements[0].time);

      const metas = Chart.getMetas(measurements[0], model);

      const plot = new Plot(reference.current, {
        data: measurements,
        ...config,
        xField: x,
        yField: y,
        meta: metas,
        xAxis: {
          label: {
            formatter: (date: string) => {
              return moment(date, 'LLL').format('L');
            }
          }
        }
      });

      plot.render();
    }
  }, [measurements, model, reference]);

  return <div ref={reference} />;
};
