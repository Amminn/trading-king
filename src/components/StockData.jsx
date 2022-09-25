import React from 'react'

function StockData({symbol}) {
  const [data, setData] = React.useState(null)
  const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=ccljcdqad3i79c6t9t20ccljcdqad3i79c6t9t2g`

  React.useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
      } catch (err) {
        console.log(err.response)
      }
    }

    dataFetch()
  }, [symbol])

  return (
    <div>
      {data ? (
        <>
          <div className="data">
            <section>
              <p>Name: <span>{data.name}</span></p>
              <p>Country: <span>{data.country}</span></p>
              <p>Ticker: <span>{data.ticker}</span></p>
            </section>
            <section>
              <p>Exchange: <span>{data.exchange}</span></p>
              <p>Industry: <span>{data.finnhubIndustry}</span></p>
              <p>IPO: <span>{data.ipo}</span></p>
            </section>
            <section>
              <p>MarketCap: <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'}).format(data.marketCapitalization)}</span></p>
              <p>Shares Outstanding: <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'}).format(data.shareOutstanding)}</span></p>
              <p>url: <a href={data.weburl} target="_blank" >{data.weburl}</a></p>
            </section>
          </div>
        </>
      )
      :
        (<p>Loading...</p>)
      }
    </div>
  )
}


export default StockData