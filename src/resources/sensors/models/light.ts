import { Sensor } from '../decorators';


@Sensor.name('Light')
@Sensor.endpoint('https://webapi19sa-1.course.tamk.cloud/v1/weather/light')
export class Light {

}

