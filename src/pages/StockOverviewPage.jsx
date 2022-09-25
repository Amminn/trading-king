import React from 'react'
import AutoComplete from '../components/AutoComplete'
import StockList from '../components/StockList'
import Menu from '../components/Menu'
import logo from '../images/trading-logo.png'

function StockOverviewPage() {
  return (
    <main className="main">
      <Menu />
      <div className='container'>
        <img className='logo' src={logo} alt="logo" />
        {<AutoComplete />}
        {<StockList />}
      </div>
    </main>
  )
}

export default StockOverviewPage