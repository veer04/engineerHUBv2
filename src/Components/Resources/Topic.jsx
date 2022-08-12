import React from 'react'
import './Resources.css'
function Topic(props) {
    const {  link,  subheading } = props
  return (
    <div className='topicBox'>
        <a href={link} className="subheading">
          {subheading}
        </a>
    </div>
  )
}

export default Topic