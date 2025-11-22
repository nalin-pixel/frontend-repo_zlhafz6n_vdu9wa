import Spline from '@splinetool/react-spline'
import { useNavigate } from 'react-router-dom'
import { useBudgetStore } from '../store/useBudgetStore'

export default function Onboarding(){
  const navigate = useNavigate()
  const income = useBudgetStore(s=>s.income)
  const savingsTarget = useBudgetStore(s=>s.savingsTarget)
  const setIncome = useBudgetStore(s=>s.setIncome)
  const setSavingsTarget = useBudgetStore(s=>s.setSavingsTarget)

  const start = (e) => {
    e.preventDefault()
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="relative h-64">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Kakeibo Budget</h1>
          <p className="text-slate-300 text-sm">Mindful, manual expense tracking with weekly reflection and simple reports.</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-3">
          <p className="text-slate-300 text-sm">Kakeibo focuses on awareness: Needs, Wants, Culture, Unexpected. Log daily, reflect weekly, save mindfully.</p>
          <form onSubmit={start} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Monthly Income</label>
              <input type="number" value={income} onChange={e=>setIncome(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Savings Target</label>
              <input type="number" value={savingsTarget} onChange={e=>setSavingsTarget(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2" required />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2">Start Tracking</button>
          </form>
        </div>
      </div>
    </div>
  )
}
