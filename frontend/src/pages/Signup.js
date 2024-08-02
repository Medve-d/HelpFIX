import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }
  const handleLoginNavigation = () => {
    navigate('/Login')
  }

  return (
    <div>
        
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
    
      
    <p className="signup-text">
    You have an account? <span onClick={handleLoginNavigation} className="signup-link">Log In</span>
    </p>
    </div>
  )
}

export default Signup