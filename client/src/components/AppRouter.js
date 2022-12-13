import React from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';


const AppRouter = () => {

    const isAuth = false;
    return (
        <Routes>
            {isAuth === true && authRoutes.map((element, index) => (
                <Route path={element.path} на element={<element.Component/>} key={index} exact />
            ))}
            {publicRoutes.map((element, index) => (
                <Route path={element.path} на element={<element.Component/>} key={index} exact />
            ))}
            <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
    )
}

export default AppRouter