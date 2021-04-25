import React from "react"
const video = ({ videoSrcURL, videoTitle, ...props }) => (
  <div className="video-container">
    <iframe
      src={videoSrcURL}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media;"
      frameBorder="0"
      width="640" 
      height="360"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </div>
)
export default video;