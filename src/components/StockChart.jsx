import React from 'react'
import Chart from 'react-apexcharts'

function stockChart({chartData, symbol}) {
  const [btnData, setBtnData] = React.useState('24h')
  const {day, week, year} = chartData

  function colorPIcker() {
    let time = determineTimeFormat()
    if(time[0].y < time[time.length - 1].y) {
      return "#26C281"
    } else {
      return "#ed3419"
    }
  }

  const options = {

    colors: [colorPIcker()],
    title: {
      text: symbol,
      align: "center",
      style: {
          fontSize: "24px"
      }
    },
    chart: {
      id: 'stock data',
      animation: {
        speed: 1300
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM"
      }
    }
  }

  function determineTimeFormat() {
    switch(btnData) {
      case "24h":
        return day
      case "7d":
        return week
      case "1y":
        return year
      default:
        return day
    }
  }

  const series = [{
    name: symbol,
    data: determineTimeFormat()
  }]

  function renderButtonSelect(button) {
    if (button === btnData) {
      return 'active'
    } else {
      return ''
    }
  }

  return (
    <div className='chart'>
      <Chart
       options={options} series={series} type="area" width="100%"
      />
      <div className="btns">
        <button className={renderButtonSelect('24h')} onClick={() => setBtnData('24h')}>24h</button>
        <button className={renderButtonSelect('7d')} onClick={() => setBtnData('7d')}>7d</button>
        <button className={renderButtonSelect('1y')} onClick={() => setBtnData('1y')}>1y</button>
      </div>
    </div>
  )
}

export default stockChart