import React from "react";
import { Route, Routes } from 'react-router-dom'
import Welcome from '../welcome/Welcome'
import Detection from '../detection/Detection'
const routerMap = {
    '/welcome': <Welcome />,
    '/detection': <Detection />
}

export default function MainBox(props) {
    const { item } = props
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path={item.key} key={item.key} element={routerMap[item.key]} exact />
        </Routes>
    )
}