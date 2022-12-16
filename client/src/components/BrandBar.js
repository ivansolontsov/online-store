import React from 'react'
import { useContext } from 'react';
import { appContext } from '../index';

// MUI
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';




const BrandBar = observer(() => {

    const { products } = useContext(appContext)

    const handleBrandChange = (event, brand) => {
        if (event.target.checked) {
            products.setSelectedBrand(brand)
        } else {
            products.removeFromSelectedBrand(brand)
        }
        console.log(products.brandIds)
    }


    return (
        <Box>
                {products.brands.map((brand) => (
                    <FormControlLabel
                        key={brand.id}
                        value={brand.id}
                        control={<Checkbox />}
                        label={brand.name}
                        onChange={(event) => handleBrandChange(event, brand)} />
                ))}
        </Box>
    )
})

export default BrandBar