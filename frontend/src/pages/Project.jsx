import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getProject, reset} from '../features/projects/projectSlice'
import { useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function Project() {

const {project, isLoading, isSuccess, isError, message} = useSelector((state)=>state.projects)

const params = useParams()
const dispatch = useDispatch()
const {projectId} =useParams()

  useEffect (()=> {
    if(isError) {
      toast.error(message)
    }
  dispatch (getProject(projectId))
  }, [isError, message, projectId])

    if(isLoading){
      return <Spinner />
    }
    if(isError){
      return <h3>Something went wrong!</h3>
    }
  return (
    <div className='project-page'>
      <header className='project-header'>
      <BackButton url='/projects' />  
      <h2>
        Project ID: {project._id}  
      <span className={`status status-${project.projectStatus}`}>  
        {project.projectStatus}
        </span>
      </h2>
      <h3>Date Initiated: {new Date(project.createdAt).toLocaleString('en-us')}</h3>
      <hr />
      <div className="project-desc">
        <h3>Description</h3>
        <p>{project.projectDescription}</p>
        </div>
      </header>
    
      </div>
  )

}

export default Project