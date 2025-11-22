import { useBudgetStore } from '../store/useBudgetStore'
import CategorySummary from '../components/CategorySummary'

export default function Monthly(){
  const getMonthSummary = useBudgetStore(s=>s.getMonthSummary)
  const income = useBudgetStore(s=>s.income)
  const savingsTarget = useBudgetStore(s=>s.savingsTarget)

  const { total, byCat } = getMonthSummary()
  const targetSpend = Math.max(0, income - savingsTarget)
  const gap = Math.max(0, targetSpend - total)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400">Spent this month</div>
              <div className="text-3xl font-semibold">${total.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Target spend</div>
              <div className="text-3xl font-semibold">${targetSpend.toFixed(2)}</div>
            </div>
          </div>
          <div className="mt-2 text-sm text-slate-300">Savings gap: <span className="font-semibold">${gap.toFixed(2)}</span></div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h3 className="font-semibold mb-2">Category Breakdown</h3>
          <CategorySummary data={byCat} />
        </div>
      </div>
    </div>
  )
}
