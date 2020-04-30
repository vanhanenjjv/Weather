import React from 'react';
import { Sensor } from '../../resources/sensors/sensors';
import { Menu } from 'antd';


interface SensorListProps {
  sensors: Sensor<any>[];
  onSelect: (sensor: Sensor<any>) => void;
};

const SensorList: React.FC<SensorListProps> = ({ sensors, onSelect }) => (
  <Menu onSelect={parameter => {
    const sensor = sensors.find(s => s.name === parameter.key);

    if (sensor)
      onSelect(sensor);
  }}>
    {sensors.map(sensor => (
      <Menu.Item key={sensor.name} title={sensor.name}>
        {sensor.name}
      </Menu.Item>
    ))}
  </Menu>
);

export default SensorList;
