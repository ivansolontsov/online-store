import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
// import { useLocation, useNavigate } from 'react-router-dom';

// MUI
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { appContext } from '..';

const Paginate = observer(() => {
    // const navigate = useNavigate()
    // const location = useLocation()

    const { products } = useContext(appContext)

    const countOfPages = Math.ceil(products.totalCount / products.pageLimit)
    const pages = []

    for (let i = 0; i < countOfPages; i++) {
        pages.push(i + 1)
    }

    const handlePaginationChange = (event, value) => {
        products.setCurrentPage(value)
    }

    return (
        <Stack spacing={2} width={'100%'} justifyContent={'center'} alignItems={'center'} marginTop={5}>
            {countOfPages > 0 && (
                <Pagination count={countOfPages} page={products.currentPage} shape={'rounded'} onChange={handlePaginationChange} />
            )}
        </Stack>
    )
})

export default Paginate