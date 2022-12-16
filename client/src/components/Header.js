import React from 'react'
import { NavLink } from 'react-router-dom';

// MUI
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import NavBar from './NavBar';
import { MAIN_ROUTE } from '../utils/consts';

const Header = () => {
    return (
        <CssBaseline>
            <Container maxWidth={'xl'}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    pt={2}
                >
                    <Stack>
                        <NavLink to={MAIN_ROUTE}>iStore</NavLink>
                    </Stack>
                    <Stack>
                        <NavBar />
                    </Stack>
                </Stack>
            </Container>
        </CssBaseline>
    )
}

export default Header