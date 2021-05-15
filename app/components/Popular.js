import React, { Component } from 'react'

export default class Popular extends Component {
  state = {
    selected: 'All'
  }

  updateLanguage = (language) => {
    this.setState({ selected: language })
  }

  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
      <ul className='flex-center'>
        {languages.map((language) => (
          <li key={language}>
            <button
              onClick={() => this.updateLanguage(language)}
              style={this.state.selected === language ? { color: 'crimson' } : null}
              className='btn-clear nav-link'>
              {language}
            </button>
          </li>
        ))}
      </ul>
    )
  }
}