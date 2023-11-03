import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Home} from './components/layout/Home/Home'
import { Car } from './components/Car/Car'


function App() {

  return (
    <>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path='/Car' element = {<Car />} />
      </Routes>
    </>
  )
}

export default App
