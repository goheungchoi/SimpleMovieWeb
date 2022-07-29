import React from 'react'
import style from '../style/Loading.module.css'

function Loading({ ready_ }) {
  return (
    <div className={style.Body}>
      <div className=
          {`${style.Loading_screen_header} 
            ${!ready_ ? style.Loading_screen_init :
                        style.Loading_screen_fin }`}>
        <span className={style.Header}>Loading</span>
        <div className={style.lds_ring}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;