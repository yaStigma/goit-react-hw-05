import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Navigation from "./components/Navigation/Navigation";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";





const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./components/MovieReviews/MovieReviews"));




export default function App() {
  return (
   <>
      <Navigation />
      <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
</Route>
        <Route path="*" element={<NotFoundPage />}/>

      </Routes>
      </Suspense>
   </>
  )
}
