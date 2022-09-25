import React from 'react'
import {useParams} from 'react-router-dom'
import StockChart from '../components/StockChart'
import StockData from '../components/StockData'
import Menu from '../components/Menu'

function formatDate(data) {
  return data.t.map((item, index) => {
    return {
      x: item * 1000,
      y: Math.floor(data.c[index])
    }
  })
}

function StockDetailPage() {
  const [chartData, setChartData] = React.useState()
  
  let {symbol} = useParams()

  const url = 'https://finnhub.io/api/v1/stock/candle?symbol='
  const resolution = '&resolution='
  const from = '&from='
  const to = '&to='
  const key = '&token=ccljcdqad3i79c6t9t20ccljcdqad3i79c6t9t2g'

  React.useEffect(() => {
    const date = new Date()
    const currentTime = Math.floor(date.getTime() / 1000 )
    let oneDay = currentTime - 24 * 60 * 60
    const oneWeek = currentTime - 7 * 24 * 60 * 60
    const oneYear = currentTime - 365 * 24 * 60 * 60

    if (date.getDay() === 6) {
      oneDay = currentTime - 2 * 24 * 60 * 60
    } else if (date.getDay() === 0) {
      oneDay = currentTime - 3 * 24 * 60 * 60
    } else {
      oneDay = currentTime - 24 * 60 * 60
    }

    const fetchData = async () => {
      try {
        const response = await Promise.all([
          fetch(`${url}${symbol}${resolution}${30}${from}${oneDay}${to}${currentTime}${key}`),
          fetch(`${url}${symbol}${resolution}${60}${from}${oneWeek}${to}${currentTime}${key}`),
          fetch(`${url}${symbol}${resolution}${'D'}${from}${oneYear}${to}${currentTime}${key}`)
        ])
        const data = await Promise.all(response.map(item => item.json()))
        setChartData({
          day: formatDate(data[0]),
          week: formatDate(data[1]),
          year: formatDate(data[2])
        })
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [symbol])

  return (
    <main className="main">
      <Menu />
      <div className='container'>{chartData && (
        <StockChart symbol={symbol} chartData={chartData} /> )}
        <StockData symbol={symbol} />    
      </div>
    </main>
  )
}

export default StockDetailPage