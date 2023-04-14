import {Link} from 'react-router-dom'

function ProjectItem({project}) {
  
  return (
    <div className='project'>
      <div>{project.projectName}</div>
      <div>{project.projectDescription}</div>
      <div>{new Date(project.createdAt).toLocaleString('en-us')}</div>
      <div className={`status status-${project.projectStatus}`}>{project.projectStatus}</div>
      <Link to={`/project/${project._id}`} className='btn btn-reverse btn-sm'>View</Link> 
    </div>
  )
}
export default ProjectItem