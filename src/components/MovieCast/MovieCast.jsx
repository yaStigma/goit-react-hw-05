import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMovieCredits } from "../../TMDB-api";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import css from "./MovieCast.module.css";

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
        setMovieCredits(data.cast); 
     console.log(data.cast);
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
      <div className={css.container}>
<ul className={css.list}>
  {movieCredits.map((castMember) => (
    <li key={castMember.id}>
    <div className={css.box}>
    {castMember.profile_path ? (
                  <img className={css.img}
                    src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
                    alt={castMember.name}
                  />
                ) : (
                  <img className={css.img}
                    src="https://via.placeholder.com/150"
                    alt={castMember.name}
                  />
                )}
                <div>
<h4>{castMember.name}</h4>
<p>Character: {castMember.character}</p>
    </div>
    </div>
  </li>
  ))}
  
</ul>
      </div>
    )}
  </div>
  )
};
 