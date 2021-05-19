import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Popular from './components/Popular'
import Battle from './components/Battle'
import './index.css'

class App extends Component {
  state = {
    theme: 'light',
    toggleTheme: () => this.setState(({ theme }) => ({
      theme = 'light' ? 'dark' : 'light'
    }))
  }

  render() {
    return (
      <ThemeProvider value={this.state}>
        <div className='container'>
          <Battle />
        </div>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)