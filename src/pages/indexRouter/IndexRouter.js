import React, { useEffect } from 'react'
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom'
import MainRouter from '../mainRouter/MainRouter';

export default function IndexRouter() {
    useEffect(() => {
        localStorage.setItem('index', 0)
    }, [])
    return (
        <HashRouter>
            <Routes>
                <Route path='/*' element={<MainRouter />} />
            </Routes>
            <Outlet />
        </HashRouter>
    )
}