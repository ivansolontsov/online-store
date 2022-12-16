import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { createCategory } from '../../http/productAPI';


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


const CreateCategory = ({ open, onHide }) => {

  const [category, setCategory] = React.useState('');

  const addCategory = () => {
    if (category) {
      try {
        createCategory({ name: category }).then(res => {
          setCategory('')
          onHide(true)
        });
      }
      catch (error) {
        alert(error.response.data.message)
      }
    } else {
      alert('Enter Category Name')
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
            Add Category
          </Typography>
          <hr />
          <TextField
            id="outlined-basic"
            label="Введите название категории"
            placeholder='Смартфоны'
            variant="outlined"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <hr />
          <Button onClick={() => addCategory()}>Add Category</Button>
          <Button onClick={onHide}>Close Modal</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateCategory