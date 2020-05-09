import { Chart, Sensor, jsonProperty } from '../decorators';
import { Measurement } from './measurement';
import { Bar, BarConfig, Column, ColumnConfig, Scatter } from '@antv/g2plot';
import { Moment } from 'moment';


const meme: BarConfig = {
  meta: {
    foo: {

    }
  }
};

@Sensor.name('Humidity')
@Sensor.endpoint(
  'https://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_out')
@Sensor.name('Humidity')
@Chart.type(Scatter)
@Chart.configuration<ColumnConfig>({ color: 'blue' })
export class Humidity extends Measurement {
  constructor(humidity: number, time: Moment) {
    super(time);

    this.humidity = humidity;
  }

  @Chart.field('y')
  @Chart.meta({ formatter: (value: number) => `${value} C` })
  @jsonProperty('humidity_out')
  public readonly humidity: number;
}
