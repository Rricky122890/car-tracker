import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Map from './components/Map';
import CarYearGraph from './components/CarYearGraph';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Map />
      <CarYearGraph />
    </div>
  );
}

export default App;
