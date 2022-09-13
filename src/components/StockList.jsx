import React from 'react'

function StockList() {
  const [watchList, setWatchList] = React.useState(['GOOGLE', 'MFST', 'AMZN'])

  const render = watchList.map(item => {
    return (
      <p>{item}</p>
    )
  })
  return (
    <div>{render}</div>
  )
}

export default StockList