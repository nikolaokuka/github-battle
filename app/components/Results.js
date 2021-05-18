import React, { Component } from 'react'
import { battle } from '../utils/api'

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
    return (
      <div>
        Results
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    )
  }
}
