import React from 'react'
import Navbar from './components/navbar'

const App = () => {
  return (
    <div className='overflow-x-hidden text-white antialiased selection:bg-gray-300 selection:text-black bg-black min-h-screen'>
      <div className='fixed top-0 -z-10 h-full w-full bg-black'></div>
      <div className='container mx-auto px-8'>
        <Navbar />
      </div>
    </div>
  )
}

export default App
