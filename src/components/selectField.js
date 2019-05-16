import React from 'react'
import '../containers/VisitorManagementSystem/vmsStyles.css'


export const SelectField = (props) => {

  const {id , forr, value , changeRadioInput} = props

  return(
    <label className={"purposeRadio"}>
    <div className={"imageCheckbox"}>
        <input id={id} name="purpose" type="radio" value={value} onClick = {changeRadioInput}  />
        <label htmlFor={forr}>{value}</label>
    </div>
    </label>
  )
}