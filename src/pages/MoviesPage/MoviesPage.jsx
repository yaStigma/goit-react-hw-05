import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { getSearchMovie } from "../../TMDB-api";
import css from "./MoviesPage.module.css";

export default function MoviesPage () {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const movieQuery = searchParams.get('movie') || "";

  const handleSubmit = (event) => {
    event.preventDefault();
    const movie = event.target.elements.title.value.trim();
    
    if (movie) {
      setSearchParams({ movie }); 
    }
    event.target.reset();
  };

  useEffect(() => {
    async function fetchMovies() {
      if (!movieQuery) return;
      
      try {
        setLoading(true);
        setError(false);
        const data = await getSearchMovie(movieQuery);
        setMovies(data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [movieQuery]);




  return (
    <div className={css.container}>
    <form onSubmit={handleSubmit} className={css.form}>
      <input type="text" placeholder="Enter your search" name="title" />
      <button type="submit">Search movie</button>
    </form>
    <div className={css.title}>
    
    {loading && <div>Loading, pleace wait... </div>}
    {error && <div>Error, pleace wait... </div>}
    
    {!loading && !error && movies.length > 0 && (
        <>
        <h1>Movies on request "{movieQuery}"</h1>
        <MovieList movies={movies} />
        </>
      )}
    
    </div></div>
  )
}

