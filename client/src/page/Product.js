import React, { useState, useEffect, useContext } from 'react'
import { fetchOneProduct, fetchBrands } from '../http/productAPI'
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { appContext } from '../index';


// MUI
import { Button, Container, Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const Product = observer(() => {

  const { cart } = useContext(appContext)
  const { products } = useContext(appContext)
  
  const [product, setProduct] = useState({ info: [] });
  const [loading, setLoading] = React.useState(true)
  const { id } = useParams()

  useEffect(() => {
    fetchOneProduct(id)
      .then(res => {
        setProduct(res)
        setLoading(false)
      });
    fetchBrands().then(res => products.setBrands(res))
  }, [])

  if (loading) {
    return (
      <Container maxWidth={'xl'}>
        <Box sx={{ display: 'flex' }} width={"100%"} height={"100%"}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  const handleAddToCartClick = () => {
    cart.setCartItems([product.id, product.name, product.price]);
  }

  const getBrand = () => {
    let brand = products.brands.filter(brand => brand.id === product.brandId)
    brand = brand.map((brand) => brand.name).join(', ')
    return brand
  }

  const getPrice = () => {
    let price = product.price.toLocaleString("en-US")
    price = price + ' ₽'
    return price
  }

  return (
    <Container maxWidth={'xl'}>
      <Grid container mt={1} gap={5} flexWrap={'nowrap'}>
        <Grid xs={4}>
          <CardMedia
            component="img"
            height="400"
            image={process.env.REACT_APP_API_URL + product.image}
            alt={product.name}
          />
        </Grid>
        <Grid xs={4}>
          <Typography variant="overline" component="h2" gutterBottom>
            {getBrand()}
          </Typography>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Stack direction={"row"} gap={1}>
            {product.rating} / 5
            <StarOutlineOutlinedIcon />
          </Stack>
        </Grid>
        <Grid xs={4}>
          <Stack direction={"column"} gap={1}>
            <Typography variant="h5" component="h3" gutterBottom>
              {getPrice()}
            </Typography>
            <Button
              onClick={() => handleAddToCartClick()}
              variant="outlined">
              ADD TO CART
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack direction={'column'} mt={1}>
        {product.info.length
          ?
          <Typography variant="h4" component="h4">
            Характеристики
          </Typography>
          :
          ""
        }
        <List>
          {product.info.map((info, index) => (
            <ListItem key={index} disablePadding={true}>
              <ListItemText
                primary={info.title}
                secondary={info.description}
              />
            </ListItem>
          ))
          }
        </List>
      </Stack>
    </Container>
  )
})

export default Product