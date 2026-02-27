import { MOCK_USERS, DEFICIENCY_ANALYTICS, WEEKLY_DATA } from '../../data/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Legend } from 'recharts'
import { Users, Database, AlertTriangle, TrendingUp, Activity } from 'lucide-react'

const COLORS = ['#EF4444','#F97316','#F59E0B','#10B981','#3B82F6','#8B5CF6','#EC4899','#14B8A6']

export default function AdminDashboard() {
  const totalUsers = MOCK_USERS.length
  const avgScore = Math.round(MOCK_USERS.reduce((s,u)=>s+u.score,0)/totalUsers)
  const usersWithDef = MOCK_USERS.filter(u=>u.deficiencies.length>0).length

  const stats = [
    { label:'Total Users', value:totalUsers, sub:'registered', icon:Users, color:'text-brand-600', bg:'bg-brand-50' },
    { label:'Avg Diet Score', value:avgScore, sub:'platform avg', icon:TrendingUp, color:'text-emerald-600', bg:'bg-emerald-50' },
    { label:'Deficiency Cases', value:usersWithDef, sub:'need attention', icon:AlertTriangle, color:'text-red-500', bg:'bg-red-50' },
    { label:'Food Items', value:20, sub:'in database', icon:Database, color:'text-blue-500', bg:'bg-blue-50' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-400 text-sm mt-0.5">Platform overview and health analytics</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="card">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.color}`}/>
            </div>
            <p className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm font-semibold text-slate-700 mt-0.5">{s.label}</p>
            <p className="text-xs text-slate-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deficiency chart */}
        <div className="card">
          <p className="section-title">Top Nutrient Deficiencies</p>
          <p className="section-sub">Users affected across the platform (last 30 days)</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={DEFICIENCY_ANALYTICS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
              <XAxis dataKey="nutrient" tick={{fontSize:10,fill:'#94a3b8'}}/>
              <YAxis tick={{fontSize:10,fill:'#94a3b8'}}/>
              <Tooltip contentStyle={{fontFamily:'DM Sans',fontSize:12,borderRadius:10,border:'1px solid #e2e8f0'}}/>
              <Bar dataKey="count" name="Users Affected" radius={[6,6,0,0]}>
                {DEFICIENCY_ANALYTICS.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Platform score trend */}
        <div className="card">
          <p className="section-title">Platform Score Trend</p>
          <p className="section-sub">Weekly average diet quality scores</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={WEEKLY_DATA.filter(d=>d.score>0)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="day" tick={{fontSize:11,fill:'#94a3b8'}}/>
              <YAxis domain={[0,100]} tick={{fontSize:11,fill:'#94a3b8'}}/>
              <Tooltip contentStyle={{fontFamily:'DM Sans',fontSize:12,borderRadius:10,border:'1px solid #e2e8f0'}}/>
              <Line type="monotone" dataKey="score" name="Avg Score" stroke="#0d9488" strokeWidth={2.5} dot={{fill:'#0d9488',r:4}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent users with issues */}
      <div className="card">
        <p className="section-title">Users Requiring Attention</p>
        <p className="section-sub">Users with detected nutrient deficiencies</p>
        <div className="space-y-3">
          {MOCK_USERS.filter(u=>u.deficiencies.length>0).map(u => (
            <div key={u.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {u.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm">{u.name}</p>
                <p className="text-xs text-slate-400">Age {u.age} · {u.gender}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {u.deficiencies.slice(0,3).map(d=><span key={d} className="badge-deficient">{d}</span>)}
                {u.deficiencies.length>3 && <span className="badge bg-slate-100 text-slate-500">+{u.deficiencies.length-3}</span>}
              </div>
              <div className={`font-display font-bold text-lg ${u.score>=75?'text-emerald-600':u.score>=50?'text-amber-500':'text-red-500'}`}>{u.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
