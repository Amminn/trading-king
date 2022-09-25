import React from "react";

const Context = React.createContext()

function ContextProvider({children}) {
  const [watchList, setWatchList] = React.useState(
    JSON.parse(localStorage.getItem('watchList')) || ['MSFT', 'AMZN']
  )

  function addStock(stock) {
    if(watchList.indexOf(stock) === -1) {
      return (
        setWatchList(prevValue => [...prevValue, stock])
      )
    }
  }

  React.useEffect(() => {
    localStorage.setItem('watchList', JSON.stringify(watchList))
  }, [watchList])

  function removeStock(stock) {
    const cleanArray = watchList.filter(item => item != stock)
    return setWatchList(cleanArray)
  } 

  return (
    <Context.Provider value={{watchList, addStock, removeStock}}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}