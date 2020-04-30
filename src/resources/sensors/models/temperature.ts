import { Table, Chart, jsonProperty, Sensor } from '../decorators';
import { Measurement } from './measurement';


@Sensor.name('Temperature')
@Sensor.endpoint(
  'https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature')
@Table.options({ rowKey: 'date_time' })

export class Temperature extends Measurement {
  constructor(temperature: number, time: Date) {
    super(time);
    this.temperature = temperature;
  }

  @Chart.field('y')
  @jsonProperty('temperature')
  public readonly temperature: number;
}
