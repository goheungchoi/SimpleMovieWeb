import Movie from '../components/Movie.js';
import Detail from '../components/Detail.js';
import Loading from '../components/Loading.js';
import Pinheader from '../components/Pinheader.js';
import style from '../style/Home.module.css';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from "react-redux";
import { load_api, unload_api } from "../redux/actions.js";
import { get_api } from '../redux/selectors.js';

import sleep from '../components/Sleep.js';

class Home extends React.Component {
  /** loads api **/ 
  constructor(props) {
    super(props);
    this.state = {
      ready: this.props.api.ready,
      loading: this.props.api.loading,
      screen_hidden: this.props.api.screen_hidden,
      movies: this.props.api.movies,
      genre_map: this.props.api.genre_map,
      config: this.props.api.config,
      popup_hidden: this.props.api.popup_hidden,
      popup_index: this.props.api.popup_index,
    };
    this.openPopupWindow = this.openPopupWindow.bind(this);
    this.closePopupWindow = this.closePopupWindow.bind(this);
  }

  getMovies = async() => {
    const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=107022cc2f0c53521edf76214397b7df");
    const json = await response.json();
    this.setState({ movies: json.results });
  };
  getGenres = async() => {
    const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=107022cc2f0c53521edf76214397b7df");
    const json = await response.json();
    json.genres.forEach(element => 
      this.setState(this.state.genre_map.set(element.id, element.name))
    );
  };
  getConfig = async() => {
    const response = await fetch("https://api.themoviedb.org/3/configuration?api_key=107022cc2f0c53521edf76214397b7df");
    const json = await response.json();
    this.setState({ config: json.images });
  };

  getAPI = async() => {
    await this.getMovies();
    await this.getGenres();
    await this.getConfig();
    await this.setState({ready: true});
    await sleep(3000);
    await this.setState({loading: false});
    await sleep(1500);
    await this.setState({screen_hidden: true});
  }

  componentDidMount() {
    if (this.state.loading) {
      this.getAPI();
    } else {
      console.log(this.props.api);
    }
  };

  componentDidUpdate() {
    if (this.props.api !== this.state) {
      this.props.load_api(this.state);
    }
  }

  /** ends loading **/ 

  getGenreNames = (genre_ids, genre_map) => {
    let genres = [];
    genre_ids.forEach((e) => {
      genres.push(genre_map.get(e));
    });
    return genres;
  };

  openPopupWindow = (open, index) => {
    this.setState({popup_hidden: !open});
    this.setState({popup_index: index});
  };

  closePopupWindow = (close) => {
    this.setState({popup_hidden: close});
  }

  render() {
    const { ready, loading, screen_hidden, movies, 
      config, genre_map, popup_hidden, popup_index} 
      = this.state;
    return (
      <div className={style.App}>
        {loading ? <Loading ready_={ready}/> : 
          <div className={style.Body}>
            <div className=
                  {`${style.Screen} 
                    ${screen_hidden ? style.hidden : null}`}>
            </div>
            <div className={style.Container}> 
              <Pinheader />
              {movies.map((movie, index) => 
                <Movie 
                  key={movie.id}
                  index={index}
                  movie={movie} 
                  config={config} 
                  genres={this.getGenreNames(movie.genre_ids, genre_map)} 
                  sendInfo={this.openPopupWindow}
                />
              )}
            </div>
            <Detail 
              popup_hidden={popup_hidden}
              movie={movies[popup_index]}
              config={config}
              onClose={this.closePopupWindow}
            />
            <CSSTransition
              in={!popup_hidden}
              timeout={500}
              classNames={{
                appear: style.backDrop_init,
                appearActive: style.backDrop_active,
                appearDone: style.backDrop_done,
                enter: style.backDrop_init,
                enterActive: style.backDrop_active,
                enterDone: style.backDrop_done,
                exit: style.backDrop_done,
                exitActive: style.backDrop_exit,
              }}
            >
              <div></div>
            </CSSTransition>
            
          </div>
        }
      </div>
    );
  };
}

export default connect(
  state => ({ 
    api: get_api(state) }), 
  { load_api }) 
  (Home);
