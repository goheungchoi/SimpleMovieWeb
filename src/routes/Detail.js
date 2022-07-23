import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const movie_id = useParams();
  const getMovie = async () => {
    const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=107022cc2f0c53521edf76214397b7df")
    const json = await response.json();
  }
  useEffect( ()=> {
    getMovie();
  }

  );
  return (
    <h1>Detail</h1>
  );
}

export default Detail;