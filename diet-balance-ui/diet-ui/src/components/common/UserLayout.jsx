import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useDiet } from '../../context/DietContext'
import { LayoutDashboard, UtensilsCrossed, BarChart3, Sparkles, History, User, LogOut, Leaf, Bell } from 'lucide-react'

const LINKS = [
  { to:'/dashboard',       icon:LayoutDashboard, label:'Dashboard' },
  { to:'/log-food',        icon:UtensilsCrossed, label:'Log Food' },
  { to:'/report',          icon:BarChart3,        label:'Nutrient Report' },
  { to:'/recommendations', icon:Sparkles,         label:'Recommendations' },
  { to:'/history',         icon:History,          label:'History' },
  { to:'/profile',         icon:User,             label:'Profile' },
]

export default function UserLayout() {
  const { user, logout } = useAuth()
  const { deficiencies } = useDiet()
  const navigate = useNavigate()

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-100 flex flex-col h-full">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-glow">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-slate-900 leading-tight text-base">NutriSense</p>
              <p className="text-[10px] text-slate-400 font-body tracking-wide uppercase">Diet Balance</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {LINKS.map(({ to, icon:Icon, label }) => (
            <NavLink key={to} to={to} end={to==='/dashboard'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
              {label==='Recommendations' && deficiencies.length > 0 && (
                <span className="ml-auto w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {deficiencies.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {user?.name?.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/login') }}
            className="nav-link w-full text-red-500 hover:bg-red-50 hover:text-red-600">
            <LogOut className="w-4 h-4" /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="glass border-b border-slate-100 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="font-display font-bold text-slate-800 text-lg leading-tight">
              {new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})}
            </p>
            <p className="text-xs text-slate-400 font-body">Track today's nutrition</p>
          </div>
          <div className="flex items-center gap-3">
            {deficiencies.length > 0 && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-3 py-1.5">
                <Bell className="w-3.5 h-3.5 text-red-500 animate-pulse-soft" />
                <span className="text-xs font-semibold text-red-600">{deficiencies.length} deficiencie{deficiencies.length>1?'s':''} detected</span>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
