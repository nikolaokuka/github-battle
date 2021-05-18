import React from 'react'
import PropTypes from 'prop-types'

export default function Card({ header, avatar, username, score, url, children }) {
  return (
    <div className='card bg-light'>
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
  )
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  score: PropTypes.string,
  url: PropTypes.string.isRequired,
}