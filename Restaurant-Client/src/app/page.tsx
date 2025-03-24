import React from 'react'
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import Menu from './components/menu/Menu'
import Items from './components/items/Items'
import Footer from './components/footer/Footer'

function page() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Menu/>
      <Items/>
      <Footer/>
    </div>
  )
}

export default page
