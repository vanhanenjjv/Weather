import { Table, Chart, Sensor } from '../decorators';
import { Measurement } from './measurement';
import { Scatter, ScatterConfig } from '@antv/g2plot';
import * as Json from '../common/json';


@Sensor.name('Temperature')
@Sensor.endpoint(
  'https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature')
@Chart.type(Scatter)
@Chart.configuration<ScatterConfig>({
  color: 'red'
})
@Table.options({ rowKey: 'date_time' })

export class Temperature extends Measurement {
  constructor(temperature: number, time: Date) {
    super(time);
    this.temperature = temperature;
  }

  @Chart.field('y')
  @Chart.meta({ formatter: (value: number) => `${value.toFixed(2)} °C` })
  @Json.property({ name: 'temperature', type: 'number' })
  public readonly temperature: number;
}
