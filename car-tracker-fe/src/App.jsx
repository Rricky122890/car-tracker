import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Map from './components/Map';
import CarYearGraph from './components/CarYearGraph';
import NavBar from './components/NavBar';
import CarNotes from './components/CarNotes';
import { Grid, Box } from '@mui/material';
import SideBar from './components/SideBar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar sx={{ width: '250px', flexShrink: 0 }} />
      <Box sx={{ flexGrow: 1 }}>
        <NavBar />
        <Map />
        <Box sx={{ display: 'flex' }}>
          <CarYearGraph />
          <CarNotes />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
