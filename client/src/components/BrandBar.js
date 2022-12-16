import React from 'react'
import { useContext } from 'react';
import { appContext } from '../index';

// MUI
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';




const BrandBar = observer(() => {

    const { products } = useContext(appContext)

    return (
        <Box>
            <ButtonGroup
                orientation="horizontal"
                aria-label="vertical outlined button group"
                style={{ display: 'flex', width: '100%' }}
            >
                {products.brands.map((brand) => (
                    <Button
                        key={brand.id}
                        disabled={brand.id === products.selectedBrand.id ? true : false}
                        onClick={() => {
                            products.setSelectedBrand(brand)
                        }}
                    >
                        {brand.name}
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    )
})

export default BrandBar