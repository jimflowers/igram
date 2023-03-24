import { Navigate, Link } from "react-router-dom"
import {useSelector} from 'react-redux'

import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'



function Home() {
      const {user} = useSelector((state) =>state.auth)

      if (user === null) {
         <Navigate to='/login' />
      } else {
  return (
   <>
    <section className="heading">
      <h1>Greetings {user.name}! 
      </h1>
      <p>Please choose from options below</p>
      </section>
   
      <Link to='/new-project' className='btn btn-reverse btn-block'>
<FaQuestionCircle />Create New Project
      </Link>
      
      <Link to='/projects' className='btn btn-block'>
<FaTicketAlt/>View My Projects
      </Link>
</>
  )
}
}
export default Home