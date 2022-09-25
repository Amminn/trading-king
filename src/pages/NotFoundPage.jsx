import React from 'react'
import Menu from '../components/Menu'

function NotFoundPage() {
  return (
    <main>
      <Menu />
      <div className="error">
        <h1>ERROR 404 The Page You're Looking For is Not Available</h1>
      </div>
    </main>
  )
}

export default NotFoundPage