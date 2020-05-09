import { Sensor, Chart, jsonProperty } from '../decorators';
import { Bar, Column, ColumnConfig } from '@antv/g2plot';
import { Measurement } from './measurement';
import { Moment } from 'moment';


@Sensor.name('Light')
@Chart.type(Column)
@Chart.configuration<ColumnConfig>({ })
@Sensor.endpoint('https://webapi19sa-1.course.tamk.cloud/v1/weather/light')
export class Light extends Measurement {
  constructor(light: number, time: Moment) {
    super(time);

    this.light = light;
  }

  @Chart.field('y')
  @jsonProperty('light')
  public readonly light: number;
}

