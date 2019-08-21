import React from 'react'


export const TextAreaField = ({fieldTitle,value,changeHandle}) => {
  return(
    <div>
       <label>{fieldTitle}</label>
       <textarea  type="text" value = {value} onChange = {changeHandle}  ></textarea>
    </div>
   
  );
}