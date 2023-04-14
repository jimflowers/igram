import axios from 'axios'

const API_URL='/api/projects/'

// Create new project
const createProject = async(projectData, token) =>{
  console.log(projectData)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, projectData, config)

  return response.data
}

const projectService = {
  createProject,
}

export default projectService