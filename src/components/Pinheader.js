import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../style/Pinheader.module.css";
import icon from "./svg/shortcut.svg";

//<Link to={`/movie/${movie.id}`}>{movie.title}</Link>

function Pinheader(props) {
  const [ontop, setOntop] = useState(true);

  useEffect(() => {
    window.onscroll = function() {
      if(window.pageYOffset === 0) {
        setOntop(true);
      } else {
        setOntop(false);
      }
    };
  })

  return (
    <div className={style.Pinheader}>
      <div className=
        {`${style.Pinheader_container} 
          ${ontop ? style.Ontop : style.Not_Ontop}`}>
        <Link to='/'>
          <img 
            src={icon}
            alt='TMDB' 
            width="154"
            height="20"
          />
        </Link>
        <h1>TMDB Top 20 Movies</h1>
        <ul className={style.Navigator}>
          <li>
            <Link to='/about'>
              <p>About</p>
            </Link>
          </li>
          <li>
            <Link to='/contact'>
              <p>Contact</p>
            </Link>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default Pinheader;