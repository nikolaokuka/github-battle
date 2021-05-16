import React from 'react'
import ReactDOM from 'react-dom'
import Popular from './components/Popular'
import Battle from './components/Battle'
import './index.css'

function App() {
  return (
    <div className='container'>
      <Battle />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)