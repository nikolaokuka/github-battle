import React, { Component } from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Card from './Card'

export default class Results extends Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }

  componentDidMount() {
    const { playerOne, playerTwo } = this.props

    battle([playerOne, playerTwo])
      .then(([winner, loser]) => {
        this.setState({
          winner,
          loser,
          error: null,
          loading: false
        })
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        })
      })
  }

  render() {
    const { winner, loser, error, loading } = this.state

    if (error) {
      return <p className='center-text error-msg'>{error}</p>
    }

    if (loading) {
      return <p className='center-text'>Loading...</p>
    }

    return (
      <div className='grid space-around container-sm'>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Winner'}
          avatar={winner.profile.avatar_url}
          username={winner.profile.login}
          score={`Score: ${winner.score.toLocaleString()}`}
          url={winner.profile.html_url}
        >
          <ul className='card-list'>
            <li>
              <FaUser color='rgb(239, 115, 115)' size={22} />
              {winner.profile.name}
            </li>
            {winner.profile.location &&
              <li>
                <FaCompass color='rgb(144, 115, 255)' size={22} />
                {winner.profile.location}
              </li>
            }
            {winner.profile.company &&
              <li>
                <FaBriefcase color='#795548' size={22} />
                {winner.profile.company}
              </li>
            }
            <li>
              <FaUsers color='rgb(129, 195, 245)' size={22} />
              {winner.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color='rgb(64, 183, 95)' size={22} />
              {winner.profile.following.toLocaleString()} following
            </li>
          </ul>
        </Card>

        <Card
          header={winner.score === loser.score ? 'Tie' : 'Loser'}
          avatar={loser.profile.avatar_url}
          username={loser.profile.login}
          score={`Score: ${loser.score.toLocaleString()}`}
          url={loser.profile.html_url}
        >
          <ul className='card-list'>
            <li>
              <FaUser color='rgb(239, 115, 115)' size={22} />
              {loser.profile.name}
            </li>
            {loser.profile.location &&
              <li>
                <FaCompass color='rgb(144, 115, 255)' size={22} />
                {loser.profile.location}
              </li>
            }
            {loser.profile.company &&
              <li>
                <FaBriefcase color='#795548' size={22} />
                {loser.profile.company}
              </li>
            }
            <li>
              <FaUsers color='rgb(129, 195, 245)' size={22} />
              {loser.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color='rgb(64, 183, 95)' size={22} />
              {loser.profile.following.toLocaleString()} following
            </li>
          </ul>
        </Card>
      </div>
    )
  }
}
