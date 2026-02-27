import { useDiet } from '../../context/DietContext'
import { FOODS } from '../../data/mockData'
import { Leaf, Zap, Sun, Droplets, Flame } from 'lucide-react'

const MEAL_NUTRIENTS = {
  breakfast: ['iron','vitaminB12','folate','calcium'],
  lunch:     ['vitaminC','vitaminA','protein','zinc'],
  dinner:    ['vitaminD','calcium','protein','iron'],
  snack:     ['vitaminC','calcium','magnesium']
}

const NUTRIENT_ICONS = { iron:Zap, vitaminD:Sun, calcium:Droplets, protein:Flame, vitaminC:Leaf }

const MEAL_STYLES = {
  breakfast: { bg:'from-orange-50 to-amber-50',  border:'border-orange-200', tag:'bg-orange-100 text-orange-700',  dot:'bg-orange-400' },
  lunch:     { bg:'from-green-50 to-emerald-50', border:'border-green-200',  tag:'bg-green-100 text-green-700',    dot:'bg-green-400' },
  dinner:    { bg:'from-blue-50 to-indigo-50',   border:'border-blue-200',   tag:'bg-blue-100 text-blue-700',      dot:'bg-blue-400' },
  snack:     { bg:'from-purple-50 to-violet-50', border:'border-purple-200', tag:'bg-purple-100 text-purple-700',  dot:'bg-purple-400' },
}

function getFoodsForNutrient(nutrient, n = 3) {
  return [...FOODS].sort((a, b) => (b[nutrient]||0) - (a[nutrient]||0)).filter(f=>(f[nutrient]||0)>0).slice(0, n)
}

export default function Recommendations() {
  const { rdaComparison, deficiencies, score } = useDiet()
  const deficientNutrients = rdaComparison.filter(r => r.status === 'deficient' || r.status === 'low')

  const mealPlan = Object.entries(MEAL_NUTRIENTS).map(([meal, targetNutrients]) => {
    const relevantDef = targetNutrients.filter(n => deficientNutrients.find(d => d.nutrient === n))
    const targets = relevantDef.length ? relevantDef : targetNutrients.slice(0, 2)
    const foods = []
    targets.forEach(nutrient => {
      getFoodsForNutrient(nutrient, 2).forEach(food => {
        if (!foods.find(f=>f.id===food.id)) {
          const defEntry = rdaComparison.find(r=>r.nutrient===nutrient)
          foods.push({ ...food, reason: `Rich in ${nutrient.replace('vitamin','Vitamin ')} — you're at ${defEntry?.pct.toFixed(0)||0}% of RDA`, boostNutrient: nutrient })
        }
      })
    })
    return { meal, foods: foods.slice(0,3) }
  })

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-slate-900 mb-1">Personalised Recommendations</h1>
      <p className="text-slate-400 text-sm mb-6">Meal suggestions tailored to address your specific nutrient gaps</p>

      {/* Deficiency summary */}
      {deficientNutrients.length > 0 ? (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <p className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4"/> Nutrients these meals are optimised to address:
          </p>
          <div className="flex flex-wrap gap-2">
            {deficientNutrients.map(d => (
              <div key={d.nutrient} className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 shadow-sm">
                <div className={`w-2 h-2 rounded-full ${d.status==='deficient'?'bg-red-400':'bg-amber-400'}`}/>
                <span className="text-xs font-semibold text-slate-700">{d.label}</span>
                <span className="text-xs text-slate-400">{d.pct.toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-emerald-600"/>
          </div>
          <div>
            <p className="font-semibold text-emerald-800">Great nutritional balance! 🎉</p>
            <p className="text-emerald-600 text-sm">No deficiencies detected. These are general health-optimising suggestions.</p>
          </div>
        </div>
      )}

      {/* Meal plan cards */}
      <div className="space-y-8">
        {mealPlan.map(({ meal, foods }) => {
          const style = MEAL_STYLES[meal]
          return (
            <div key={meal}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${style.dot}`}/>
                <h2 className="font-display text-lg font-bold text-slate-800 capitalize">{meal}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {foods.map(food => (
                  <div key={food.id} className={`bg-gradient-to-br ${style.bg} border ${style.border} rounded-2xl p-5 hover:shadow-card transition-all duration-300 group cursor-pointer`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Leaf className="w-5 h-5 text-brand-600"/>
                      </div>
                      <span className={`badge ${style.tag} capitalize`}>{food.category}</span>
                    </div>
                    <h3 className="font-display font-bold text-slate-900 text-base mb-1 group-hover:text-brand-700 transition-colors">{food.name}</h3>
                    <p className="text-xs text-slate-500 mb-3 leading-relaxed">{food.reason}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">{food.calories} kcal · {food.serving}</span>
                    </div>
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      {['protein','iron','calcium','vitaminD','vitaminC'].filter(n=>food[n]>0).slice(0,3).map(n => (
                        <span key={n} className="text-[10px] bg-white/70 text-slate-600 px-2 py-0.5 rounded-full font-medium capitalize">
                          {n.replace('vitamin','Vit ')}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* General tips */}
      <div className="mt-8 card">
        <p className="section-title">💡 General Nutrition Tips</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {[
            'Pair iron-rich foods with Vitamin C sources (e.g. lemon juice on lentils) to boost absorption by up to 3x',
            'Expose yourself to sunlight for 15–20 mins daily to naturally boost Vitamin D levels',
            'Soaking legumes overnight reduces anti-nutrients and improves mineral absorption',
            'Include fermented foods like yogurt for better calcium absorption and gut health',
            'Eat a rainbow of colourful vegetables to ensure broad micronutrient coverage',
            'Limit processed foods high in sodium — they deplete calcium and magnesium over time',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-5 h-5 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-brand-700">{i+1}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
