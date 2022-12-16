import React from 'react'
import { useContext } from 'react';
import { appContext } from '../index';
import { observer } from 'mobx-react-lite';


// MUI
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Checkbox } from '@mui/material';



const CategoryBar = observer(() => {
    const { products } = useContext(appContext)

    const handleCategoryChange = (event, category) => {
        if (event.target.checked) {
            products.setSelectedCategory(category)
        } else {
            products.removeFromSelectedCategory(category)
        }
        console.log(products.categoryIds)
    }

    return (
        <Box>
            <FormLabel>Categories</FormLabel>
            <RadioGroup
                defaultValue="female"
                name="radio-buttons-group"
            >
                {products.categories.map((category) => (
                    <FormControlLabel
                        key={category.id}
                        value={category.id}
                        control={<Checkbox />}
                        label={category.name}
                        onChange={(event) => handleCategoryChange(event, category)} />
                ))}
            </RadioGroup>
        </Box>
    )
})

export default CategoryBar