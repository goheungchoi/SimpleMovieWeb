import Movie from '../components/Movie.js';
import Loading from '../components/Loading.js';
import style from '../App.css';
import React from 'react';

class Home extends React.Component {
  /** loads api **/ 
  state = {
    loading: true,
    movies: [],
    genre_map: new Map(),
    config: []
  };

  getMovies = async() => {
    const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=107022cc2f0c53521edf76214397b7df")
    const json = await response.json();
    this.setState({ movies: json.results });
  };
  getGenres = async() => {
    const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=107022cc2f0c53521edf76214397b7df")
    const json = await response.json();
    json.genres.forEach(element => 
      this.setState(this.state.genre_map.set(element.id, element.name))
    );
  };
  getConfig = async() => {
    const response = await fetch("https://api.themoviedb.org/3/configuration?api_key=107022cc2f0c53521edf76214397b7df")
    const json = await response.json();
    this.setState({ config: json.images });
  };

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getAPI = async() => {
    await this.getMovies();
    await this.getGenres();
    await this.getConfig();
    await this.sleep(5000);
    await this.setState({loading: false});
  }

  componentDidMount() {
    this.getAPI();
  };
  /** ends loading **/ 

  getGenreNames = (genre_ids, genre_map) => {
    let genres = [];
    genre_ids.forEach((e) => {
      genres.push(genre_map.get(e));
    });
    return genres;
  };

  render() {
    const { loading, movies, config, genre_map} = this.state;
    return (
      <div className={style.App}>
        {loading ? <Loading /> : 
          <div>
            {movies.map(movie => 
              <Movie 
                key={movie.id}
                movie={movie} 
                config={config} 
                genres={this.getGenreNames(movie.genre_ids, genre_map)} 
              />
            )}
          </div>
        }
      </div>
    );
  };
}

export default Home;
