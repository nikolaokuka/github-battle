import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../contexts/theme'

export default function Card({ header, avatar, username, score, url, children }) {
  return (
    <ThemeConsumer>
      {(theme) => (
        <div className={`card bg-${theme}`}>
          <h4 className='header-lg center-text'>
            {header}
          </h4>
          <img
            className='avatar'
            src={avatar}
            alt={`Avatar for ${username}`}
          />
          {score &&
            <h4 className='center-text'>
              Score: {score}
            </h4>
          }
          <h2 className='center-text'>
            <a className='link' href={url}>{username}</a>
          </h2>
          {children}
        </div>
      )}
    </ThemeConsumer>
  )
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  score: PropTypes.string,
  url: PropTypes.string.isRequired,
}