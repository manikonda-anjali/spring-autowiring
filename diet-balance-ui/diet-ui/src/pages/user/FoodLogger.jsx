import { useState } from 'react'
import { useDiet } from '../../context/DietContext'
import { FOODS } from '../../data/mockData'
import { Search, Plus, Trash2, UtensilsCrossed, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const MEAL_COLORS = { breakfast:'bg-orange-100 text-orange-700', lunch:'bg-green-100 text-green-700', dinner:'bg-blue-100 text-blue-700', snack:'bg-purple-100 text-purple-700' }

export default function FoodLogger() {
  const { logs, addLog, removeLog } = useDiet()
  const [query, setQuery] = useState('')
  const [meal, setMeal] = useState('breakfast')
  const [selected, setSelected] = useState([])
  const [logged, setLogged] = useState(false)

  const results = query.length > 1 ? FOODS.filter(f => f.name.toLowerCase().includes(query.toLowerCase())).slice(0,8) : []

  const pick = (food) => {
    if (selected.find(s=>s.id===food.id)) return
    setSelected(p => [...p, { ...food, qty:1 }])
    setQuery('')
  }

  const updateQty = (id, qty) => setSelected(p => p.map(s => s.id===id ? {...s, qty:Math.max(0.5,Number(qty))} : s))
  const remove = (id) => setSelected(p => p.filter(s => s.id!==id))

  const handleLog = () => {
    if (!selected.length) return toast.error('Select at least one food item')
    selected.forEach(s => addLog({
      mealType: meal, foodId: s.id, foodName: s.name,
      quantity: s.qty, calories: Math.round(s.calories * s.qty)
    }))
    toast.success(`${selected.length} item(s) logged for ${meal}!`)
    setSelected([])
    setLogged(true)
    setTimeout(()=>setLogged(false), 2000)
  }

  const mealLogs = ['breakfast','lunch','dinner','snack'].map(m => ({ meal:m, items:logs.filter(l=>l.mealType===m) }))

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-slate-900 mb-1">Food Logger</h1>
      <p className="text-slate-400 text-sm mb-8">Search and log your meals to track nutrition</p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Logger */}
        <div className="lg:col-span-3 space-y-4">
          <div className="card">
            <p className="font-semibold text-slate-800 mb-4">Add a Meal</p>

            {/* Meal selector */}
            <div className="flex gap-2 flex-wrap mb-4">
              {['breakfast','lunch','dinner','snack'].map(m => (
                <button key={m} onClick={()=>setMeal(m)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium capitalize transition-all ${meal===m?'bg-brand-600 text-white shadow-sm':'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {m}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
              <input className="input pl-10" placeholder="Search food items…" value={query} onChange={e=>setQuery(e.target.value)}/>
              {results.length > 0 && (
                <div className="absolute z-20 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-card-hover overflow-hidden">
                  {results.map(food => (
                    <button key={food.id} onClick={()=>pick(food)}
                      className="w-full text-left px-4 py-3 hover:bg-brand-50 flex items-center justify-between border-b border-slate-50 last:border-0 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{food.name}</p>
                        <p className="text-xs text-slate-400 capitalize">{food.category} · {food.calories} kcal · {food.serving}</p>
                      </div>
                      <Plus className="w-4 h-4 text-brand-500"/>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected */}
            {selected.length > 0 && (
              <div className="space-y-2 mb-4">
                {selected.map(s => (
                  <div key={s.id} className="flex items-center gap-3 bg-brand-50 rounded-xl px-3 py-2.5">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{s.name}</p>
                      <p className="text-xs text-slate-400">{Math.round(s.calories*s.qty)} kcal</p>
                    </div>
                    <input type="number" min="0.5" step="0.5" value={s.qty}
                      onChange={e=>updateQty(s.id,e.target.value)}
                      className="w-16 text-center text-sm border border-slate-200 rounded-lg py-1 focus:outline-none focus:border-brand-400 bg-white"/>
                    <span className="text-xs text-slate-400">srv</span>
                    <button onClick={()=>remove(s.id)} className="text-slate-300 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button onClick={handleLog} disabled={!selected.length}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${selected.length?'btn-primary':'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
              {logged ? <><CheckCircle className="w-4 h-4"/>Logged!</> : <><Plus className="w-4 h-4"/>Log {meal.charAt(0).toUpperCase()+meal.slice(1)}</>}
            </button>
          </div>

          {/* Food reference */}
          <div className="card">
            <p className="font-semibold text-slate-800 mb-3">Quick Add — Popular Foods</p>
            <div className="grid grid-cols-2 gap-2">
              {FOODS.slice(0,8).map(food => (
                <button key={food.id} onClick={()=>pick(food)}
                  className="text-left p-2.5 rounded-xl border border-slate-100 hover:border-brand-300 hover:bg-brand-50 transition-all group">
                  <p className="text-xs font-medium text-slate-700 group-hover:text-brand-700 truncate">{food.name}</p>
                  <p className="text-xs text-slate-400">{food.calories} kcal</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Today's log summary */}
        <div className="lg:col-span-2">
          <div className="card h-fit">
            <p className="font-semibold text-slate-800 mb-4">Today's Log</p>
            {logs.length === 0 ? (
              <div className="text-center py-8">
                <UtensilsCrossed className="w-10 h-10 text-slate-200 mx-auto mb-2"/>
                <p className="text-slate-400 text-sm">No entries yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mealLogs.filter(g=>g.items.length>0).map(g => (
                  <div key={g.meal}>
                    <span className={`badge capitalize mb-2 ${MEAL_COLORS[g.meal]}`}>{g.meal}</span>
                    <div className="space-y-1">
                      {g.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between py-1.5 group">
                          <span className="text-xs text-slate-700 flex-1 truncate">{item.foodName}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">{item.calories}kcal</span>
                            <button onClick={()=>removeLog(item.id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all">
                              <Trash2 className="w-3 h-3"/>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-slate-100 flex justify-between">
                  <span className="text-sm font-semibold text-slate-700">Total Calories</span>
                  <span className="text-sm font-bold text-brand-600">{logs.reduce((s,l)=>s+l.calories,0)} kcal</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
