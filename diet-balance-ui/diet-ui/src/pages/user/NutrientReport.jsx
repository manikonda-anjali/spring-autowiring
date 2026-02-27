import { useState } from 'react'
import { useDiet } from '../../context/DietContext'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts'
import { RADAR_KEYS, NUTRIENT_META } from '../../data/mockData'
import { statusColor, statusBg, progressColor } from '../../utils/nutrients'

export default function NutrientReport() {
  const { rdaComparison, score, totals } = useDiet()
  const [view, setView] = useState('micro')

  const radarData = RADAR_KEYS.map(k => {
    const e = rdaComparison.find(r=>r.nutrient===k)
    return { nutrient: NUTRIENT_META[k]?.label.replace('Vitamin ','Vit '), value: Math.min(e?.pct||0,130) }
  })

  const defData = rdaComparison.filter(r=>r.status!=='adequate'&&r.status!=='excess').sort((a,b)=>a.pct-b.pct).slice(0,8)

  const macroKeys = ['calories','protein','carbs','fats','fiber']
  const microKeys = ['iron','calcium','vitaminD','vitaminC','vitaminA','vitaminB12','zinc','folate','magnesium','potassium','iodine']

  const displayKeys = view==='macro'
    ? rdaComparison.filter(r=>['calories','protein'].includes(r.nutrient))
    : rdaComparison.filter(r=>microKeys.includes(r.nutrient))

  return (
    <div className="max-w-6xl mx-auto animate-fade-in space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Nutrient Report</h1>
        <p className="text-slate-400 text-sm mt-0.5">Today's complete nutrient analysis vs your personalised RDA</p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label:'Diet Score', value:score, unit:'/100', color:score>=75?'text-emerald-600':score>=50?'text-amber-500':'text-red-500' },
          { label:'Adequate', value:rdaComparison.filter(r=>r.status==='adequate').length, unit:'nutrients', color:'text-emerald-600' },
          { label:'Deficient', value:rdaComparison.filter(r=>r.status==='deficient').length, unit:'critical', color:'text-red-500' },
          { label:'Low', value:rdaComparison.filter(r=>r.status==='low').length, unit:'need attention', color:'text-amber-500' },
        ].map(s => (
          <div key={s.label} className="card text-center">
            <p className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">{s.label}</p>
            <p className="text-xs text-slate-400">{s.unit}</p>
          </div>
        ))}
      </div>

      {/* Status legend */}
      <div className="flex flex-wrap gap-2">
        {[['deficient','< 50% RDA'],['low','50–75%'],['adequate','75–125%'],['excess','> 125%']].map(([s,l]) => (
          <span key={s} className={`badge ${statusBg(s)}`}>{l} — {s}</span>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar */}
        <div className="card">
          <p className="section-title">Micronutrient Radar</p>
          <p className="section-sub">% of RDA met for 8 key nutrients</p>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0"/>
              <PolarAngleAxis dataKey="nutrient" tick={{ fontSize:10, fill:'#94a3b8', fontFamily:'DM Sans' }}/>
              <PolarRadiusAxis angle={30} domain={[0,100]} tick={{ fontSize:9, fill:'#cbd5e1' }}/>
              <Radar dataKey="value" stroke="#0d9488" fill="#0d9488" fillOpacity={0.2} strokeWidth={2}/>
              <Tooltip formatter={v=>[`${v.toFixed(0)}%`,'% RDA']} contentStyle={{fontFamily:'DM Sans',fontSize:12,borderRadius:10}}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart of deficiencies */}
        <div className="card">
          <p className="section-title">Deficiency Overview</p>
          <p className="section-sub">Nutrients below recommended levels</p>
          {defData.length === 0 ? (
            <div className="flex items-center justify-center h-52 text-slate-400 text-sm">
              🎉 All nutrients are at adequate levels!
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={defData} layout="vertical" margin={{ left:10, right:20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false}/>
                <XAxis type="number" domain={[0,100]} tick={{ fontSize:10 }} unit="%"/>
                <YAxis type="category" dataKey="label" tick={{ fontSize:10, fill:'#64748b' }} width={80}/>
                <Tooltip formatter={v=>[`${v.toFixed(0)}%`,'% RDA']} contentStyle={{fontFamily:'DM Sans',fontSize:12,borderRadius:10}}/>
                <Bar dataKey="pct" radius={[0,4,4,0]}>
                  {defData.map((d,i) => <Cell key={i} fill={statusColor(d.status)}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Detailed cards */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <p className="section-title mb-0">Detailed Breakdown</p>
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            {['macro','micro'].map(t=>(
              <button key={t} onClick={()=>setView(t)}
                className={`px-4 py-1.5 text-xs rounded-lg font-semibold capitalize transition-all ${view===t?'bg-white text-brand-700 shadow-sm':'text-slate-500'}`}>
                {t}nutrients
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayKeys.map(r => (
            <div key={r.nutrient} className="bg-white rounded-xl border border-slate-100 p-4 hover:shadow-card transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">{r.label}</span>
                <span className={`badge ${statusBg(r.status)}`}>{r.status}</span>
              </div>
              <div className="flex items-end gap-1 mb-2">
                <span className="font-display text-xl font-bold text-slate-900">{r.consumed.toFixed(1)}</span>
                <span className="text-xs text-slate-400 mb-0.5">/ {r.rda} {r.unit}</span>
              </div>
              <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className={`h-full rounded-full progress-bar ${progressColor(r.pct)}`} style={{width:`${Math.min(r.pct,100)}%`}}/>
              </div>
              <p className="text-[10px] text-right text-slate-400 mt-1">{r.pct.toFixed(0)}% of goal</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full table */}
      <div className="card overflow-hidden p-0">
        <div className="px-6 py-4 border-b border-slate-100">
          <p className="font-display font-bold text-slate-800">Complete Nutrient Table</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{['Nutrient','Consumed','RDA','% Met','Status'].map(h=>(
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {rdaComparison.map(r => (
                <tr key={r.nutrient} className="table-row border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3 font-medium text-slate-800">{r.label}</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">{r.consumed.toFixed(1)} {r.unit}</td>
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs">{r.rda} {r.unit}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5 w-16 overflow-hidden">
                        <div className={`h-full rounded-full ${progressColor(r.pct)}`} style={{width:`${Math.min(r.pct,100)}%`}}/>
                      </div>
                      <span className="text-xs font-semibold text-slate-600 font-mono">{r.pct.toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className={`badge ${statusBg(r.status)}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
