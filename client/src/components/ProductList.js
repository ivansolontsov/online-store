import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { appContext } from '../index';


// MUI
import { Stack } from '@mui/system';
import ProductCard from './ProductCard';
import { Typography } from '@mui/material';


const ProductList = observer(() => {

    const { products } = useContext(appContext);

    return (
        <Stack direction={'row'} flexWrap={'wrap'} gap={2} mt={2} height={'100%'}>
            {products.totalCount === 0 && (
                <Typography variant="h4" component='h3' alignSelf={'center'} justifySelf={'center'} margin={'auto auto'}>
                    There is no products
                </Typography>
            )}
            {products.products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </Stack>
    )
})

export default ProductList