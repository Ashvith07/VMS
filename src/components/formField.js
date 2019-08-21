import React from 'react'


export const FormField = ({fieldTitle,value,changeHandle}) => {
  return(
    <div>
       <label>{fieldTitle}</label>
        <input type="text" value = {value} onChange = {changeHandle} />
    </div>
   
  );
}