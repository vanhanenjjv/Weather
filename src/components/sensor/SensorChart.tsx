import React from 'react';
import { Table } from 'antd';
import { Table as DTable, Chart, Sensor } from '../../resources/sensors/decorators';
import { Scatter, Line, LineConfig } from '@antv/g2plot';
import moment from 'moment';


interface SensorChartProps<T extends Function> {
  measurements: any[];
  model: T;
}

export function SensorChart<
T extends Function
>({ measurements, model }: SensorChartProps<T>) {
  const [reference, _] = React.useState(React.createRef<HTMLDivElement>());

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
            // formatter: (v: any) => {


            //   // Ooooh no no no no no
            //   return moment(Number.parseFloat(v)).format('LLL');
            // }
          }
        }
      });

      plot.render();
    }
  }, [measurements, model, reference]);

  return <div ref={reference} />;
};
