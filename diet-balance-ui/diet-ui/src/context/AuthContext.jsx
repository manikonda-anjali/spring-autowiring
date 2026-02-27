import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

const MOCK_USERS = {
  'admin@nutrisense.com': { id:'a1', name:'Dr. Admin', email:'admin@nutrisense.com', role:'admin', profile:{ age:35, gender:'male' } },
  'demo@nutrisense.com':  { id:'u1', name:'Priya Sharma', email:'demo@nutrisense.com', role:'user', profile:{ age:14, gender:'female', weight:48, height:158, activityLevel:'light' } },
  'child@nutrisense.com': { id:'u2', name:'Arjun Mehta',  email:'child@nutrisense.com', role:'user', profile:{ age:11, gender:'male',   weight:35, height:140, activityLevel:'moderate' } },
}
const MOCK_PASSWORDS = { 'admin@nutrisense.com':'Admin@123', 'demo@nutrisense.com':'Demo@123', 'child@nutrisense.com':'Child@123' }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (email, password) => {
    const u = MOCK_USERS[email]
    if (!u || MOCK_PASSWORDS[email] !== password) throw new Error('Invalid credentials')
    setUser(u)
    toast.success(`Welcome back, ${u.name.split(' ')[0]}! 👋`)
    return u
  }

  const register = (data) => {
    const u = { id:'new_'+Date.now(), name:data.name, email:data.email, role:'user',
      profile:{ age:Number(data.age), gender:data.gender, weight:Number(data.weight), height:Number(data.height), activityLevel:data.activityLevel } }
    setUser(u)
    toast.success('Account created!')
    return u
  }

  const logout = () => { setUser(null); toast.success('Logged out') }
  const updateProfile = (data) => { setUser(u => ({ ...u, ...data, profile: { ...u.profile, ...data.profile } })); toast.success('Profile updated!') }

  return <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
