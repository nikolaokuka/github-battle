import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getPopularRepos } from '../utils/api'

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
    selected: 'All',
    repos: null,
    error: null,
    loading: true
  }

  componentDidMount() {
    this.updateLanguage(this.state.selected)
  }

  updateLanguage = (language) => {
    this.setState({
      selected: language,
      repos: null,
      loading: true,
      error: null
    })

    getPopularRepos(language)
      .then((data) => {
        this.setState({
          repos: data,
          error: null,
          loading: false
        })
      })
      .catch(({ message }) => {
        console.warn(message)

        this.setState({
          error: `Error fetching ${language} repos.`,
          loading: false
        })
      })
  }

  render() {
    const { selected, repos, error, loading } = this.state

    return (
      <>
        <LanguagesNav
          selected={selected}
          updateLanguage={this.updateLanguage}
        />

        {error && <p className='center-text error-msg'>{error}</p>}

        {loading && <p className='center-text'>Loading...</p>}

        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </>
    )
  }
}