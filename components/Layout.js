import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Footer from './Footer'

function Layout({children}) {
    return (
        <div className="container">
            <NavBar />
            <Notify />
            <Modal />
            {children}
            {/* <Footer /> */}

        </div>
    )
}

export default Layout
