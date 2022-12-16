import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { appContext } from "../index"


// MUI
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { PRODUCT_ROUTE } from '../utils/consts';

const ProductCard = ({ product }) => {

    const navigate = useNavigate()
    const { products } = useContext(appContext)
    
    const getBrand = () => {
        let brandName;
        products.brands.filter(el => {
            if(el.id === product.brandId) {
                brandName = el.name
            }
            return null
        })
        return brandName;
    }

    return (
        <Card
            style={{ width: 'calc((100% / 4) - 12px)' }}
            onClick={() => {
                navigate(PRODUCT_ROUTE + '/' + product.id)
            }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image={process.env.REACT_APP_API_URL + product.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="overline" display="block" component="small" gutterBottom>
                        {getBrand()}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h3">
                        {product.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                    <Button size="middle" variant="outlined" color="primary" style={{ display: 'flex', gap: "5px", alignItems: 'center' }}>
                        <ShoppingCartIcon />
                        Buy
                    </Button>
                    <Stack direction={"row"} gap={1}>
                        {product.rating} / 5
                        <StarOutlineOutlinedIcon />
                    </Stack>
                </Stack>
            </CardActions>
        </Card>
    )
}

export default ProductCard