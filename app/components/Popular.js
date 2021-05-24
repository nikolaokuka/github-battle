import React, { Component, useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { getPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

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
                  <Tooltip text='Guthub Username'>
                    <FaUser color='rgb(255, 191, 116)' size={22} />
                    <a href={`https://github.com/${login}`}>
                      {login}
                    </a>
                  </Tooltip>
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

function popularReducer(state, action) {
  switch (action.type) {
    case 'success':
      return {
        ...state,
        [action.selected]: action.repos,
        error: null
      }
    case 'error':
      return {
        ...state,
        error: action.message,
      }
    default:
      throw new Error(`Action type doesn't exist.`)
  }
}

export default function Popular() {
  const [selected, setSelected] = useState('All')
  const [state, dispatch] = useReducer(popularReducer, { error: null })

  useEffect(() => {
    if (!state[selected]) {
      getPopularRepos(selected)
        .then((repos) => dispatch({ type: 'success', repos, selected }))
        .catch(({ message }) => dispatch({ type: 'error', message }))
    }
  }, [selected])

  const isLoading = () => !state[selected] && state.error === null

  return (
    <>
      <LanguagesNav
        selected={selected}
        updateLanguage={setSelected}
      />

      {state.error && <p className='center-text error-msg'>{state.error}</p>}

      {isLoading() && <Loading text='Fetching repos' />}

      {state[selected] && <ReposGrid repos={state[selected]} />}
    </>
  )
}