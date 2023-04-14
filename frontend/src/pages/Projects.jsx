import { useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {getProjects, reset} from '../features/projects/projectSlice'
import Spinner from "../components/Spinner" 
import BackButton from "../components/BackButton"
import ProjectItem from '../components/ProjectItem'


function Projects() {
  const {projects, isLoading, isSuccess } = useSelector((state) => state.projects)
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])
  
  if(isLoading) {
    return <Spinner />
  }
  return (
  <>
    <BackButton url='/home'/>
     <h1>Projects</h1> 
     <h3>Investigator: {user.name}</h3>
     <div className="projects">
      <div className="project-headings">
        <div>Project</div>
        <div>Description</div>
        <div>Date Created</div>
        <div>Status</div>
        <div></div>
      </div>
      {projects.map((project) => (
        <ProjectItem key={project._id} project={project}/>
      ) )}
     </div>
  </>
  )
}

export default Projects