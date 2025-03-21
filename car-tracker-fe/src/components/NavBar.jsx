import { Typography } from '@mui/material';
import AppBar from '@mui/material/Appbar';

export default function NavBar() {
  return (
    <AppBar>
      <Typography variant="h5" sx={{ flexGrow: 1 }}>
        Car Tracker
      </Typography>
    </AppBar>
  );
}
