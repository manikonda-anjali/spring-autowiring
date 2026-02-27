import { useState } from 'react'
import { DEFICIENCY_ANALYTICS, MOCK_USERS } from '../../data/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts'
import { Send, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'

const COLORS = ['#EF4444','#F97316','#F59E0B','#10B981','#3B82F6','#8B5CF6','#EC4899','#14B8A6']

const ageGroups = [
  { name:'4–8 yrs',   value: MOCK_USERS.filter(u=>u.age>=4&&u.age<=8).length },
  { name:'9–13 yrs',  value: MOCK_USERS.filter(u=>u.age>=9&&u.age<=13).length },
  { name:'14–18 yrs', value: MOCK_USERS.filter(u=>u.age>=14&&u.age<=18).length },
]

export default function DeficiencyReports() {
  const [alertMsg, setAlertMsg] = useState('')

  const handleSend = () => {
    if (!alertMsg.trim()) return toast.error('Enter a message first')
    toast.success('Alert sent to all users with deficiencies!')
    setAlertMsg('')
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Deficiency Reports</h1>
        <p className="text-slate-400 text-sm mt-0.5">Population-level nutrient deficiency analytics</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:'Most Common', value:'Iron', sub:'52.5% of users', color:'text-red-500' },
          { label:'Avg Severity', value:'Moderate', sub:'platform-wide', color:'text-amber-500' },
          { label:'Intervention Needed', value:`${MOCK_USERS.filter(u=>u.score<50).length}`, sub:'users below 50 score', color:'text-red-600' },
        ].map(s=>(
          <div key={s.label} className="card text-center">
            <p className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm font-semibold text-slate-700 mt-0.5">{s.label}</p>
            <p className="text-xs text-slate-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="card lg:col-span-2">
          <p className="section-title">Deficiency Prevalence</p>
          <p className="section-sub">Number of users affected per nutrient (last 30 days)</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={DEFICIENCY_ANALYTICS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
              <XAxis dataKey="nutrient" tick={{fontSize:10,fill:'#94a3b8'}}/>
              <YAxis tick={{fontSize:10,fill:'#94a3b8'}}/>
              <Tooltip contentStyle={{fontFamily:'DM Sans',fontSize:12,borderRadius:10,border:'1px solid #e2e8f0'}} formatter={(v)=>[`${v} users`,'']}/>
              <Bar dataKey="count" name="Users Affected" radius={[6,6,0,0]}>
                {DEFICIENCY_ANALYTICS.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Age group pie */}
        <div className="card">
          <p className="section-title">By Age Group</p>
          <p className="section-sub">User distribution</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={ageGroups} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={4}>
                {ageGroups.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}
              </Pie>
              <Tooltip contentStyle={{fontFamily:'DM Sans',fontSize:12,borderRadius:10}}/>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize:11,fontFamily:'DM Sans'}}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detail table */}
      <div className="card overflow-hidden p-0">
        <div className="px-6 py-4 border-b border-slate-100"><p className="font-display font-bold text-slate-800">Detailed Breakdown</p></div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>{['Nutrient','Users Affected','% of Total','Severity','Action'].map(h=>(
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {DEFICIENCY_ANALYTICS.map((item,i) => (
              <tr key={item.nutrient} className="table-row border-b border-slate-50 last:border-0">
                <td className="px-4 py-3 font-semibold text-slate-800">{item.nutrient}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">{item.count}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-slate-100 rounded-full h-1.5">
                      <div className="h-full rounded-full" style={{width:`${item.percentage}%`,backgroundColor:COLORS[i%COLORS.length]}}/>
                    </div>
                    <span className="text-xs font-mono">{item.percentage}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={item.percentage>40?'badge-deficient':item.percentage>25?'badge-low':'badge-adequate'}>
                    {item.percentage>40?'High':item.percentage>25?'Moderate':'Low'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={()=>setAlertMsg(`Attention: Low ${item.nutrient} detected in your system. Please check your diet.`)}
                    className="text-xs text-brand-600 hover:underline font-medium">Draft Alert</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Send alert */}
      <div className="card border-l-4 border-amber-400">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-amber-500"/>
          <p className="font-display font-bold text-slate-800">Send Health Intervention Alert</p>
        </div>
        <p className="text-sm text-slate-400 mb-4">Broadcast to all users with detected deficiencies</p>
        <textarea className="input min-h-[90px] resize-none mb-3 font-body" placeholder="Type your health alert message…" value={alertMsg} onChange={e=>setAlertMsg(e.target.value)}/>
        <button onClick={handleSend} className="btn-primary"><Send className="w-4 h-4"/>Send Alert to Affected Users</button>
      </div>
    </div>
  )
}
