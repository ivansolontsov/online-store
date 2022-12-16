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
import { Container, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const Shop = observer(() => {
  const { products } = useContext(appContext)
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    setLoading(true)
    fetchCategory().then(res => products.setCategories(res))
    fetchBrands().then(res => products.setBrands(res))
    fetchProducts(products.categoryIds, products.brandIds, products.currentPage, products.pageLimit).then(res => {
      products.setProducts(res.rows)
      products.setTotalCount(res.count)
    }).finally(() => {
      setLoading(false)
    })
  }, [products.currentPage, products.categoryIds, products.brandIds])

  return (
    <Container maxWidth={'xl'}>
      <Grid container mt={1} spacing={2}>
        <Grid xs={2}>
          <CategoryBar />
        </Grid>
        <Grid xs={10}>
          <BrandBar />
          {loading && (
            <Box sx={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          )}
          {loading === false && (
            <ProductList />
          )}
          <Paginate />
        </Grid>
      </Grid>
    </Container>
  )
})

export default Shop