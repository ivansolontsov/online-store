import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { appContext } from '../index';


// MUI
import { Stack } from '@mui/system';
import ProductCard from './ProductCard';


const ProductList = observer(() => {

    const { products } = useContext(appContext);

    return (
        <Stack direction={'row'} flexWrap={'wrap'} gap={2} mt={2}>
            {products.products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </Stack>
    )
})

export default ProductList