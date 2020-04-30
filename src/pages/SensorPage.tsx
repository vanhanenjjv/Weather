import * as React from 'react';
import resource, { Sensor } from '../resources';
import SensorList from '../components/sensor/SensorList';
import { Layout, message } from 'antd';
import { SensorTable } from '../components/sensor/SensorTable';
import Axios from 'axios';
import { Temperature } from '../resources/sensors/models';
import { SensorChart } from '../components/sensor/SensorChart';


const sensors = resource.sensors();

const SensorPage: React.FC = () => {
  const [sensor, setSensor] = React.useState(sensors[0]);
  const [measurements, setMeasurements] = React.useState<any[]>([]);

  // const sensor: Sensor<Temperature> = {
  //   name: 'Temperature',
  //   measurements: [
  //     new Temperature(10, 'foo', new Date(Date.now())),
  //     new Temperature(15, 'bar', new Date(Date.now() + 1000)),
  //     new Temperature(30, 'foobar', new Date(Date.now() + 40935))
  //   ],
  //   model: Temperature
  // };

  // React.useEffect(() => {
  //   sensor.get(24).then(setMeasurements);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  React.useEffect(() => {
    sensor.get(24).then(setMeasurements);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMeasurements]);

  function dontLookAtThis<T extends Function>(sensor: Sensor<T>) {
    setMeasurements([]);
    setSensor(sensor);
    sensor.get(10).then(setMeasurements);
  }

  return (
    <Layout>
      <Layout.Sider>
        <SensorList sensors={sensors} onSelect={dontLookAtThis} />
      </Layout.Sider>
      <Layout.Content>
        {measurements.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <SensorChart measurements={measurements} model={sensor.model} />
        )}
        {/* <SensorTable
          measurements={sensor.measurements}
          model={sensor.model} /> */}
      </Layout.Content>
    </Layout>


  );
};



// function withSuspense<(Component: React.FC): JSX.Element {
//   return (
//     <React.Suspense>
//       <Component />
//     </React.Suspense>
//   );
// }

export default SensorPage;


// import * as resource from '../resources/test';



// const sensors = resource.sensors();

// const user = resource.fetchProfileData(1);


// const A = () => {


//   console.log(meas);

//   return (
//     <p>{ meas[0].temperature }</p>
//   );
// };


// const Foo: React.FC = () => {
//   const [sensor, setSensor] = React.useState<Sensor<any>>(sensors[0]);

//   console.log(sensor);

//   // React.useEffect(() => {
//   //   sensor.measurements.read();
//   // // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);

//   React.useEffect(() => {
//     console.log('hehe');
//     sensor.measurements.get(10);
//   }, [sensor]);


//   const measurements = sensor.measurements.read();
//   console.log(measurements);


//   return (

//     <Layout>
//       <Layout.Sider width={300}>
//         <SensorList sensors={sensors} onSelect={setSensor} />
//       </Layout.Sider>
//       <Layout.Content>
//         <SensorTable measurements={sensor?.measurements.read()} />
//       </Layout.Content>

//     </Layout>
//   );
// };

// export default SensorPage;
