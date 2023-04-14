import {useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {createProject, reset} from '../features/projects/projectSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewProject() {
const {user} = useSelector((state)=> state.auth)
const {isLoading, isError, isSuccess, message} = useSelector((state)=> state.project)


// now we set the local state
const [name,setName] = useState(user.name)
const [userId,setuserId] = useState(user._id)
const [projectName,setprojectName] = useState('')
const [projectDescription,setprojectDescription]= useState('')
const [projectOrganization,setprojectOrganization] = useState(user.organization)
const [projectStatus,setprojectStatus] = useState('open')

const dispatch = useDispatch()
const navigate = useNavigate()

useEffect(()=> {
  if(isError) {
    toast.error(message)
  }
  if(isSuccess) {
    dispatch(reset())
    navigate('/projects')
  }
  dispatch(reset())
}, [dispatch, isError, isSuccess,navigate,message])


const onSubmit = (e) => {
  e.preventDefault()
  dispatch(createProject({projectName, projectDescription}))
}

if(isLoading) {
  return <Spinner />
}
  return (
   <>
   <BackButton url='/home'/>
   <section className="heading">Create New Project
   <p>Please fill out the form</p></section>

   <section className="form">
    <div className="form-group">
      <label htmlFor="name">Primary Investigator</label>
      <input type="text" className="form-control" value={name} disabled />
     </div>
     
     <form onSubmit={onSubmit}>

    
     <div className="form-group">
      <label htmlFor="projectName">Project Title</label>
      <input type="text" className="form-control" value={projectName} onChange={(e) => setprojectName(e.target.value)}/>
     </div>
     <div className="form-group">
      <label htmlFor="projectOrganization">Project Organization</label>
      <input type="text" className="form-control" value={projectOrganization} onChange={(e) => setprojectOrganization(e.target.value)} />
     </div>
     <form onSubmit={onSubmit}></form>
     <div className="form-group">
      <label htmlFor="projectDescription">Describe the Project</label>
      <textarea className="form-control" value={projectDescription} onChange={(e) => setprojectDescription(e.target.value)}
      rows={5}></textarea>
     </div>
     <div className="form-group">
      <label htmlFor="projectStatus">Project Status</label>
      <select name="projectStatus" id="projectStatus" value={projectStatus} 
      onChange={(e) =>setprojectStatus(e.target.value)}>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="archived">Archived</option>
      </select>
     </div>
     <div className="form-group">
      <button className='btn btn-block'>Submit</button>
     </div>
     </form>
   </section>
   </>
  )
}

export default NewProject