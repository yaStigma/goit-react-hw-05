import { useEffect, useRef, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getMovieDetails } from "../../TMDB-api";
import { Link, NavLink, Outlet } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import NotFoundPage from "../NotFoundPage/NotFoundPage";




export default function MovieDetailsPage (){
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {movieId} = useParams();

  const location  = useLocation()

const backLinkRef = useRef(location.state ?? "/movies")

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        console.log("Fetching movie details for movieId:", movieId);
        
        const data = await getMovieDetails(movieId); 
                setMovieDetails(data); 
     
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
    
    {movieDetails && (
      <>
      <Link to={backLinkRef.current}> <button className={css.btn} type="button"> Back to movies </button>  </Link> 

        <div className={css.container}>
          <div className={css.img}>
            <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
          </div>
          <div className={css.item}>
            <h2>{movieDetails.title}</h2>
            <p>User Score: {movieDetails.vote_average}</p>
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
            <h3>Genres</h3>
            <p>
              {movieDetails.genres.map(genre => genre.name).join(", ")}
            </p>
          </div>


        </div>
        <ul className={css.list}>
          <li>
<NavLink to="cast"><button className={css.btn} type="button"> Cast</button></NavLink>
          </li>
          <li>
<NavLink to="reviews"><button className={css.btn} type="button"> Reviews</button></NavLink>
          </li>
        </ul>
        <Outlet />


      </>
    )}
  </div>
  )
}

