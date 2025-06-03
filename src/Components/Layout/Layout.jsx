import React from 'react'
import Header from '../Haeder/Header'

function Layout({children}) {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default Layout