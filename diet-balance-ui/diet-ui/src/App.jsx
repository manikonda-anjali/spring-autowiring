import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { DietProvider } from './context/DietContext'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import UserLayout from './components/common/UserLayout'
import AdminLayout from './components/common/AdminLayout'

import Dashboard from './pages/user/Dashboard'
import FoodLogger from './pages/user/FoodLogger'
import NutrientReport from './pages/user/NutrientReport'
import Recommendations from './pages/user/Recommendations'
import History from './pages/user/History'
import Profile from './pages/user/Profile'

import AdminDashboard from './pages/admin/AdminDashboard'
import FoodDatabase from './pages/admin/FoodDatabase'
import UserManagement from './pages/admin/UserManagement'
import DeficiencyReports from './pages/admin/DeficiencyReports'

function Guard({ children, role }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (role === 'admin' && user.role !== 'admin') return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/login"    element={user ? <Navigate to={user.role==='admin'?'/admin':'/dashboard'} replace/> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" replace/> : <Register />} />
      <Route path="/" element={<Navigate to={user ? (user.role==='admin'?'/admin':'/dashboard') : '/login'} replace />} />

      {/* USER */}
      <Route element={<Guard><DietProvider><UserLayout /></DietProvider></Guard>}>
        <Route path="/dashboard"      element={<Dashboard />} />
        <Route path="/log-food"       element={<FoodLogger />} />
        <Route path="/report"         element={<NutrientReport />} />
        <Route path="/recommendations"element={<Recommendations />} />
        <Route path="/history"        element={<History />} />
        <Route path="/profile"        element={<Profile />} />
      </Route>

      {/* ADMIN */}
      <Route element={<Guard role="admin"><AdminLayout /></Guard>}>
        <Route path="/admin"              element={<AdminDashboard />} />
        <Route path="/admin/foods"        element={<FoodDatabase />} />
        <Route path="/admin/users"        element={<UserManagement />} />
        <Route path="/admin/deficiencies" element={<DeficiencyReports />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
