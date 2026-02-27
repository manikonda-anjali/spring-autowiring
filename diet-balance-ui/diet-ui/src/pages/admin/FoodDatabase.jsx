import { useState } from 'react'
import { FOODS } from '../../data/mockData'
import { Plus, Pencil, Trash2, Search, X, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const CATS = ['fruit','vegetable','grain','dairy','protein','fat','snack','other']
const EMPTY = { name:'', category:'vegetable', serving:'100g', calories:'', protein:'', iron:'', calcium:'', vitaminD:'', vitaminC:'', vitaminA:'', vitaminB12:'', zinc:'', folate:'', magnesium:'', potassium:'', iodine:'' }

export default function FoodDatabase() {
  const [foods, setFoods] = useState(FOODS)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const set = (k,v) => setForm(p=>({...p,[k]:v}))

  const filtered = foods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModal(true) }
  const openEdit = (f) => { setForm({...f}); setEditId(f.id); setModal(true) }
  const handleDelete = (id) => { setFoods(p=>p.filter(f=>f.id!==id)); toast.success('Deleted') }

  const handleSave = () => {
    if (!form.name) return toast.error('Name required')
    if (editId) {
      setFoods(p=>p.map(f=>f.id===editId?{...form,id:editId}:f))
      toast.success('Updated!')
    } else {
      setFoods(p=>[...p,{...form,id:'f'+Date.now(),calories:Number(form.calories)||0}])
      toast.success('Food item added!')
    }
    setModal(false)
  }

  const FIELDS = ['calories','protein','iron','calcium','vitaminD','vitaminC','vitaminA','vitaminB12','zinc','folate','magnesium','iodine']

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Food Database</h1>
          <p className="text-slate-400 text-sm mt-0.5">{foods.length} food items · Manage nutritional data</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><Plus className="w-4 h-4"/>Add Food Item</button>
      </div>

      <div className="relative w-72 mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
        <input className="input pl-10" placeholder="Search foods…" value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{['Food Name','Category','Calories','Protein','Iron','Calcium','Vit D','Vit C','Serving',''].map(h=>(
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map(food => (
                <tr key={food.id} className="table-row border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3 font-semibold text-slate-800">{food.name}</td>
                  <td className="px-4 py-3"><span className="badge bg-slate-100 text-slate-600 capitalize">{food.category}</span></td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{food.calories}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{food.protein}g</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{food.iron}mg</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{food.calcium}mg</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{food.vitaminD}mcg</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{food.vitaminC}mg</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{food.serving}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={()=>openEdit(food)} className="p-1.5 rounded-lg hover:bg-brand-50 text-slate-400 hover:text-brand-600 transition-all"><Pencil className="w-3.5 h-3.5"/></button>
                      <button onClick={()=>handleDelete(food.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"><Trash2 className="w-3.5 h-3.5"/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-display font-bold text-slate-900 text-lg">{editId?'Edit':'Add'} Food Item</h2>
              <button onClick={()=>setModal(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Food Name *</label>
                  <input className="input" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Spinach (Raw)"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <select className="select" value={form.category} onChange={e=>set('category',e.target.value)}>
                    {CATS.map(c=><option key={c} value={c} className="capitalize">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Serving Size</label>
                  <input className="input" value={form.serving} onChange={e=>set('serving',e.target.value)} placeholder="100g"/>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">Nutrients per serving</p>
                <div className="grid grid-cols-3 gap-3">
                  {FIELDS.map(k => (
                    <div key={k}>
                      <label className="block text-xs text-slate-500 mb-1 capitalize">{k.replace('vitamin','Vit ')}</label>
                      <input type="number" step="0.01" min="0" className="input text-sm py-2" value={form[k]||''} onChange={e=>set(k,e.target.value)} placeholder="0"/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={handleSave} className="btn-primary flex-1 justify-center">
                <CheckCircle className="w-4 h-4"/>{editId?'Update':'Add'} Food Item
              </button>
              <button onClick={()=>setModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
