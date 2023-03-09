import React from 'react'
import './LoadingBox.css'
function LoadingBox() {
  return (
    <div class='container'>
    <div class='loader'>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--text'></div>
    </div>
  </div>
  )
}

export default LoadingBox

