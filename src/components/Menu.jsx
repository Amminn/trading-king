import React from 'react'
import {Link} from 'react-router-dom'

function menu() {
  return (
    <nav>
      <div className="container">
        <ul>
          <li><Link to="/trading-king/">Home</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default menu