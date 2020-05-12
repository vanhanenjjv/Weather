import { Sensor, Chart } from '../decorators';
import { Line, LineConfig } from '@antv/g2plot';
import { Measurement } from './measurement';
import * as Json from '../common/json';


@Sensor.name('Light')
@Chart.type(Line)
@Chart.configuration<LineConfig>({  })
@Sensor.endpoint('https://webapi19sa-1.course.tamk.cloud/v1/weather/light')
export class Light extends Measurement {
  constructor(light: number, time: Date) {
    super(time);

    this.light = light;
  }

  @Chart.field('y')
  @Json.property({ name: 'light', type: 'number' })
  public readonly light: number;
}

