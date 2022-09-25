import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Context} from '../context/Context'

function AutoComplete() {
  const {addStock, setStock} = React.useContext(Context)
  const [value, setValue] = React.useState(null); // use selected value
  const [inputValue, setInputValue] = React.useState(''); // input of the user
  const [options, setOptions] = React.useState([]) // the option we have based on api
  
  const baseURL = 'https://finnhub.io/api/v1/search?q=' 
  const apiKey = '&token=ccljcdqad3i79c6t9t20ccljcdqad3i79c6t9t2g'

  React.useEffect(() => {
    let isMounted = true 
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}${inputValue}${apiKey}`)
        const data = await response.json()
        if (isMounted) {
          setOptions(data.result)
        }
      } catch(err) {
        console.log(err.response)
      }
    }
    if (inputValue.length > 0 ) {
      fetchData()
    } else {
      setOptions([])
    }
    return () => (isMounted = false)
  }, [inputValue])

  return (
    <Autocomplete
      className='autocomplete'
      value={value}
      onChange={(event, newValue) => {
        if(newValue.symbol.length > 0) {
          addStock(newValue.symbol)
          setInputValue('')
        } else {
          addStock([])
        }
     }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={options}
      getOptionLabel={(option) => option.description + ' ' + '('+option.symbol+')'}
      sx={{ width: 350 }}
      renderInput={(params) => <TextField {...params} label="STOCK" />}
    />
  )
}

export default AutoComplete