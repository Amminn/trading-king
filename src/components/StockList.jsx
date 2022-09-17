import React from 'react'
import {useParams} from 'react-router-dom'
import {BsFillCaretDownFill} from 'react-icons/bs'
import {BsFillCaretUpFill} from 'react-icons/bs'

function StockList() {
  const {symbol} = useParams()

  const [stock, setStock] = React.useState(null)
  const [watchList, setWatchList] = React.useState(['GOOGL', 'MSFT', 'AMZN', 'NRBO'])

  // const findAnyName = async() => {
  //   const urls = ['https://randomuser.me/api/', 'https://randomuser.me/api/'];
  //     try{
  //       let res = await Promise.all(urls.map(e => fetch(e)))
  //       let resJson = await Promise.all(res.map(e => e.json()))
  //       resJson = resJson.map(e => e.results[0].name.first)
  //       console.log(resJson)
  //     }catch(err) {
  //       console.log(err)
  //     }
  //   }
  // findAnyName()

  function change(num) {
    return num > 0 ? 'success' : 'danger'
  }

  function showIcon(num) {
    return num > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
  }

  React.useEffect(() => {
    let isMounted = true
    const baseURL = 'https://finnhub.io/api/v1/quote?symbol='
    const apiKey = '&token=sandbox_ccfo1faad3i2p1r0471g'

    const interval = setInterval(() => {
      const fetchData = async () => {
        try {
          const response = await Promise.all(watchList.map(item => fetch(`${baseURL}${item}${apiKey}`)))
          const data = await Promise.all(response.map(item => item.json()))
          const treatedData = data.map((item, index) => {
            return {
              data: item,
              symbol: watchList[index]
            }
          })
          if (isMounted) {
            setStock(treatedData)
          }
        } catch (err) {
          console.log(err.response)
        }
      }
      fetchData()
    }, 5000)
    // isMounted = false
    return () => clearInterval(interval)
  }, [])

  console.log(stock)

  return (
    <div className='container'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last</th>
            <th>Chg</th>
            <th>Chg%</th>
            <th>Hight</th>
            <th>Low</th>
            <th>Open</th>
            <th>Pclose</th>
          </tr>
        </thead>
        <tbody>
        {stock ? stock.map(item => {
          return (
            <tr key={item.symbol}>
              <td className='name'>{item.symbol}</td>
              <td>{item.data.c}</td>
              <td className={change(item.data.d)}>{item.data.d} {showIcon(item.data.d)}</td>
              <td className={change(item.data.dp)}>{item.data.dp} {showIcon(item.data.dp)}</td>
              <td>{item.data.h}</td>
              <td>{item.data.l}</td>
              <td>{item.data.o}</td>
              <td>{item.data.pc}</td>
            </tr>
          )
        }) : <tr><td>Loading...</td></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default StockList