// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null)

  useEffect(() => {
    const storedRole = localStorage.getItem('role')
    if (storedRole) setRole(storedRole)
  }, [role])

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {return useContext(AuthContext)};
