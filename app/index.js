import React from 'react'
import ReactDOM from 'react-dom'
import Popular from './components/Popular'
import './index.css'

function App () {
  return (
    <div className='container'>
      <Popular />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)