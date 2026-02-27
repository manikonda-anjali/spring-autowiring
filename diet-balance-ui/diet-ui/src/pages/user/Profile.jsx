import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useDiet } from '../../context/DietContext'
import { User, Activity } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const { score, deficiencies } = useDiet()
  const [form, setForm] = useState({ name:user?.name||'', age:user?.profile?.age||'', gender:user?.profile?.gender||'female', weight:user?.profile?.weight||'', height:user?.profile?.height||'', activityLevel:user?.profile?.activityLevel||'moderate' })
  const [pw, setPw] = useState({ current:'', new:'', confirm:'' })
  const set = (k,v) => setForm(p=>({...p,[k]:v}))

  const bmi = form.weight && form.height ? (form.weight / ((form.height/100)**2)).toFixed(1) : null
  const bmiStatus = bmi ? bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese' : null

  const handleSave = (e) => { e.preventDefault(); updateProfile({ name:form.name, profile:{ age:Number(form.age), gender:form.gender, weight:Number(form.weight), height:Number(form.height), activityLevel:form.activityLevel } }) }
  const handlePw = (e) => { e.preventDefault(); if(pw.new!==pw.confirm){toast.error('Passwords do not match');return} toast.success('Password updated (demo)'); setPw({current:'',new:'',confirm:''}) }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in space-y-6">
      <h1 className="font-display text-2xl font-bold text-slate-900">Profile Settings</h1>

      {/* User card */}
      <div className="card flex items-center gap-6">
        <div className="w-20 h-20 bg-gradient-to-br from-brand-400 to-brand-700 rounded-2xl flex items-center justify-center text-white font-display text-3xl font-bold flex-shrink-0 shadow-glow">
          {user?.name?.charAt(0)}
        </div>
        <div className="flex-1">
          <h2 className="font-display text-xl font-bold text-slate-900">{user?.name}</h2>
          <p className="text-slate-400 text-sm">{user?.email}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="badge bg-brand-100 text-brand-700 capitalize">{user?.role}</span>
            <span className="badge bg-slate-100 text-slate-600">Age {user?.profile?.age} · {user?.profile?.gender}</span>
            {bmi && <span className={`badge ${bmiStatus==='Normal'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>BMI {bmi} ({bmiStatus})</span>}
          </div>
        </div>
        <div className="text-center hidden sm:block">
          <div className={`font-display text-3xl font-bold ${score>=75?'text-emerald-600':score>=50?'text-amber-500':'text-red-500'}`}>{score}</div>
          <p className="text-xs text-slate-400">Diet Score</p>
        </div>
      </div>

      {/* Health stats */}
      {deficiencies.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-sm font-semibold text-red-700 mb-2">⚠️ Active Deficiencies</p>
          <div className="flex flex-wrap gap-1.5">
            {deficiencies.map(d => <span key={d} className="badge-deficient">{d}</span>)}
          </div>
        </div>
      )}

      {/* Edit profile */}
      <form onSubmit={handleSave} className="card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <User className="w-4 h-4 text-brand-600"/>
          <p className="font-display font-bold text-slate-800">Personal Information</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
            <input className="input" value={form.name} onChange={e=>set('name',e.target.value)}/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Age</label>
            <input type="number" className="input" value={form.age} onChange={e=>set('age',e.target.value)}/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Gender</label>
            <select className="select" value={form.gender} onChange={e=>set('gender',e.target.value)}>
              <option value="female">Female</option><option value="male">Male</option><option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Weight (kg)</label>
            <input type="number" className="input" value={form.weight} onChange={e=>set('weight',e.target.value)}/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Height (cm)</label>
            <input type="number" className="input" value={form.height} onChange={e=>set('height',e.target.value)}/>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Activity Level</label>
            <select className="select" value={form.activityLevel} onChange={e=>set('activityLevel',e.target.value)}>
              <option value="sedentary">Sedentary</option><option value="light">Light (1–3 days/week)</option>
              <option value="moderate">Moderate (3–5 days/week)</option><option value="active">Active (6–7 days/week)</option>
              <option value="very_active">Very Active</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-primary">Save Changes</button>
      </form>

      {/* Change password */}
      <form onSubmit={handlePw} className="card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-brand-600"/>
          <p className="font-display font-bold text-slate-800">Change Password</p>
        </div>
        {[['Current Password','current'],['New Password','new'],['Confirm Password','confirm']].map(([label,key])=>(
          <div key={key}>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
            <input type="password" className="input" value={pw[key]} onChange={e=>setPw(p=>({...p,[key]:e.target.value}))} placeholder="••••••••"/>
          </div>
        ))}
        <button type="submit" className="btn-secondary">Update Password</button>
      </form>
    </div>
  )
}
