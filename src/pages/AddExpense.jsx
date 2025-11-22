import { useNavigate } from 'react-router-dom'
import { useBudgetStore, kakeiboCategories } from '../store/useBudgetStore'

export default function AddExpense(){
  const addExpense = useBudgetStore(s=>s.addExpense)
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    if(!data.amount) return
    addExpense({
      amount: data.amount,
      description: data.description,
      category: data.category,
      note: data.note,
    })
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <h1 className="text-xl font-semibold">Add Expense</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <input name="amount" type="number" step="0.01" required className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <input name="description" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select name="category" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
              {kakeiboCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Why did I buy this?</label>
            <textarea name="note" rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2">Save</button>
        </form>
      </div>
    </div>
  )
}
