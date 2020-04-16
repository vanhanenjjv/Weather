import React from 'react';
import MainLayout from './components/MainLayout';
import { Link } from 'react-router-dom';
import SensorPage from './pages/SensorPage';


const App: React.FC = () => (
  <MainLayout>
    <Link to="/sensors" component={SensorPage} />
  </MainLayout>
);

export default App;
