import { Link } from 'react-router-dom'
import { useDiet } from '../../context/DietContext'
import { useAuth } from '../../context/AuthContext'
import { Flame, Drumstick, AlertTriangle, Plus, TrendingUp, Apple, ChevronRight } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { RADAR_KEYS, NUTRIENT_META } from '../../data/mockData'
import { progressColor, statusColor } from '../../utils/nutrients'

function ScoreRing({ score }) {
  const r = 52, circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 75 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444'
  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-36 h-36 -rotate-90 score-ring" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#f1f5f9" strokeWidth="10"/>
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={`${dash} ${circ}`}
          style={{transition:'stroke-dasharray 1s cubic-bezier(0.34,1.56,0.64,1)'}}/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold" style={{color}}>{score}</span>
        <span className="text-xs text-slate-400 font-body">/100</span>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const { logs, totals, rdaComparison, score, deficiencies } = useDiet()

  const radarData = RADAR_KEYS.map(k => {
    const entry = rdaComparison.find(r => r.nutrient === k)
    return { nutrient: NUTRIENT_META[k]?.label.replace('Vitamin ','Vit '), value: Math.min(entry?.pct || 0, 120) }
  })

  const mealGroups = ['breakfast','lunch','dinner','snack'].map(m => ({
    meal: m, items: logs.filter(l => l.mealType === m)
  })).filter(g => g.items.length > 0)

  const macros = [
    { label:'Calories', value:`${Math.round(totals.calories||0)}`, unit:'kcal', icon:Flame, color:'text-orange-500', bg:'bg-orange-50' },
    { label:'Protein',  value:`${Math.round(totals.protein||0)}`,  unit:'g',    icon:Drumstick, color:'text-brand-600', bg:'bg-brand-50' },
    { label:'Iron',     value:`${(totals.iron||0).toFixed(1)}`,     unit:'mg',   icon:TrendingUp, color:'text-purple-500', bg:'bg-purple-50' },
    { label:'Calcium',  value:`${Math.round(totals.calcium||0)}`,   unit:'mg',   icon:Apple, color:'text-blue-500', bg:'bg-blue-50' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Good {new Date().getHours()<12?'morning':'afternoon'}, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-slate-400 text-sm mt-0.5">Here's your nutrition snapshot for today</p>
        </div>
        <Link to="/log-food" className="btn-primary"><Plus className="w-4 h-4"/>Log Food</Link>
      </div>

      {/* Deficiency alert */}
      {deficiencies.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4 flex items-center gap-4 animate-slide-up">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 alert-pulse">
            <AlertTriangle className="w-5 h-5 text-red-500"/>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-red-700 text-sm">Nutrient deficiencies detected</p>
            <p className="text-red-500 text-xs mt-0.5">Low in: {deficiencies.join(', ')}</p>
          </div>
          <Link to="/recommendations" className="btn text-xs bg-red-500 text-white hover:bg-red-600 px-3 py-1.5">
            View Fixes <ChevronRight className="w-3 h-3"/>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score */}
        <div className="card flex flex-col items-center justify-center text-center gap-4">
          <div>
            <p className="font-display text-lg font-bold text-slate-800">Diet Quality Score</p>
            <p className="text-xs text-slate-400">Based on {Object.keys(NUTRIENT_META).length} nutrients</p>
          </div>
          <ScoreRing score={score} />
          <div className={`badge ${score>=75?'bg-emerald-100 text-emerald-700':score>=50?'bg-amber-100 text-amber-700':'bg-red-100 text-red-700'}`}>
            {score>=75?'✨ Excellent':score>=50?'⚡ Improving':'⚠️ Needs attention'}
          </div>
        </div>

        {/* Macros */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {macros.map(m => (
            <div key={m.label} className="card flex items-center gap-4">
              <div className={`w-11 h-11 ${m.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <m.icon className={`w-5 h-5 ${m.color}`}/>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-slate-900">{m.value}<span className="text-sm font-body font-normal text-slate-400 ml-1">{m.unit}</span></p>
                <p className="text-xs text-slate-500 font-medium">{m.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar */}
        <div className="card">
          <p className="section-title">Micronutrient Radar</p>
          <p className="section-sub">% of daily RDA met across key nutrients</p>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0"/>
              <PolarAngleAxis dataKey="nutrient" tick={{ fontSize:10, fill:'#94a3b8', fontFamily:'DM Sans' }}/>
              <Radar dataKey="value" stroke="#0d9488" fill="#0d9488" fillOpacity={0.2} strokeWidth={2}/>
              <Tooltip formatter={v=>[`${v.toFixed(0)}%`,'% RDA']} contentStyle={{fontFamily:'DM Sans',fontSize:12,borderRadius:10,border:'1px solid #e2e8f0'}}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Today's log */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="section-title mb-0">Today's Meals</p>
              <p className="text-xs text-slate-400">{logs.length} items logged</p>
            </div>
            <Link to="/log-food" className="btn-secondary text-xs py-1.5 px-3"><Plus className="w-3 h-3"/>Add</Link>
          </div>
          {mealGroups.length === 0 ? (
            <div className="text-center py-10">
              <Apple className="w-10 h-10 text-slate-200 mx-auto mb-2"/>
              <p className="text-slate-400 text-sm">Nothing logged yet</p>
              <Link to="/log-food" className="text-brand-600 text-sm hover:underline mt-1 block">Log your first meal →</Link>
            </div>
          ) : (
            <div className="space-y-3 max-h-56 overflow-y-auto">
              {mealGroups.map(g => (
                <div key={g.meal}>
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-brand-600 mb-1.5">{g.meal}</p>
                  {g.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="text-sm text-slate-700">{item.foodName}</span>
                      <span className="text-xs text-slate-400">{item.calories} kcal</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          <Link to="/report" className="mt-4 block text-center text-xs text-brand-600 hover:underline font-medium">
            View full nutrient report →
          </Link>
        </div>
      </div>

      {/* Nutrient progress bars */}
      <div className="card">
        <p className="section-title">Today's Nutrient Progress</p>
        <p className="section-sub">Your intake vs daily recommended amount</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {rdaComparison.filter(r=>['iron','calcium','vitaminD','vitaminC','vitaminA','vitaminB12'].includes(r.nutrient)).map(r => (
            <div key={r.nutrient}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">{r.label}</span>
                <span className="text-slate-400">{r.consumed.toFixed(1)}/{r.rda} {r.unit}</span>
              </div>
              <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className={`h-full rounded-full progress-bar ${progressColor(r.pct)}`} style={{width:`${Math.min(r.pct,100)}%`}}/>
              </div>
              <p className="text-[10px] text-right mt-0.5" style={{color:statusColor(r.status)}}>{r.pct.toFixed(0)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
