
export default function dataFetching(url) {
  const baseURL = 'https://finnhub.io/api/v1'
  const fetchData = async() => {
    try {
      const response = await fetch(`${baseURL}`)
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  fetchData()
}