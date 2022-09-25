import React from 'react'
import {useNavigate} from 'react-router-dom'
import {BsFillCaretDownFill} from 'react-icons/bs'
import {BsFillCaretUpFill} from 'react-icons/bs'
import {Context} from '../context/Context'
import {BiTrash} from "react-icons/bi"

function StockList() {
  const navigate = useNavigate()

  const {watchList, removeStock} = React.useContext(Context)

  const [stock, setStock] = React.useState(null)
  
  function change(num) {
    return num > 0 ? 'success' : 'danger'
  }

  function showIcon(num) {
    return num > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
  }

  function handleStockSelect (symbol) {
    navigate(`/trading-king/detail/${symbol}`)
  }

  React.useEffect(() => {
    let isMounted = true
    const baseURL = 'https://finnhub.io/api/v1/quote?symbol='
    const apiKey = '&token=ccljcdqad3i79c6t9t20ccljcdqad3i79c6t9t2g'

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
  }, [watchList])

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
            <tr key={item.symbol} onClick={() => handleStockSelect(item.symbol)} >
              <td className='name'>{item.symbol}</td>
              <td>{item.data.c}</td>
              <td className={change(item.data.d)}>{item.data.d} {showIcon(item.data.d)}</td>
              <td className={change(item.data.dp)}>{item.data.dp} {showIcon(item.data.dp)}</td>
              <td>{item.data.h}</td>
              <td>{item.data.l}</td>
              <td>{item.data.o}</td>
              <td>{item.data.pc}</td>
              <td onClick={(e) => {
                e.stopPropagation()
                removeStock(item.symbol)
              }} className="trash" >{<BiTrash />}</td>
            </tr>
          )
        }) : <tr><td>Loading...</td></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default StockList