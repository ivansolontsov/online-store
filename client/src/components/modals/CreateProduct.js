import * as React from 'react';
import { useContext, useEffect } from 'react';
import { appContext } from "../../index";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createProduct, fetchCategory, fetchBrands } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';


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


const CreateProduct = observer(({ open, onHide }) => {

  const { products } = useContext(appContext)
  const [productName, setProductName] = React.useState()
  const [productPrice, setProductPrice] = React.useState()
  const [file, setFile] = React.useState(null)
  const [info, setInfo] = React.useState([])



  useEffect(() => {
    fetchCategory().then(res => products.setCategories(res))
    fetchBrands().then(res => products.setBrands(res))
  }, [])


  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(info => number !== info.number))
  }

  const selectFile = (event) => {
    setFile(event.target.files[0]);
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(element => element.number === number ? { ...element, [key]: value } : element))
  }



  const [brand, setBrand] = React.useState('')
  const [category, setCategory] = React.useState('')


  const handleBrand = (event) => {
    setBrand(event.target.value)
  }

  const handleCategory = (event) => {
    setCategory(event.target.value)
  }

  const addProduct = () => {
    const formData = new FormData()
    formData.append('name', productName)
    formData.append('price', `${productPrice}`)
    formData.append('image', file)
    formData.append('brandId', products.selectedBrand.id)
    formData.append('categoryId', products.selectedBrand.id)
    formData.append('info', JSON.stringify(info))

    createProduct(formData)
      .then(res => onHide())
      .catch(error => console.log(error))
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={onHide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component='form'>
          <Typography mb={3} id="modal-modal-title" variant="h6" component="h2">
            Create Product
          </Typography>
          <Stack gap={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(event) => handleCategory(event)}
              >
                {products.categories.map((category) => (
                  <MenuItem
                    value={category.id}
                    key={category.id}
                    onClick={() => products.setSelectedCategory(category)}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={brand}
                label="Brand"
                onChange={(event) => handleBrand(event)}
              >
                {products.brands.map((brand) => (
                  <MenuItem
                    value={brand.id}
                    key={brand.id}
                    onClick={() => products.setSelectedBrand(brand)}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              id="outlined-basic"
              label="Enter Product Name"
              variant="outlined" />
            <TextField
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              id="outlined-basic"
              label="Enter Price"
              variant="outlined" />
          </Stack>
          <Button
            style={{ marginTop: '10px', width: '100%', display: 'flex', gap: '10px' }}
            variant="outlined"
            component="label"
          >
            <CloudUploadIcon />
            <span>Upload File</span>
            <input
              type="file"
              onChange={(event) => selectFile(event)}
              hidden
            />
          </Button>
          <Stack direction='column'>
            {info.map((info) => (
              <Stack direction='row' key={info.number} gap={1} mt={1}>
                <TextField
                  value={info.title}
                  onChange={(event) => changeInfo('title', event.target.value, info.number)}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined" />
                <TextField
                  value={info.description}
                  onChange={(event) => changeInfo('description', event.target.value, info.number)}
                  id="outlined-basic" label="Description"
                  variant="outlined" />
                <Button variant="outlined" onClick={() => removeInfo(info.number)}>Delete</Button>
              </Stack>
            ))}
          </Stack>
          <Button
            variant='outlined'
            style={{ marginTop: '10px', width: '100%' }}
            onClick={() => addInfo()}
          >Add new characteristic</Button>
          <Stack mt={5} direction='row' gap={1}>
            <Button style={{ width: "100%" }} variant="contained" onClick={addProduct}>Add Product</Button>
            <Button style={{ width: "100%" }} variant="outlined" onClick={onHide}>Close Modal</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
})

export default CreateProduct