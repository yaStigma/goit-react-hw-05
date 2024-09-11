import axios from "axios";


const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_ACCESS_TOKEN}` 
    }
  };

  export const getTrendingMovies = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', options );
    
    return response.data
  };


 export const getSearchMovie = async () => {
  const response = await axios.get('https://api.themoviedb.org/3/search/movie', options );
    
    return response.data
 };

 export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, options); 
    
  return response.data;
};

 export const getMovieCredits  = async (movieId) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, options );
    
    return response.data
 };

 

 export const getMovieReviews  = async (movieId) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, options );
    
    return response.data
 };