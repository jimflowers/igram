import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
import { FaUser } from "react-icons/fa"
import {useSelector, useDispatch} from 'react-redux'
import {project, reset} from '../features/auth/authSlice'

function NewProject() {
  const {user} = useSelector((state) => state.auth)

  const [formData, setFormData]= useState({
    investigator_id:'',
    projectName:'',
    projectDescription:'',
    projectOrganization:user.organization,
    projectStatus:'open'
    
  })

  const onChange =(e) =>{
    setFormData((prevState)=>({...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) =>{
    e.preventDefault()

         const formData= {investigator_id, projectName, projectDescription, projectOrganization, projectStatus }

      dispatch(project(formData))
    

  }

  return (
    <>
    <section className="heading">
<h1>
  <FaUser /> New Project
</h1>
<p>Please describe your project</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
      <input type="text" className="form-control" id="projectName"
      name='projectName'
      value={projectName} 
      onChange={onChange} placeholder="Project Name" 
      required 
      />
        </div>
        <div className="form-group">
      <input type="text" className="form-control" id="projectOrganization"
      name='projectOrganization'
      value={projectOrganization} 
      onChange={onChange} placeholder="Name of Project Organization" 
      required 
      />
        </div>
        <div className="form-group">
      <label htmlFor='description'>Description of the Project</label>
      <textarea className="form-control" id="description"
      name='description'
      value={description} 
      onChange={(e) =>setDescription(e.target.value)}></textarea>
      </div>
        <div className="form-group">
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