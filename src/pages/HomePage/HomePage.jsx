
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

const HomePage = () => {
  

  return (
    <div className={css.container}>
      <h1>Trending Today</h1>
      <MovieList />
    </div>
  )
}

export default HomePage