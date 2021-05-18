import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}

export default class Loading extends Component {
  static defaultProps = {
    text: 'Loading',
    speed: 300
  }

  static propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number,
  }

  state = {
    content: this.props.text
  }

  componentDidMount() {
    const { text, speed } = this.props

    this.id = setInterval(() => {
      console.log('here')
      this.state.content === text + '...'
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + '.' }))
    }, speed)
  }

  componentWillUnmount() {
    clearInterval(this.id)
  }

  render() {
    return (
      <p style={styles.content}>
        {this.state.content}
      </p>
    )
  }
}