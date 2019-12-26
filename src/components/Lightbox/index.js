import React from 'react'
import { connect } from 'react-redux'

import './Lightbox.scss'

const Lightbox = (props) => {
  const { title, subTitle, dispatch, onClick, pending } = props

  return <div className="lightbox">
    <div className="lightbox__overlay"></div>
    <div className="content">
      <h3>{ title }</h3>
      <p>{ subTitle }</p>
      {pending &&
        <p>Aguarde...</p>
      }
      <div className="btn">
        <button type="button" onClick={() => dispatch({ type: 'TOGGLE_MODAL_CLOSE' })} className="btn__not">Não</button>
        <button type="button" className="btn__yes" onClick={() => onClick() }>Sim</button>
      </div>
    </div>
  </div>
}

export default connect()(Lightbox)
