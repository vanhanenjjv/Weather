import React from 'react';
import Layout from './components/Layout';
import { Link } from 'react-router-dom';
import SensorPage from './pages/SensorPage';


const App: React.FC = () => (
  <Layout>
    <Link to="/sensors" component={SensorPage} />
  </Layout>
);

export default App;
