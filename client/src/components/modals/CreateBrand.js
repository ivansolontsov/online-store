import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { createBrand } from '../../http/productAPI';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const CreateBrand = ({ open, onHide }) => {

  const [brandValue, setBrandValue] = React.useState('');


  const addBrand = () => {
    if (brandValue) {
      try {
        createBrand({ name: brandValue }).then(res => {
          setBrandValue('')
          onHide(true)
        });
      }
      catch (error) {
        alert(error.response.data.message)
      }
    } else {
      alert('Enter Brand Name')
    }
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={onHide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Brand
          </Typography>
          <hr />
          <TextField
            value={brandValue}
            onChange={(event) => setBrandValue(event.target.value)}
            id="outlined-basic"
            label="Введите название категории"
            placeholder='Смартфоны'
            variant="outlined" />
          <hr />
          <Button onClick={() => addBrand()}>Add Brand</Button>
          <Button onClick={onHide}>Close Modal</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateBrand