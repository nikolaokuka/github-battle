import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import Results from './Results'

function Instructions() {
  return (
    <div className='instructions-container'>
      <h1 className='header-lg center-text'>Instructions</h1>
      <ul className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two Github users</h3>
          <FaUserFriends className='bg-light' color='rgb(255, 191, 116)' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>Battle</h3>
          <FaFighterJet className='bg-light' color='#727272' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>See the winner</h3>
          <FaTrophy className='bg-light' color='rgb(255, 215, 0)' size={140} />
        </li>
      </ul>
    </div>
  )
}

class PlayerInput extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    username: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  handleChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  render() {
    return (
      <form className='column player' onSubmit={this.handleSubmit}>
        <label htmlFor='username' className='player-label'>
          {this.props.label}
        </label>
        <div className='row player-inputs'>
          <input
            type='text'
            id='username'
            className='input-light'
            placeholder='github username'
            autoComplete='off'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            type='submit'
            className='btn btn-dark'
            disabled={!this.state.username}>
            Submit
          </button>
        </div>
      </form>
    )
  }
}

function PlayerPreview({ username, label, onReset }) {
  return (
    <div className='column player'>
      <h3 className='player-label'>{label}</h3>
      <div className='row bg-light'>
        <div className='player-info'>
          <img
            className='avatar-small'
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a
            href={`https://github.com/${username}`}
            className='link'>
            {username}
          </a>
        </div>
        <button className='btn-clear flex-center' onClick={onReset}>
          <FaTimesCircle color='rgb(194, 57, 42)' size={26} style={{ cursor: 'pointer' }} />
        </button>
      </div>
    </div>
  )
}


export default class Battle extends Component {
  state = {
    playerOne: null,
    playerTwo: null,
    battle: false
  }

  handleSubmit = (id, player) => {
    this.setState({
      [id]: player
    })
  }

  handleReset = (id) => {
    this.setState({
      [id]: null
    })
  }

  render() {
    const { playerOne, playerTwo, battle } = this.state

    if (battle) {
      return (
        <Results
          playerOne={playerOne}
          playerTwo={playerTwo}
        />
      )
    }

    return (
      <>
        <Instructions />

        <div className='players-container'>
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around'>
            {playerOne ?
              <PlayerPreview
                username={playerOne}
                label='Player One'
                onReset={() => this.handleReset('playerOne')}
              /> :
              <PlayerInput
                label='Player One'
                onSubmit={(player) => this.handleSubmit('playerOne', player)}
              />
            }

            {playerTwo ?
              <PlayerPreview
                username={playerTwo}
                label='Player Two'
                onReset={() => this.handleReset('playerTwo')}
              /> :
              <PlayerInput
                label='Player Two'
                onSubmit={(player) => this.handleSubmit('playerTwo', player)}
              />
            }
          </div>

          {playerOne && playerTwo &&
            <button
              className='btn btn-dark btn-space'
              onClick={() => this.setState({ battle: true })}>
              Battle
            </button>
          }
        </div>
      </>
    )
  }
}