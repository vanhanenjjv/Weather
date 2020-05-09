import { Table, Chart, jsonProperty } from '../decorators';
import moment, { Moment } from 'moment';


export abstract class Measurement {
  constructor(time: Moment) {
    this.time = time;
  }

  @Table.column({ title: 'Time' })
  @Chart.field('x')
  @Chart.meta({ formatter: (time: number) => {
    return moment(time).format('LLL');
  } })
  @jsonProperty('date_time')
  public readonly time: Moment;
}
