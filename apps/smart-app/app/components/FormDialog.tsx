import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface iFormDialog {
  placeholder: String;
  onItemAdd: (item: String) => void;
}

export default function FormDialog( {placeholder, onItemAdd }: iFormDialog ) {
  const [open, setOpen] = React.useState(false);
  const[value, setValue] = React.useState<String>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddClose = (event:any) => {
    console.log(value);
    onItemAdd(value);
    setOpen(false);
    
  };

  const handleCancelClose = (event:any) => {
    setOpen(false);
    
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <button type="button" className='absolute block text-xs' onClick={handleClickOpen}>AddNew</button> 
      <Dialog open={open} onClose={handleCancelClose}>
        <DialogTitle>Add New {placeholder}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add new option to {placeholder}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={placeholder}
            type="email"
            fullWidth
            variant="standard"
            onChange={(event:any)=> setValue(event.target.value.toUpperCase())}            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose}>Cancel</Button>
          <Button onClick={handleAddClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}