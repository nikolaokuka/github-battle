import React, { Component } from 'react'
import PropTypes from 'prop-types'

function LanguagesNav({ selected, updateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button
            onClick={() => updateLanguage(language)}
            style={selected === language ? { color: 'crimson' } : null}
            className='btn-clear nav-link'>
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
}

export default class Popular extends Component {
  state = {
    selected: 'All'
  }

  updateLanguage = (language) => {
    this.setState({ selected: language })
  }

  render() {
    const { selected } = this.state

    return (
      <>
        <LanguagesNav
          selected={selected}
          updateLanguage={this.updateLanguage}
        />
      </>
    )
  }
}