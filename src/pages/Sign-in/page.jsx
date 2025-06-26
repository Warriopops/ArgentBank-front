import './Sign-in.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')

  try {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      const token = data.body.token
      localStorage.setItem('token', token)
      const profileResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const profileData = await profileResponse.json()

      if (profileResponse.ok) {
        localStorage.setItem('userName', profileData.body.firstName)
        window.location.href = '/user'
      } else {
        setError(profileData.message || 'Failed to fetch user profile')
      }
    } else {
      setError(data.message || 'Login failed')
    }
  } catch (err) {
    console.error('Erreur fetch:', err)
    setError('Erreur réseau ou serveur indisponible')
  }
}

  return (
    <main className="main-login">
      <section className='bg-dark'>
        <div className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} className='icon' />
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
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