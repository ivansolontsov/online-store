import React from 'react'
import Container from '@mui/material/Container'
import { Button, Stack } from '@mui/material'
import CreateBrand from '../components/modals/CreateBrand'
import CreateCategory from '../components/modals/CreateCategory'
import CreateProduct from '../components/modals/CreateProduct'


const Admin = () => {


  const [createBrandOpen, setBrandCreateOpen] = React.useState(false);
  const [createCategoryOpen, setCreateCategoryOpen] = React.useState(false);
  const [createProductOpen, setCreateProductOpen] = React.useState(false);



  return (
    <Container maxWidth={'xl'}>
      <Stack mt={10} width='100%' direction="column" gap={3}>
        <Button variant='contained' onClick={() => setCreateCategoryOpen(true)}>Добавить категорию</Button>
        <Button variant='contained' onClick={() => setBrandCreateOpen(true)}>Добавить производителя</Button>
        <Button variant='outlined' onClick={() => setCreateProductOpen(true)}>Добавить товар</Button>
      </Stack>
      <CreateBrand open={createBrandOpen} onHide={() => setBrandCreateOpen(false)} />
      <CreateCategory open={createCategoryOpen} onHide={() => setCreateCategoryOpen(false)} />
      <CreateProduct open={createProductOpen} onHide={() => setCreateProductOpen(false)} />
    </Container>
  )
}

export default Admin