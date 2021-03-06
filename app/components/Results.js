import React, { useReducer, useEffect } from 'react'
import { battle } from '../utils/api'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaUser } from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'

function CardList({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        {profile.name}
      </li>
      {profile.location &&
        <li>
          <Tooltip text="User's location">
            <FaCompass color='rgb(144, 115, 255)' size={22} />
            {profile.location}
          </Tooltip>
        </li>
      }
      {profile.company &&
        <li>
          <Tooltip text="User's company">
            <FaBriefcase color='#795548' size={22} />
            {profile.company}
          </Tooltip>
        </li>
      }
      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul >
  )
}

CardList.propTypes = {
  profile: PropTypes.object.isRequired,
}

function resultsReducer(state, action) {
  switch(action.type) {
    case 'success':
      return {
        winner: action.winner,
        loser: action.loser,
        error: null,
        loading: false
      }
    case 'error':
      return {
        ...state,
        error: action.message,
        loading: false
      }
    case 'fetch':
      return {
        ...state,
        loading: true
      }
    default:
      throw new Error(`Action type isn't supported.`)
  }
}

export default function Results({ location }) {
  const { playerOne, playerTwo } = queryString.parse(location.search)
  const [state, dispatch] = useReducer(resultsReducer, {
    winner: null,
    loaser: null,
    error: null,
    loading: true
  })

  useEffect(() => {
    dispatch({ type: 'fetch' })

    battle([playerOne, playerTwo])
      .then(([winner, loser]) => dispatch({ type: 'success', winner, loser }))
      .catch(({ message }) => dispatch({ type: 'error', message }))
  }, [playerOne, playerTwo])

  const { winner, loser, error, loading } = state

  if (error) {
    return <p className='center-text error-msg'>{error}</p>
  }

  if (loading) {
    return <Loading text='Battling' />
  }

  return (
    <>
      <div className='grid space-around container-sm'>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Winner'}
          avatar={winner.profile.avatar_url}
          username={winner.profile.login}
          score={`Score: ${winner.score.toLocaleString()}`}
          url={winner.profile.html_url}
        >
          <CardList profile={winner.profile} />
        </Card>

        <Card
          header={winner.score === loser.score ? 'Tie' : 'Loser'}
          avatar={loser.profile.avatar_url}
          username={loser.profile.login}
          score={`Score: ${loser.score.toLocaleString()}`}
          url={loser.profile.html_url}
        >
          <CardList profile={loser.profile} />
        </Card>
      </div>
      <Link
        className='btn btn-dark btn-space'
        to='/battle'
      >
        Reset
      </Link>
    </>
  )
}
