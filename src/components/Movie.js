import PropTypes from "prop-types";
import React from "react"
import { Link } from "react-router-dom";

function Movie({movie, config, genres}) {
  return (  
    <div key={movie.id}>
      <h2>
        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
      </h2>
      <img src={config.base_url + config.poster_sizes[2] + movie.poster_path} 
            alt={movie.title}/>
      <p>{movie.overview}</p>
      <ul>
        {genres.map(e => <li key={e}>{e}</li>)}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;