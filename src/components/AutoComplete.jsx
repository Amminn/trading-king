import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// const top100Films = [
//   { label: 'The Shawshank Redemption', year: 1994 },
//   { label: 'The Godfather', year: 1972 },
//   { label: 'The Godfather: Part II', year: 1974 },
//   { label: 'The Dark Knight', year: 2008 },
//   { label: '12 Angry Men', year: 1957 },
//   { label: "Schindler's List", year: 1993 },
//   { label: 'Pulp Fiction', year: 1994 },
//   {
//     label: 'The Lord of the Rings: The Return of the King',
//     year: 2003,
//   }
// ]

function AutoComplete() {
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');
  const [option, setOption] = React.useState([])
  const baseURL = 'https://finnhub.io/api/v1/search?q='
  const apiKey = '&token=sandbox_ccfo1faad3i2p1r0471g'

  React.useEffect(() => {
    let isMounted = true 
    const fetchData = async () => {
      try {
        console.log(`${baseURL}${inputValue}${apiKey}`)
        const response = await fetch(`${baseURL}${inputValue}${apiKey}`)
        const data = await response.json()
        if (isMounted) {
          setOption(data.result)
        }
      } catch(err) {
        console.log(err.response)
      }
    }
    if (inputValue.length > 0 ) {
      fetchData()
    } else {
      setOption([])
    }
    return () => (isMounted = false)
  }, [inputValue])

  const renderOption = option.map(item => {
    return item.symbol
  })

  console.log(option)
  console.log()
  console.log(inputValue)

    return (
    <Autocomplete
      className='autocomplete'
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={renderOption}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="STOCK" />}
    />
  )
}

export default AutoComplete