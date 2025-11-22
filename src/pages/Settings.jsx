import { useBudgetStore } from '../store/useBudgetStore'

export default function Settings(){
  const income = useBudgetStore(s=>s.income)
  const savingsTarget = useBudgetStore(s=>s.savingsTarget)
  const darkMode = useBudgetStore(s=>s.darkMode)
  const setIncome = useBudgetStore(s=>s.setIncome)
  const setSavingsTarget = useBudgetStore(s=>s.setSavingsTarget)
  const toggleDarkMode = useBudgetStore(s=>s.toggleDarkMode)
  const exportCSV = useBudgetStore(s=>s.exportCSV)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      <div className="max-w-md mx-auto px-4 py-6 space-y-5">
        <h1 className="text-xl font-semibold">Settings</h1>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-3">
          <div>
            <label className="block text-sm mb-1">Monthly Income</label>
            <input type="number" value={income} onChange={e=>setIncome(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Savings Target</label>
            <input type="number" value={savingsTarget} onChange={e=>setSavingsTarget(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2" />
          </div>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <button onClick={toggleDarkMode} className="px-3 py-1 rounded-lg border border-slate-700 bg-slate-900">{darkMode? 'On' : 'Off'}</button>
          </div>
          <button onClick={exportCSV} className="w-full bg-slate-700 hover:bg-slate-600 text-white rounded-lg py-2">Export CSV</button>
        </div>
      </div>
    </div>
  )
}
