import React from 'react';
import { Table } from 'antd';
import { Table as DTable } from '../../resources/sensors/decorators';


interface SensorTableProps<T extends Function> {
  measurements: any[];
  model: T;
}

export function SensorTable<
T extends Function
>({ measurements, model }: SensorTableProps<T>) {

  const columns = DTable.getColumns(measurements[0], model);
  const options = DTable.getOptions(measurements[0], model);

  console.log(options);

  console.log('columns', columns);
  console.log('measurmenentsd', measurements);

  return (
    <Table columns={columns} dataSource={measurements}
      rowKey={r => r[options.rowKey]} />
  );
};
