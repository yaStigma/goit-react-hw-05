import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMovieReviews } from "../../TMDB-api";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import css from "./MovieReviews.module.css";



export default function MovieReviews() {
  
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {movieId} = useParams();
 
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const data = await getMovieReviews(movieId); 
        setReviews(data.results); 
     console.log(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (movieId) {
      fetchData(); 
    }
  }, [movieId]);


  return (
    <div>
    {loading && <div>Loading, please wait...</div>}
    {error && <NotFoundPage/>}
    
    {reviews && (
      <div className={css.container}>
<ul >
  {reviews.map((results) => (
    <li key={results.id} className={css.list}>
    <div>
      <h4>{results.author}</h4>
<p className={css.text} > {results.content}</p>
    </div>
  </li>
  ))}
  
</ul>
      </div>
    )}
  </div>
  )
  
};


