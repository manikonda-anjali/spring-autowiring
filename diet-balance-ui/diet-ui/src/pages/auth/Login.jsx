import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Leaf, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email:'demo@nutrisense.com', password:'Demo@123' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const DEMO_ACCOUNTS = [
    { label:'User Demo',  email:'demo@nutrisense.com',  password:'Demo@123',  color:'brand' },
    { label:'Child Demo', email:'child@nutrisense.com', password:'Child@123', color:'purple' },
    { label:'Admin',      email:'admin@nutrisense.com', password:'Admin@123', color:'slate' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault(); setLoading(true); setError('')
    setTimeout(() => {
      try {
        const user = login(form.email, form.password)
        navigate(user.role === 'admin' ? '/admin' : '/dashboard')
      } catch(err) { setError(err.message) }
      finally { setLoading(false) }
    }, 600)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          {['🥑','🥦','🍊','🐟','🥚','🫐','🥕','🍋'].map((emoji, i) => (
            <span key={i} className="absolute text-5xl select-none animate-float"
              style={{ left:`${10+i*12}%`, top:`${15+((i*37)%70)}%`, animationDelay:`${i*0.4}s`, opacity:0.6 }}>
              {emoji}
            </span>
          ))}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-xl">NutriSense</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white leading-tight mb-6">
            Eat smart.<br />Live healthy.<br />Thrive.
          </h1>
          <p className="text-brand-200 text-lg leading-relaxed max-w-sm">
            AI-powered nutrient analysis that detects deficiencies before they affect your health — designed especially for children & adolescents.
          </p>
        </div>
        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-4">
            {[['98%','Accuracy'],['20+','Nutrients tracked'],['WHO','RDA Standards']].map(([v,l]) => (
              <div key={l} className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="font-display text-2xl font-bold text-white">{v}</p>
                <p className="text-brand-200 text-xs mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md animate-fade-in">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Leaf className="w-6 h-6 text-brand-600" />
            <span className="font-display font-bold text-xl text-slate-800">NutriSense</span>
          </div>

          <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Sign in</h2>
          <p className="text-slate-400 text-sm mb-8">Welcome back — your nutrition journey continues</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input type="email" required className="input" placeholder="you@email.com"
                value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw?'text':'password'} required className="input pr-11" placeholder="••••••••"
                  value={form.password} onChange={e => setForm(p=>({...p,password:e.target.value}))} />
                <button type="button" onClick={()=>setShowPw(v=>!v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 justify-center text-base mt-2">
              {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Signing in…</span>
                : <span className="flex items-center gap-2">Sign In <ArrowRight className="w-4 h-4"/></span>}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            No account? <Link to="/register" className="text-brand-600 font-semibold hover:underline">Create one free</Link>
          </p>

          {/* Demo accounts */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center mb-3 font-medium uppercase tracking-wide">Quick Demo Access</p>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map(a => (
                <button key={a.email} type="button"
                  onClick={() => setForm({ email:a.email, password:a.password })}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50 transition-all text-sm group">
                  <span className="font-medium text-slate-700">{a.label}</span>
                  <span className="text-slate-400 font-mono text-xs group-hover:text-brand-600">{a.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
