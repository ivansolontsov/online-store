import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { appContext } from '../index'

// MUI
import Container from '@mui/material/Container';
import { TextField, Card, Button, Typography, Box } from '@mui/material';
import { Stack } from '@mui/system';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MAIN_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from '../utils/consts';
import { signin, signup } from '../http/userAPI';

const Auth = observer(() => {

  const navigate = useNavigate()
  const { user } = useContext(appContext);
  const location = useLocation()
  const isLogin = location.pathname === SIGNIN_ROUTE
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const authClick = async () => {
    try {
      let userData;
      if (isLogin) {
        userData = await signin(email, password)
      } else {
        userData = await signup(email, password)
      }
      user.setUser(userData)
      user.setIsAuth(true)
      navigate(MAIN_ROUTE)
    }
    catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <Container>
      <Box margin={"auto"} maxWidth={'sm'} height={'100vh'} alignItems={'center'}>
        <Card
          variant='outlined'
          component='form'
          style={{ marginTop: "30px", display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', padding: '35px' }}>
          <Typography variant="h6" component="h2" pb={2}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Typography>
          <Stack gap={2} width={'100%'}>
            <TextField
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              id="outlined-basic"
              label="E-Mail"
              placeholder='Your E-Mail'
              variant="outlined" />
            <TextField
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              id="outlined-basic"
              placeholder='Your Password'
              label="Password"
              variant="outlined"
              type={'password'} />
            <Stack direction={'row'} alignItems={'center'} gap={5} width={"100%"}>
              {
                isLogin
                  ?
                  <Typography variant="caption" display="block" width={"100%"} gutterBottom>
                    Don't have an account? <NavLink to={SIGNUP_ROUTE}>Sign Up</NavLink>
                  </Typography>
                  :
                  <Typography variant="caption" display="block" width={"100%"} gutterBottom>
                    Do you have an account? <NavLink to={SIGNIN_ROUTE}>Sign In</NavLink>
                  </Typography>
              }
              <Button onClick={authClick} variant='outlined' style={{ display: 'flex', width: '100%' }}>
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Container>
  )
})

export default Auth