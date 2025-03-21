import { Drawer } from '@mui/material';
import { use } from 'react';
import { useState } from 'react';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleDrawer() {
    setIsOpen((prevState) => !prevState);
  }
  return (
    <div>
      <button onClick={toggleDrawer} style={{ marginTop: '46px' }}>
        R
      </button>
      <Drawer onClose={toggleDrawer} open={isOpen}>
        <h1 onClick={toggleDrawer}>Side Nav</h1>
        <ul>
          <p>Ricardo</p>
          <p>20 Cars</p>
          <p>Log Out</p>
        </ul>
      </Drawer>
    </div>
  );
}
