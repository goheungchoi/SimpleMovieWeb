import React from 'react'
import style from './Loading.module.css'

function Loading() {
  return (
    <div className={style.Body}>
      <div className={style.Loading_screen_header}>
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