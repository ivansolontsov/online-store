import React from 'react'
import { useContext } from 'react';
import { appContext } from '../index';


// MUI
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';



const CategoryBar = observer(() => {
    const { products } = useContext(appContext)

    const handleCategoryChange = (event, category) => {
        products.setSelectedCategory(category)
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
                        control={<Radio />}
                        label={category.name}
                        onClick={(event) => handleCategoryChange(event, category)} />
                ))}
            </RadioGroup>
        </Box>
    )
})

export default CategoryBar