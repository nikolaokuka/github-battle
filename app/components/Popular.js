import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'

function LanguagesNav({ selected, updateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button
            onClick={() => updateLanguage(language)}
            style={selected === language ? { color: 'rgb(187, 46, 31)' } : null}
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

function ReposGrid({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { owner, html_url, forks, open_issues, stargazers_count } = repo
        const { login, avatar_url } = owner

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              username={login}
              avatar={avatar_url}
              url={html_url}
            >
              <ul className='card-list'>
                <li>
                  <FaUser color='rgb(255, 191, 116)' size={22} />
                  <a href={`https://github.com/${login}`}>
                    {login}
                  </a>
                </li>
                <li>
                  <FaStar color='rgb(255, 215, 0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
              </li>
                <li>
                  <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                  {forks.toLocaleString()} forks
              </li>
                <li>
                  <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                  {open_issues.toLocaleString()} open
              </li>
              </ul>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

export default class Popular extends Component {
  state = {
    selected: 'All',
    repos: {},
    error: null,
    loading: true
  }

  componentDidMount() {
    this.updateLanguage(this.state.selected)
  }

  updateLanguage = (language) => {
    this.setState({
      selected: language,
      loading: true,
      error: null
    })

    if (!this.state.repos[language]) {
      getPopularRepos(language)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [language]: data
            },
            error: null,
            loading: false
          }))
        })
        .catch(({ message }) => {
          console.warn(message)

          this.setState({
            error: `Error fetching ${language} repos.`,
            loading: false
          })
        })
    } else {
      this.setState({ loading: false })
    }
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

        {repos[selected] && <ReposGrid repos={repos[selected]} />}
      </>
    )
  }
}