import { FOODS, getRDA, NUTRIENT_META } from '../data/mockData'

export function computeTotals(logs) {
  const totals = {}
  Object.keys(NUTRIENT_META).forEach(k => totals[k] = 0)
  logs.forEach(log => {
    const food = FOODS.find(f => f.id === log.foodId)
    if (!food) return
    Object.keys(NUTRIENT_META).forEach(k => {
      totals[k] = (totals[k] || 0) + (food[k] || 0) * log.quantity
    })
  })
  return totals
}

export function classifyNutrient(consumed, rda) {
  const pct = rda ? (consumed / rda) * 100 : 0
  if (pct < 50)  return { status: 'deficient', pct }
  if (pct < 75)  return { status: 'low',       pct }
  if (pct <= 130) return { status: 'adequate',  pct }
  return                 { status: 'excess',    pct }
}

export function buildRdaComparison(totals, age, gender) {
  const rda = getRDA(age, gender)
  return Object.keys(NUTRIENT_META).map(k => {
    const consumed = totals[k] || 0
    const rdaVal   = rda[k] || 1
    const { status, pct } = classifyNutrient(consumed, rdaVal)
    return { nutrient: k, label: NUTRIENT_META[k].label, unit: NUTRIENT_META[k].unit, consumed, rda: rdaVal, pct, status }
  })
}

export function computeScore(rdaComparison) {
  const weights = { protein:0.15, calcium:0.12, iron:0.12, vitaminD:0.12, vitaminC:0.10, vitaminA:0.10, vitaminB12:0.10, zinc:0.08, folate:0.06, magnesium:0.05 }
  let score = 0, total = 0
  rdaComparison.forEach(r => {
    const w = weights[r.nutrient]
    if (!w) return
    score += Math.min(r.pct, 100) * w
    total += w * 100
  })
  return total > 0 ? Math.round(score / total * 100) : 0
}

export function statusColor(status) {
  return { deficient:'#EF4444', low:'#F59E0B', adequate:'#10B981', excess:'#3B82F6' }[status] || '#10B981'
}

export function statusBg(status) {
  return { deficient:'bg-red-100 text-red-700', low:'bg-amber-100 text-amber-700', adequate:'bg-emerald-100 text-emerald-700', excess:'bg-blue-100 text-blue-700' }[status] || ''
}

export function progressColor(pct) {
  if (pct < 50)  return 'bg-red-400'
  if (pct < 75)  return 'bg-amber-400'
  if (pct <= 130) return 'bg-emerald-400'
  return 'bg-blue-400'
}
