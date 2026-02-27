import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Leaf, ArrowRight, ArrowLeft } from 'lucide-react'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name:'', email:'', password:'', age:'', gender:'female', weight:'', height:'', activityLevel:'moderate' })
  const [loading, setLoading] = useState(false)
  const set = (k,v) => setForm(p=>({...p,[k]:v}))

  const handleSubmit = (e) => {
    e.preventDefault(); setLoading(true)
    setTimeout(() => { register(form); navigate('/dashboard') }, 700)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-glow">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-slate-900">NutriSense</span>
        </div>

        <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-8">
          {/* Steps indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1,2].map(s => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step>=s ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{s}</div>
                <p className={`text-xs font-medium ${step===s?'text-brand-600':'text-slate-400'}`}>{s===1?'Account':'Health Profile'}</p>
                {s<2 && <div className={`flex-1 h-0.5 rounded ${step>s?'bg-brand-400':'bg-slate-100'}`}/>}
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">
            {step===1 ? 'Create your account' : 'Your health profile'}
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            {step===1 ? 'Start your nutrition journey today' : 'This helps us personalize your RDA targets'}
          </p>

          <form onSubmit={step===1 ? (e)=>{e.preventDefault(); setStep(2)} : handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <input className="input" required placeholder="Priya Sharma" value={form.name} onChange={e=>set('name',e.target.value)}/></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input type="email" className="input" required placeholder="you@email.com" value={form.email} onChange={e=>set('email',e.target.value)}/></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <input type="password" className="input" required placeholder="Min 6 characters" minLength={6} value={form.password} onChange={e=>set('password',e.target.value)}/></div>
                <button type="submit" className="btn-primary w-full py-3 justify-center">Continue <ArrowRight className="w-4 h-4"/></button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Age</label>
                    <input type="number" className="input" required placeholder="14" min="2" max="120" value={form.age} onChange={e=>set('age',e.target.value)}/></div>
                  <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Gender</label>
                    <select className="select" value={form.gender} onChange={e=>set('gender',e.target.value)}>
                      <option value="female">Female</option><option value="male">Male</option><option value="other">Other</option>
                    </select></div>
                  <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Weight (kg)</label>
                    <input type="number" className="input" placeholder="48" value={form.weight} onChange={e=>set('weight',e.target.value)}/></div>
                  <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Height (cm)</label>
                    <input type="number" className="input" placeholder="158" value={form.height} onChange={e=>set('height',e.target.value)}/></div>
                </div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Activity Level</label>
                  <select className="select" value={form.activityLevel} onChange={e=>set('activityLevel',e.target.value)}>
                    <option value="sedentary">Sedentary</option><option value="light">Light (1–3 days/week)</option>
                    <option value="moderate">Moderate (3–5 days/week)</option><option value="active">Active (6–7 days/week)</option>
                  </select></div>
                <div className="flex gap-3">
                  <button type="button" onClick={()=>setStep(1)} className="btn-secondary flex-1 py-3 justify-center"><ArrowLeft className="w-4 h-4"/> Back</button>
                  <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 justify-center">
                    {loading ? 'Creating…' : 'Create Account'}
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="text-center text-sm text-slate-400 mt-5">
            Already have an account? <Link to="/login" className="text-brand-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
