import { Chart, Sensor } from '../decorators';
import { Measurement } from './measurement';
import { ColumnConfig, Scatter } from '@antv/g2plot';
import * as Json from '../common/json';


@Sensor.name('Humidity')
@Sensor.endpoint(
  'https://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_out')
@Sensor.name('Humidity')
@Chart.type(Scatter)
@Chart.configuration<ColumnConfig>({ color: 'blue' })
export class Humidity extends Measurement {
  constructor(humidity: number, time: Date) {
    super(time);

    this.humidity = humidity;
  }

  @Chart.field('y')
  @Chart.meta({ formatter: (value: number) => `${value} C` })
  @Json.property({ name: ['humidity_out', 'humidity_in'], type: 'number' })
  public readonly humidity: number;
}
