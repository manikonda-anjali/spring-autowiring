import { useState } from 'react'
import { MOCK_USERS } from '../../data/mockData'
import { Search, Trash2, Eye, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function UserManagement() {
  const [users, setUsers] = useState(MOCK_USERS)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = (id) => {
    setUsers(p=>p.filter(u=>u.id!==id))
    toast.success('User removed')
    if(selected?.id===id) setSelected(null)
  }

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-400 text-sm mt-0.5">{users.length} registered users</p>
        </div>
      </div>

      <div className="relative w-72 mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
        <input className="input pl-10" placeholder="Search users…" value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>

      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>{['User','Email','Age/Gender','Joined','Diet Score','Deficiencies',''].map(h=>(
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="table-row border-b border-slate-50 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{u.name.charAt(0)}</div>
                    <span className="font-semibold text-slate-800">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{u.email}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{u.age} · <span className="capitalize">{u.gender}</span></td>
                <td className="px-4 py-3 text-slate-400 text-xs">{u.joined}</td>
                <td className="px-4 py-3">
                  <span className={`font-bold ${u.score>=75?'text-emerald-600':u.score>=50?'text-amber-500':'text-red-500'}`}>{u.score}</span>
                </td>
                <td className="px-4 py-3">
                  {u.deficiencies.length===0
                    ? <span className="badge bg-emerald-100 text-emerald-700">None ✓</span>
                    : <div className="flex gap-1 flex-wrap">{u.deficiencies.slice(0,2).map(d=><span key={d} className="badge-deficient">{d}</span>)}{u.deficiencies.length>2&&<span className="badge bg-slate-100 text-slate-500">+{u.deficiencies.length-2}</span>}</div>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button onClick={()=>setSelected(u)} className="p-1.5 rounded-lg hover:bg-brand-50 text-slate-400 hover:text-brand-600 transition-all"><Eye className="w-3.5 h-3.5"/></button>
                    <button onClick={()=>handleDelete(u.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"><Trash2 className="w-3.5 h-3.5"/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={()=>setSelected(null)}>
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-slate-900">{selected.name}</h2>
              <button onClick={()=>setSelected(null)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"><X className="w-4 h-4"/></button>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white font-display text-2xl font-bold">{selected.name.charAt(0)}</div>
              <div>
                <p className="text-slate-500 text-sm">{selected.email}</p>
                <div className={`font-display text-2xl font-bold mt-1 ${selected.score>=75?'text-emerald-600':selected.score>=50?'text-amber-500':'text-red-500'}`}>{selected.score} <span className="text-xs font-body font-normal text-slate-400">/ 100</span></div>
              </div>
            </div>
            <div className="space-y-2.5">
              {[['Age',selected.age],['Gender',selected.gender],['Joined',selected.joined],['Role',selected.role]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-sm text-slate-500">{k}</span>
                  <span className="text-sm font-semibold text-slate-800 capitalize">{v}</span>
                </div>
              ))}
              <div className="pt-2">
                <p className="text-sm text-slate-500 mb-2">Deficiencies</p>
                {selected.deficiencies.length===0
                  ? <span className="badge bg-emerald-100 text-emerald-700">None detected ✓</span>
                  : <div className="flex flex-wrap gap-1">{selected.deficiencies.map(d=><span key={d} className="badge-deficient">{d}</span>)}</div>}
              </div>
            </div>
            <button onClick={()=>setSelected(null)} className="btn-secondary w-full justify-center mt-5">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
