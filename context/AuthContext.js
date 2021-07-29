import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '../config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const router = useRouter()

  useEffect(() => checkUserLoggedIn(), [])


  const login = async ({ username, password }) => {
    const res = await fetch(`https://ahara.example.com/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      setUser({user: "ok"})
      router.push('/home')
    } else {
      setError(data.message)
      setError(null)
    }
  }

  const logout = async () => {
    const res = await fetch(`https://ahara.example.com/api/logout`, {
      method: 'POST',
    })

    if (res.ok) {
      setUser(null)
      router.push('/')
    }
  }

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`https://ahara.example.com/api/user`)
    res.json()

    if (res.ok) {
      setUser({user: true})
    } else {
        console.log(user)
      setUser(null)
      router.push("/")
    }
  }

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext