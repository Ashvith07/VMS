import React from 'react'
import '../containers/VisitorManagementSystem/vmsStyles.css'

export const VisitorImage = (props) => {

  return (
    <img src={props.imageData} alt="visitorImage" className="captureImage" />
  )

} 