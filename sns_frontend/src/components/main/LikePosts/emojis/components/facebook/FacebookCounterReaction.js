import React from 'react'
import reactCSS from 'reactcss'
import icons from '../../helpers/icons'

export const FacebookCounterReaction = ({ reaction, bg, index }) => {
  const styles = reactCSS({
    'default': {
      reaction: {
        margin: '0.5px 0.5px 0.5px 0.5px',
        width: '29px',
        height: '29px',
        backgroundSize: '100% 100%',
        borderRadius: '30px',
        backgroundImage: `url(${ icons.find('facebook', reaction) })`,
        boxShadow: `0 0 0 2px ${ bg }`,
        position: 'relative',
        zIndex: index,
        float:'left',
      },
    },
  })
  return (
      <div style={ styles.reaction }/>
  )
}

export default FacebookCounterReaction
