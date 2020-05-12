import { Table, Chart } from '../decorators';
import moment from 'moment';
import * as Json from '../common/json';


export abstract class Measurement {
  constructor(time: Date) {
    this.time = time;
  }

  @Table.column({ title: 'Time' })
  @Chart.field('x')
  @Chart.meta({ formatter: (value: Date) => moment(value).format('LLL') })
  @Json.property({ name: 'date_time', type: 'date' })
  public readonly time: Date;
}
