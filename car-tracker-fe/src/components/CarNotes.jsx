import { TextField } from '@mui/material';
export default function CarNotes() {
  return (
    <TextField
      multiline
      fullWidth
      minRows={15}
      maxRows={15}
      placeholder="Put your notes here..."
    />
  );
}
