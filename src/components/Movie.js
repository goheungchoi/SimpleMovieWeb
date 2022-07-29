import PropTypes from "prop-types";
import React from "react"
import style from "../style/Movie.module.css";

//<Link to={`/movie/${movie.id}`}>{movie.title}</Link>

class Movie extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const {index, movie, config, genres, sendInfo} = this.props;
    return ( 
      <div key={movie.id} className={style.Body}>
        <div className={style.Ranking_box}><p>{index + 1}</p></div>
        <h2>{movie.title}</h2>
        <div className={style.Background_Line}>
          <div className={style.Line}></div>
        </div>
        <img onClick={() => sendInfo(true, index)} 
              src={config.base_url + config.poster_sizes[3] + movie.poster_path} 
              alt={movie.title}/>
      </div>
    );
  }
}

Movie.propTypes = {
  index: PropTypes.number.isRequired,
  movie: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  sendInfo: PropTypes.func.isRequired
}

export default Movie;