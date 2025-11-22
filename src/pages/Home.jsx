import Navbar from '../components/Navbar'
import ExpenseList from '../components/ExpenseList'
import AlertBanner from '../components/AlertBanner'
import { useBudgetStore } from '../store/useBudgetStore'

export default function Home(){
  const getTodayTotals = useBudgetStore(s=>s.getTodayTotals)
  const income = useBudgetStore(s=>s.income)
  const savingsTarget = useBudgetStore(s=>s.savingsTarget)
  const { total, items } = getTodayTotals()

  const dailyBudget = Math.max(0, (income - savingsTarget) / 30)
  const remaining = Math.max(0, dailyBudget - total)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      <div className="max-w-md mx-auto px-4 py-5 space-y-5">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400">Spent today</div>
              <div className="text-3xl font-semibold">${total.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Remaining</div>
              <div className="text-3xl font-semibold">${remaining.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {remaining <= 0 && <AlertBanner tone="warn" message="You've reached your daily budget. Try to pause discretionary spending." />}

        <div className="flex gap-3">
          <a href="/add" className="flex-1 text-center bg-blue-600 hover:bg-blue-500 transition text-white rounded-lg py-2">Add Expense</a>
          <a href="/weekly" className="flex-1 text-center bg-slate-700 hover:bg-slate-600 transition text-white rounded-lg py-2">Weekly</a>
        </div>

        <div>
          <h2 className="text-slate-300 text-sm mb-2">Today</h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-2">
            <ExpenseList items={items} />
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  )
}
