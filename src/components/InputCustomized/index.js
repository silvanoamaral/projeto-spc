import React from 'react'

const InputCustomized = ( props ) => {
  return (
    <div className={'form__group' + (props.submitted && !props.value ? ' has-error' : '')}>
      <label htmlFor={ props.name }>{ props.label }</label>
      <input
        type="text"
        maxLength={ props.maxLength }
        name={ props.name }
        value={ props.value }
        onChange={ props.onChange }
        placeholder={ props.placeholder }
        disabled={ props.active || false }
        autoComplete="off"
      />
      {props.submitted && !props.value &&
        <div className="form__group-error">{ props.name } is required</div>
      }
    </div>
  )
}

export default InputCustomized