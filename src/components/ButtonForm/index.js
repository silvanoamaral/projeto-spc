import React from 'react'

const ButtonForm = props => {
  return <div className="form__group">
    <button className="btn btn-primary">{ props.label }</button>
  </div>
}

export default ButtonForm