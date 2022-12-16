import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { appContext } from '../index';
import { authRoutes, publicRoutes } from '../routes';


const AppRouter = () => {

    const { user } = useContext(appContext)
    return (
        <Routes>
            {user._isAuth === true && authRoutes.map((element, index) => (
                <Route path={element.path} на element={<element.Component />} key={index} exact />
            ))}
            {publicRoutes.map((element, index) => (
                <Route path={element.path} на element={<element.Component />} key={index} exact />
            ))}
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default AppRouter