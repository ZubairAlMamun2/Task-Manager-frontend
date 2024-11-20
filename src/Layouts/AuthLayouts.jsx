import React from 'react'
import NavBar from '../NavBar'
import { Outlet } from 'react-router-dom'

const AuthLayouts = () => {
  return (
    <div>
        <header>
            <NavBar />
        </header>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default AuthLayouts