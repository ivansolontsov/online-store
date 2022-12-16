import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header"
import { appContext } from "./index";
import { check } from "./http/userAPI";

// MUI
import '@fontsource/public-sans';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const App = observer(() => {

  const { user } = useContext(appContext)
  const [loading, setLoading] = React.useState(true)
  
  useEffect(() => {
    check()
      .then(result => {
        user.setUser(result)
        user.setIsAuth(true)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Header />
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
})

export default App;