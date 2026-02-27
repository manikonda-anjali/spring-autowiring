import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, Database, Users, AlertTriangle, LogOut, Leaf, ShieldCheck } from 'lucide-react'

const LINKS = [
  { to:'/admin',              icon:LayoutDashboard, label:'Dashboard',        end:true },
  { to:'/admin/foods',        icon:Database,         label:'Food Database' },
  { to:'/admin/users',        icon:Users,            label:'User Management' },
  { to:'/admin/deficiencies', icon:AlertTriangle,    label:'Deficiency Reports' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className="w-64 flex-shrink-0 bg-slate-900 flex flex-col h-full">
        <div className="px-6 py-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-white text-base">NutriSense</p>
              <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-brand-400" /><p className="text-[10px] text-brand-400 uppercase tracking-wide">Admin Panel</p></div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {LINKS.map(({ to, icon:Icon, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <Icon className="w-4 h-4 flex-shrink-0" /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-sm">{user?.name?.charAt(0)}</div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">Administrator</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/login') }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-all w-full">
            <LogOut className="w-4 h-4" /><span>Logout</span>
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <p className="font-display font-bold text-slate-800 text-lg">Admin Control Centre</p>
          <span className="badge bg-orange-100 text-orange-700">Administrator</span>
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50"><Outlet /></main>
      </div>
    </div>
  )
}
