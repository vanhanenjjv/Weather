import 'reflect-metadata';
import { ColumnType, ColumnsType } from 'antd/lib/table';


export const key = 'table:column';

interface ColumnOptions {
  title?: string;
}

export function column(options: ColumnOptions) {
  return (target: object, propertyName: string) => {

    const column = {
      title: options.title ?? propertyName,
      dataIndex: propertyName,
      key: propertyName
    };

    console.log(column);

    Reflect.defineMetadata(
      key,
      column,
      target,
      propertyName);
  };
}

export function getColumns(target: any, model: Function) {
  if (!target)
    return;

  const columns: ColumnsType<any> = [];

  const propertyNames = Object.getOwnPropertyNames(target);

  for (const propertyName of propertyNames) {
    const column: ColumnType<any> =
      Reflect.getMetadata(key, target, propertyName);

    if (column)
      columns.push(column);
  }

  return columns;
}
