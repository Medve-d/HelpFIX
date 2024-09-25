import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { useNavigate } from 'react-router-dom' 
import PhoneInput from 'react-phone-input-2'


const SignupPrstatire = () => {
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [ville, setVille] = useState('')
  const [password, setPassword] = useState('')
  const [birthday, setBirthDate] = useState('')
  const [name, setName] = useState('')
  const [familyName, setfamilyName] = useState('')
  const [role] = useState('prestataire')
  const [membershipStatus] = useState('none')
  
  const {signup, error, isLoading} = useSignup()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password, number, ville, birthday, name, familyName, role, membershipStatus)
  }
  const handleLoginNavigation = () => {
    navigate('/Login')
  }

  return (
    <div className="phone-input-container">
        
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up Prestataire</h3>

      <label>Prénom</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />
      <label>Nom</label>
      <input 
        type="text" 
        onChange={(e) => setfamilyName(e.target.value)} 
        value={familyName} 
      />
      
      <label>Email address</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

        <label>Ville</label>
        <select 
          onChange={(e) => setVille(e.target.value)} 
          value={ville} 
          className="input-style"
        >
          <option value="">Select your city</option>
          <option value="Paris">Paris</option>
          <option value="Marseille">Marseille</option>
          <option value="Lyon">Lyon</option>
          <option value="Toulouse">Toulouse</option>
          <option value="Nice">Nice</option>
          <option value="Nantes">Nantes</option>
          <option value="Strasbourg">Strasbourg</option>
        </select>

      <PhoneInput
       country={"fr"}
        value={number}
        onChange={(value) => setNumber(value)}
       />
       
      <label>Date de naissance</label>
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

export default SignupPrstatire