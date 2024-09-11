
import { Link } from "react-router-dom";
import css from "./MovieList.module.css";


export default function MovieList ({trendingMovies}) {
 

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

