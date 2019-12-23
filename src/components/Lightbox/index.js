import React from 'react'

import './Lightbox.scss'

const Lightbox = (props) => {
  const { title, subTitle } = props

  return <div className="lightbox">
    <div className="lightbox__overlay"></div>
    <div className="content">
      <h3>{ title }</h3>
      <p>{ subTitle }</p>
      <div className="btn">
        <button type="button" className="btn__not">Não</button>
        <button type="button" className="btn__yes">Sim</button>
      </div>
    </div>
  </div>
}

export default Lightbox
