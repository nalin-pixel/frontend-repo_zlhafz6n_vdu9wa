import { useBudgetStore } from '../store/useBudgetStore'
import ReflectionForm from '../components/ReflectionForm'
import CategorySummary from '../components/CategorySummary'
import { getWeekKey } from '../utils/date'

export default function Weekly(){
  const getWeekByCategory = useBudgetStore(s=>s.getWeekByCategory)
  const saveReflection = useBudgetStore(s=>s.saveReflection)
  const reflections = useBudgetStore(s=>s.reflections)

  const week = getWeekKey(new Date())
  const { sums, items } = getWeekByCategory()
  const initial = reflections[week] || {}

  const overspendCategory = Object.entries(sums).sort((a,b)=>b[1]-a[1])[0]?.[0]

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h2 className="font-semibold mb-2">This Week</h2>
          <CategorySummary data={sums} />
          <div className="text-sm text-slate-300">Top spend: <span className="font-semibold">{overspendCategory || '—'}</span></div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h3 className="font-semibold mb-2">Reflection</h3>
          <ReflectionForm initial={initial} onSave={(data)=>saveReflection(week, data)} />
        </div>
      </div>
    </div>
  )
}
