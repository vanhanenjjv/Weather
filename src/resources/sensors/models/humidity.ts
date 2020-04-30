import { Chart, Sensor } from '../decorators';
import { Measurement } from './measurement';
import { jsonProperty } from '../decorators';
import { Bar, BarConfig } from '@antv/g2plot';


@Sensor.name('Humidity')
@Sensor.endpoint(
  'https://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_out')
@Sensor.name('Humidity')
@Chart.type<Bar, BarConfig>({ })
export class Humidity extends Measurement {
  constructor(humidity: number, time: Date) {
    super(time);

    this.humidity = humidity;
  }

  @Chart.field('y')
  @jsonProperty('humidity_out')
  public readonly humidity: number;
}
