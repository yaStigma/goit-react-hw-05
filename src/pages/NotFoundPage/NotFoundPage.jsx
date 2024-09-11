import { Link } from "react-router-dom"
import css from "./NotFoundPage.module.css"

export default function NotFoundPage ()  {
  return (
    <div className={css.container}> 
      <h2>Not Found Page</h2> 
      
        <Link to="/"> <button className={css.btn} type="button"> Home</button>  </Link> 
       
       </div>
  )
}

