import PropTypes from "prop-types";
import React from "react";
import Rating from "./Rating.js";
import Popularity from "./Popularity.js";
import sleep from "./Sleep.js";
import getScrollBarWidth from "./GetScrollBarWidth.js";
// import { useParams } from "react-router-dom";
import xicon from './svg/xicon.svg';
import style from '../style/Detail.module.css';
import {CSSTransition} from 'react-transition-group';

class Detail extends React.Component {
  // const movie_id = useParams();
  // const getMovie = async () => {
  //   const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=107022cc2f0c53521edf76214397b7df")
  //   const json = await response.json();
  // }
  // useEffect(()=> {
  //     getMovie();
  // });
  constructor(props) {
    super(props);
    this.disableScrolling = this.disableScrolling.bind(this);
    this.enableScrolling = this.enableScrolling.bind(this);
    this.state = {
      hidden: true,
      movieInfo: [],
      release_year: "",
      genres: [],
      countries: [],
      release_date: "",
    };
    this.dialog_ref = React.createRef();
  };

  getMovieInfo = async() => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.id}?api_key=107022cc2f0c53521edf76214397b7df`);
    const json = await response.json();
    this.setState({ movieInfo: json });
    this.setState({ release_year: json.release_date.slice(0, 4) });
    this.setState({ genres: json.genres.map((genre)=> genre.name) });
    this.setState({ countries: json.production_countries.map((country)=> country.iso_3166_1) });
    this.setState({ release_date: json.release_date.replaceAll("-", "/") });
  };

  disableScrolling = () => {
    document.body.style.paddingRight = `${getScrollBarWidth()}px`;
    document.body.style.overflow = "hidden";
  };

  enableScrolling = () => {
    document.body.style.paddingRight = "inherit";
    document.body.style.overflow = "auto";
  };

  delayUpdate = async() => {
    await sleep(500);
    await this.setState({hidden: true});
    await this.enableScrolling();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.popup_hidden !== this.props.popup_hidden) {
      if (this.props.popup_hidden) {
        this.delayUpdate();
      } else {
        this.disableScrolling();
        this.getMovieInfo();
        this.setState({hidden: false});
      }
    }
  };

  render () {
    const { popup_hidden, movie, config, onClose } = this.props;
    const { hidden, movieInfo, release_year, genres,
       countries, release_date } = this.state;
    return (
      <div 
        id='detail_dialog' 
        className={`${hidden ? style.disable : style.layover}`}
        ref={this.dialog_ref}
      >
        <CSSTransition
          in={!popup_hidden}
          timeout={500}
          classNames={{
            appear: style.Dialog_init,
            appearActive: style.Dialog_active,
            enter: style.Dialog_init,
            enterActive: style.Dialog_active,
            exit: style.Dialog_exit,
            exitActive: style.Dialog_exit_active,
          }}
        >
          <div 
            className={style.Dialog}
            role='dialog' 
            aria-modal='true' 
            tabIndex='-1'
          >
            <div onClick={() => onClose(true)} className={style.Close_btn}>
              <img 
                src={xicon}
                alt='X' 
                width="24"
                height="24"
              />
            </div>
            { hidden ? null :
              <div className={style.Info}>
                <div className={style.Header}>
                  <img
                    src={config.base_url + config.poster_sizes[3] + movie.poster_path} 
                    alt={movie.title}
                    width="260"/>
                  <div className={style.Detail_wrapper}> 
                    <div className={style.Title}>
                      <span>{movie.title}</span>
                      <span>{` (${release_year})`}</span>
                    </div>
                    <div className={style.Facts}>
                      {countries.map((country)=><div key={country}>{country}</div>)}
                      <div>{release_date}</div>
                      <div>{`${movieInfo.runtime} minutes`}</div>
                    </div>
                    <div className={style.Stats}>
                      <Rating
                        vote_ave={movieInfo.vote_average}
                      />
                      <Popularity 
                        pop={movieInfo.popularity}
                      />
                    </div>
                    <div className={style.Genre_wrapper}>
                      {genres.map((g) => 
                        <div 
                          key={g}
                          className={style.Genre}>
                            {g}
                        </div>)}
                    </div>
                    <span>{`"${movieInfo.tagline}"`}</span>
                  </div>
                </div>
                <div className={style.Overview}>
                  <span>Overview</span>
                  <p>{movie.overview}</p>
                </div>
              </div>
            }
          </div>
        </CSSTransition>
      </div>
    );
  }
}

Detail.propTypes = {
  popup_hidden: PropTypes.bool.isRequired,
  movie: PropTypes.any,
  config: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}


export default Detail;