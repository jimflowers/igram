import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux" // brings in user from global state
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
// import {createProject} from '../features/projects/projectSlice'
import Spinner from "../components/Spinner"


function NewProject () {
  const {user} = useSelector ((state)=> state.auth) // get user from global state
  const {isLoading, isError, isSuccess, message} = useSelector((state)=>state.project)
const [projectName, setprojectName] = useState('')
const [projectOrganization, setprojectOrganization] = useState(user.organization)
const [projectDescription, setprojectDescription]=useState('')
const [projectStatus, setprojectStatus]= useState('open')

const dispatch =useDispatch()
const navigate = useNavigate()

useEffect(()=> {
  if(isError) {
    toast.error(message)
  }

  if(isSuccess){
   //
    navigate('/projects')
  }
 //
}, [dispatch, isError, isSuccess, navigate, message])

const onSubmit = (e) =>{
  e.preventDefault()
// dispatch(createProject({projectName, projectDescription}))
   
}
if(isLoading){
  return <Spinner />
}
  return (
    <>
    <section className="heading">
       <h1>Set Up A NewProject</h1>
      <p>Please fillout form below</p>
    </section>
    <section className="form">
      <div className="form-group">
        <label htmlFor="userName" className="name">Project Investigator</label>
        <input type="text" className='form-control' value={user.name} />
      </div>
     </section>
     <section className="form">
      <div className="form-group">
        <label htmlFor="projectOrganization" className="projectOrganization">Project Organization</label>
        <input type="text" className='form-control' value={projectOrganization} />
      </div>
     </section>
     <section className="form">
      <form className="form-group" onSubmit={onSubmit}>
        
        <label htmlFor="projectName" className="name">Project Name</label>
        <input type="text" className='form-control' value={projectName} />

        <div className="form-group">
      <label htmlFor='projectDescription'>Description of the Project</label>
      <textarea className="form-control" id="projectDescription"
      name='projectDescription'
      value={projectDescription} 
      onChange={(e) =>setprojectDescription(e.target.value)}></textarea>
      </div>
      <div className="formgroup">

      
        <label htmlFor='projectStatus'>Status of Project</label>
      <select 
      className="form-control" id="projectStatus"
      name='projectStatus'
      value={projectStatus} 
      onChange={(e)=> setprojectStatus(e.target.value)}>
        <option value='open'>Open
        </option>
        <option value='closed'>Closed
        </option>
        <option value="archived">Archived</option>
        </select>
        </div>
        <div className="form-group">
            <button className="btn btn-block">Submit</button>
            <ToastContainer />
          </div>
      </form>
     </section>
      </>
  )
}

export default NewProject