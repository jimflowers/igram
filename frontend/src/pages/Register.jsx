import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
import { FaUser } from "react-icons/fa"
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner.jsx'

function Register() {
  const [formData, setFormData]= useState({
    name:'',
    organization:'',
    email:'',
    password:'',
    password2:''
  })

  const {name, organization, email, password, password2}=formData

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const {user, isLoading, isError, isSuccess, message} = useSelector(state =>state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
// redirect when logged in
    if( isSuccess || user ){
      toast.success('Success')
      navigate('/')
    }

  dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])
 
  const onChange =(e) =>{
    setFormData((prevState)=>({...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) =>{
    e.preventDefault()

    if (password !== password2){
      toast.error('Passwords do not match')
    } else {
      const userData= {name, email, password, organization}

      dispatch(register(userData))
    }

  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
    <section className="heading">
<h1>
  <FaUser /> Register
</h1>
<p>Please create an account</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
      <input type="text" className="form-control" id="name"
      name='name'
      value={name} 
      onChange={onChange} placeholder="Your Name" 
      required 
      />
        </div>
        <div className="form-group">
      <input type="text" className="form-control" id="organization"
      name='organization'
      value={organization} 
      onChange={onChange} placeholder="Name of Organization" 
      required 
      />
        </div>
        <div className="form-group">
      <input type="email" className="form-control" id="email"
      name='email'
      value={email} 
      onChange={onChange} placeholder="Your email" 
      required
      />
        </div>
        <div className="form-group">
      <input type="password" 
      autoComplete="new-password"
      className="form-control" id="password"
      name='password'
      value={password} 
      onChange={onChange} placeholder="Enter Password" 
      required />
        </div>
        <div className="form-group">
        <input type="password" 
        autoComplete="new-password"
        className="form-control" id="password2"
        name='password2'
        value={password2} 
        onChange={onChange} placeholder="Confirm Password" 
        required
        />
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

export default Register