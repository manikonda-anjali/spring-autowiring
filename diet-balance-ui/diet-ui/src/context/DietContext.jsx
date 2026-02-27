import { createContext, useContext, useState, useMemo } from 'react'
import { INITIAL_LOGS } from '../data/mockData'
import { computeTotals, buildRdaComparison, computeScore } from '../utils/nutrients'
import { useAuth } from './AuthContext'

const DietContext = createContext(null)

export function DietProvider({ children }) {
  const { user } = useAuth()
  const [logs, setLogs] = useState(INITIAL_LOGS)

  const age = user?.profile?.age || 14
  const gender = user?.profile?.gender || 'female'

  const totals = useMemo(() => computeTotals(logs), [logs])
  const rdaComparison = useMemo(() => buildRdaComparison(totals, age, gender), [totals, age, gender])
  const score = useMemo(() => computeScore(rdaComparison), [rdaComparison])
  const deficiencies = useMemo(() => rdaComparison.filter(r => r.status === 'deficient' || r.status === 'low').map(r => r.label), [rdaComparison])

  const addLog = (entry) => setLogs(p => [...p, { ...entry, id: 'l'+Date.now() }])
  const removeLog = (id) => setLogs(p => p.filter(l => l.id !== id))
  const clearLogs = () => setLogs([])

  return (
    <DietContext.Provider value={{ logs, totals, rdaComparison, score, deficiencies, addLog, removeLog, clearLogs }}>
      {children}
    </DietContext.Provider>
  )
}

export const useDiet = () => useContext(DietContext)
