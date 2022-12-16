import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { appContext } from '../index';
import Paginate from '../components/Paginate';
import CategoryBar from '../components/CategoryBar';
import BrandBar from '../components/BrandBar';
import ProductList from '../components/ProductList';
import { fetchCategory, fetchBrands, fetchProducts } from '../http/productAPI'



// MUI
import Grid from '@mui/material/Unstable_Grid2';
import { Container } from '@mui/material';


const Shop = observer(() => {
  const { products } = useContext(appContext)

  useEffect(() => {
    fetchCategory().then(res => products.setCategories(res))
    fetchBrands().then(res => products.setBrands(res))
    fetchProducts(null, null, products.currentPage, products.pageLimit).then(res => {
      products.setProducts(res.rows)
      products.setTotalCount(res.count)
    })
  }, [])  

  useEffect(() => {
    fetchProducts(products.selectedCategory.id, products.selectedBrand.id, products.currentPage, products.pageLimit).then(res => {
      products.setProducts(res.rows)
      products.setTotalCount(res.count)
    })
  }, [products.currentPage, products.selectedCategory, products.selectedBrand])

  return (
    <Container maxWidth={'xl'}>
      <Grid container mt={1} spacing={2}>
        <Grid xs={3}>
          <CategoryBar />
        </Grid>
        <Grid xs={9}>
          <BrandBar />
          <ProductList />
          <Paginate />
        </Grid>
      </Grid>
    </Container>
  )
})

export default Shop