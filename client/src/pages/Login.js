import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)

  }

  const handleSignupNavigation = () => {
    navigate('/signup')
  }

  return (
    <div>
            <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
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

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
      
      
    </form>
      
      <p className="signup-text">
        Don't have an account? <span onClick={handleSignupNavigation} className="signup-link">Sign up</span>
      </p>
    </div>
  )
}

export default Login
