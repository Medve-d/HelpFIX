import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { useNavigate } from 'react-router-dom' 
import PhoneInput from 'react-phone-input-2'


const Signup = () => {
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [birthday, setBirthDate] = useState('')
  const [name, setName] = useState('')
  const [familyName, setfamilyName] = useState('')
  
  const {signup, error, isLoading} = useSignup()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password, number, birthday, name, familyName)
  }
  const handleLoginNavigation = () => {
    navigate('/Login')
  }

  return (
    <div className="phone-input-container">
        
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Name</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />
      <label>Family Name</label>
      <input 
        type="text" 
        onChange={(e) => setfamilyName(e.target.value)} 
        value={familyName} 
      />
      
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
      <PhoneInput
       country={"fr"}
        value={number}
        onChange={(value) => setNumber(value)}
       />
       
      <label>Birthday</label>
      <input 
        type="date" 
        onChange={(e) => setBirthDate(e.target.value)} 
        value={birthday} 
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