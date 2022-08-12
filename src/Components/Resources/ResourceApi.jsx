import React from 'react'
import "./Resources.css";
import Topic from './Topic';


function ResourceApi(props) {
    const { heading, text } = props
    return (
            <div className='container-hiring'>
                <div className="heading">{heading}</div>
                <div className="texthire">{text}</div>
                <div className="topic_container">
                    <Topic link="#" subheading="Best websites for DSA" />
                    <Topic link="#" subheading="Top 10 DSA Questions" />
                    <Topic link="#" subheading="Youtube channel for DSA" style={{overflow:"hidden"}}/>
                    <Topic link="#" subheading="Tutorial for Python" />
                    <Topic link="#" subheading="Tutorial for Python" />
                    <Topic link="#" subheading="Tutorial for C ++" />
                </div>
            </div>
    )
}

export default ResourceApi