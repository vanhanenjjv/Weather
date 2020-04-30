import React from 'react';
import { Table } from 'antd';
import { Table as DTable, Chart, Sensor } from '../../resources/sensors/decorators';
import { Scatter, Line, LineConfig } from '@antv/g2plot';


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
      const b = Chart.getType(measurements[0]);
      const a = Chart.getField(measurements[0], 'x');
      console.log(a);

      const scatterPlot = new Line(reference.current, {
        ...b,
        data: measurements,
        xField: a,
        yField: Chart.getField(measurements[0], 'y')
      });

      scatterPlot.render();
    }
  }, [measurements, reference]);

  return <div ref={reference} />;
};
