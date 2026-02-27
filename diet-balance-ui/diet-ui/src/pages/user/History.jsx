import { useState } from 'react'
import { WEEKLY_DATA } from '../../data/mockData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, BarChart, Bar } from 'recharts'

const METRICS = [
  { key:'calories', label:'Calories', unit:'kcal', color:'#f97316', rdaLine:2000 },
  { key:'protein',  label:'Protein',  unit:'g',    color:'#0d9488', rdaLine:46 },
  { key:'iron',     label:'Iron',     unit:'mg',   color:'#8b5cf6', rdaLine:15 },
  { key:'calcium',  label:'Calcium',  unit:'mg',   color:'#3b82f6', rdaLine:1300 },
  { key:'vitaminD', label:'Vitamin D',unit:'mcg',  color:'#f59e0b', rdaLine:15 },
]

export default function History() {
  const [metric, setMetric] = useState('calories')
  const selected = METRICS.find(m => m.key === metric)
  const chartData = WEEKLY_DATA.map(d => ({
    ...d,
    rda: selected.rdaLine,
    value: d[metric] || 0
  }))

  const scores = WEEKLY_DATA.filter(d=>d.score>0)
  const avgScore = scores.length ? Math.round(scores.reduce((s,d)=>s+d.score,0)/scores.length) : 0

  return (
    <div className="max-w-5xl mx-auto animate-fade-in space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Intake History</h1>
        <p className="text-slate-400 text-sm mt-0.5">Track your nutritional progress over the past week</p>
      </div>

      {/* Week summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label:'Avg Diet Score', value:avgScore, unit:'/100', color:'text-brand-600' },
          { label:'Days Tracked', value:scores.length, unit:'this week', color:'text-slate-800' },
          { label:'Best Score', value:Math.max(...scores.map(d=>d.score)), unit:'out of 100', color:'text-emerald-600' },
          { label:'Streak', value:'5', unit:'days logged', color:'text-orange-500' },
        ].map(s => (
          <div key={s.label} className="card text-center">
            <p className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs font-medium text-slate-600 mt-0.5">{s.label}</p>
            <p className="text-[10px] text-slate-400">{s.unit}</p>
          </div>
        ))}
      </div>

      {/* Diet score trend */}
      <div className="card">
        <p className="section-title">Weekly Diet Score</p>
        <p className="section-sub">Your overall nutrition quality score per day</p>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={WEEKLY_DATA}>
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="day" tick={{fontSize:11,fill:'#94a3b8'}}/>
            <YAxis domain={[0,100]} tick={{fontSize:11,fill:'#94a3b8'}}/>
            <Tooltip contentStyle={{fontFamily:'DM Sans',fontSize:12,borderRadius:10,border:'1px solid #e2e8f0'}}/>
            <Area type="monotone" dataKey="score" name="Score" stroke="#0d9488" strokeWidth={2.5} fill="url(#scoreGrad)" dot={{fill:'#0d9488',r:4}}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Nutrient trend with selector */}
      <div className="card">
        <div className="flex items-center gap-4 mb-5 flex-wrap">
          <div>
            <p className="section-title mb-0">{selected.label} Trend</p>
            <p className="text-xs text-slate-400">Daily consumption vs recommended ({selected.rdaLine} {selected.unit})</p>
          </div>
          <div className="flex gap-1.5 flex-wrap ml-auto">
            {METRICS.map(m => (
              <button key={m.key} onClick={()=>setMetric(m.key)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${metric===m.key?'text-white shadow-sm':'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                style={metric===m.key?{backgroundColor:m.color}:{}}>
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
            <XAxis dataKey="day" tick={{fontSize:11,fill:'#94a3b8'}}/>
            <YAxis tick={{fontSize:11,fill:'#94a3b8'}}/>
            <Tooltip contentStyle={{fontFamily:'DM Sans',fontSize:12,borderRadius:10,border:'1px solid #e2e8f0'}} formatter={(v,n)=>[`${v} ${selected.unit}`,n]}/>
            <Legend/>
            <Bar dataKey="value" name="Consumed" fill={selected.color} radius={[4,4,0,0]} fillOpacity={0.85}/>
            <Line dataKey="rda" name="RDA Target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} type="monotone"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Daily summary table */}
      <div className="card overflow-hidden p-0">
        <div className="px-6 py-4 border-b border-slate-100">
          <p className="font-display font-bold text-slate-800">Daily Summary</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>{['Day','Calories','Protein','Iron','Calcium','Vit D','Score'].map(h=>(
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {WEEKLY_DATA.map((d,i) => (
                <tr key={d.day} className="table-row border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3 font-semibold text-slate-800">{d.day}</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">{d.calories||'—'}</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">{d.protein||'—'}g</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">{d.iron||'—'}mg</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">{d.calcium||'—'}mg</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">{d.vitaminD||'—'}mcg</td>
                  <td className="px-4 py-3">
                    {d.score > 0 ? (
                      <span className={`font-bold text-sm ${d.score>=75?'text-emerald-600':d.score>=50?'text-amber-500':'text-red-500'}`}>{d.score}</span>
                    ) : <span className="text-slate-300 text-xs">No data</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
