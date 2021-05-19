import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withHover from '../components/withHover'

const styles = {
  container: {
    position: 'relative',
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '14%',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  }
}

function Tooltip({ text, children, hovering }) {
  return (
    <div style={styles.container}>
      {hovering && <div style={styles.tooltip}>{text}</div>}
      {children}
    </div>
  )
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
}

export default withHover(Tooltip)