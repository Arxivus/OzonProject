import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import CartPage from './pages/CartPage/CartPage'
import OrdersPage from './pages/OrdersPage/OrdersPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}>
        </Route>
        <Route path='/cart' element={<CartPage />}>
        </Route>
        <Route path='/orders' element={<OrdersPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
