import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  const options = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_ACCESS_TOKEN}` 
    }
  };

  useEffect(() => {
    const getTrendingMovies = async () => {
      const { data } = await axios.get('https://api.themoviedb.org/3/trending/movie/day', options );
      
      setTrendingMovies(data.results);
    };

    getTrendingMovies();
  }, [])

  return (
    <ul className={css.list}>
      {trendingMovies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default MovieList