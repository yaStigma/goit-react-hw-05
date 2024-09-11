import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
import { getTrendingMovies } from "../../TMDB-api";
export default function HomePage () {
  
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const data = await getTrendingMovies();
        setTrendingMovies(data.results); 
        console.log(data.results);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error); 
        setError(true);
      }
      finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);


  return (
    <div className={css.container}>
      <h1>Trending Today</h1>
      {loading && <div>Loading, pleace wait... </div>}
      {error && <div>Error, pleace wait... </div>}
      <MovieList movies={trendingMovies}/>
    </div>
  )
}

