import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';

// CONTEXTS
import { appContext } from '../index';

// UI
import { Stack, Button } from '@mui/material';
import { ADMIN_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';




const NavBar = observer(() => {
    const navigate = useNavigate()
    const { user } = useContext(appContext);

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        navigate(SIGNIN_ROUTE)
    }


    return (
        <>
            {user.isAuth === true
                ?
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}>
                    <Button variant="outlined" onClick={() => {
                        navigate(ADMIN_ROUTE)
                    }}>
                        Admin
                    </Button>
                    <Button variant="outlined" onClick={() => {
                        logout()
                    }}>
                        Logout
                    </Button>
                </Stack>
                :
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}>
                    <Button variant="outlined" onClick={() => navigate(SIGNIN_ROUTE)}>
                        Sign In
                    </Button>
                    <Button variant="contained" onClick={() => navigate(SIGNUP_ROUTE)}>
                        Sign Up
                    </Button>
                </Stack>
            }
        </>
    )
})

export default NavBar