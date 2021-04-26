import React from "react"

const VideoYT = ({ videoSrcURL, frameBorder, ...props }) => (
  <div className="video-container">
    <iframe
      src={videoSrcURL}
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
export default VideoYT;