import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Routes, Route} from 'react-router-dom'
import StockDetailPage from './pages/StockDetailPage'
import StockOverviewPage from './pages/StockOverviewPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<StockDetailPage />} />
        <Route path="/detail/:symbol" element={<StockOverviewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
