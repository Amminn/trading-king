import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import StockDetailPage from './pages/StockDetailPage'
import StockOverviewPage from './pages/StockOverviewPage'
import NotFoundPage from './pages/NotFoundPage'
import {ContextProvider} from './context/Context'

function App() {

  return (
    <>
      <ContextProvider>
        <Routes>
          <Route exact path="/trading-king/" element={<StockOverviewPage />} />
          <Route path="/trading-king/detail/:symbol" element={<StockDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ContextProvider>
    </>
  )
}

export default App
