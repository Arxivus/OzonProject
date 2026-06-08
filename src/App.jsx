import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import BasketPage from './pages/BasketPage/BasketPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}>
        </Route>
        <Route path='/basket' element={<BasketPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
