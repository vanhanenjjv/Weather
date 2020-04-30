import { Table, Chart, jsonProperty } from '../decorators';


export abstract class Measurement {
  constructor(time: Date) {
    this.time = time;
  }

  @Table.column({ title: 'Time' })
  @Chart.field('x')
  @jsonProperty('date_time')
  public readonly time: Date;
}
