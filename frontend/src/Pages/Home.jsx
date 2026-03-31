import React from 'react'
import Navbar from '../components/Navbar'
import StaticStuff from '../components/StaticStuff'
import Campaigns from '../components/Campaigns'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <StaticStuff/>
      <Campaigns/>
      <Footer/>
    </div>
  )
}

export default Home
