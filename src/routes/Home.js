import Movie from '../components/Movie.js';
import style from '../App.css';
import { useState, useEffect } from 'react';

function Home() {
  /** loads api **/ 
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genre_map, setGenreMap] = useState(new Map());
  const [config, setConfig] = useState([]);

  const getMovies = async() => {
    const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=107022cc2f0c53521edf76214397b7df")
    const json = await response.json();
    setMovies(json.results);
  }
  const getGenres = async() => {
    const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=107022cc2f0c53521edf76214397b7df")
    const json = await response.json();
    json.genres.forEach(element => 
      setGenreMap(genre_map.set(element.id, element.name))
    );
  }
  const getConfig = async() => {
    const response = await fetch("https://api.themoviedb.org/3/configuration?api_key=107022cc2f0c53521edf76214397b7df")
    const json = await response.json();
    setConfig(json.images)
    setLoading(false);
  }

  useEffect( () => {
    getMovies();
    getGenres();
    getConfig();
  });
  /** ends loading **/ 

  const getGenreNames = (genre_ids, genre_map) => {
    let genres = [];
    genre_ids.forEach((e) => {
      genres.push(genre_map.get(e));
    });
    return genres;
  }

  return (
    <div className={style.App}>
      {loading ? <h1>Loading...</h1> : 
        <div>
          {movies.map(movie => 
            <Movie 
              key={movie.id}
              movie={movie} 
              config={config} 
              genres={getGenreNames(movie.genre_ids, genre_map)} 
            />
          )}
        </div>
      }
    </div>
  );
}

export default Home;
