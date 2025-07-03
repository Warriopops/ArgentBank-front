import './Sign-in.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { login } from "../../actions/login.action"; 
import { useDispatch } from 'react-redux';


function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await dispatch(login({ email, password })).unwrap();
      window.location.href = "/user"; 
    } catch (err) {
        setError(err.message || String(err));
    }
  };



  return (
    <main className="main-login">
      <section className='bg-dark'>
        <div className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} className='icon' />
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Username</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default SignIn;