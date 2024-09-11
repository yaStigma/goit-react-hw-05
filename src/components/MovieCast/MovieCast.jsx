import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMovieCredits } from "../../TMDB-api";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

export default function MovieCast() {
  const [movieCredits, setMovieCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {movieId} = useParams();
 
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const data = await getMovieCredits(movieId); 
        setMovieCredits(data); 
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
    
    {movieCredits && (
      <>
<ul>
  {movieCredits.map(({cast}) => (
    <li key={cast.id}>
    <div>
      <img src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} />
<h4>{cast.name}</h4>
<p>Character: {cast.character}</p>
    </div>
  </li>
  ))}
  
</ul>
      </>
    )}
  </div>
  )
};
 