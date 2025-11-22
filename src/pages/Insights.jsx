import { useBudgetStore } from '../store/useBudgetStore'
import AlertBanner from '../components/AlertBanner'
import { getWeekKey, getTodayKey } from '../utils/date'

function getSmartTips(expenses){
  const tips = []
  const todayKey = getTodayKey(new Date())
  const today = expenses.filter(e=>e.dayKey===todayKey)
  if(today.length===0){
    tips.push({ tone:'info', msg:"No expenses logged today — capture even small spends to stay mindful." })
  }

  const weekKey = getWeekKey(new Date())
  const weekItems = expenses.filter(e=>e.weekKey===weekKey)
  const byCat = weekItems.reduce((acc,e)=>{ acc[e.category]=(acc[e.category]||0)+e.amount; return acc },{})
  const total = weekItems.reduce((s,e)=>s+e.amount,0)
  Object.entries(byCat).forEach(([cat,sum])=>{
    if(total>0 && sum/total>=0.6){ tips.push({ tone:'warn', msg:`You've hit ${Math.round((sum/total)*100)}% of your ${cat} spending this week.`}) }
  })
  return tips
}

export default function Insights(){
  const expenses = useBudgetStore(s=>s.expenses)
  const tips = getSmartTips(expenses)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      <div className="max-w-md mx-auto px-4 py-6 space-y-3">
        <h1 className="text-xl font-semibold mb-2">Insights</h1>
        {tips.length===0 && <div className="text-slate-400 text-sm">All good! Keep logging mindfully.</div>}
        {tips.map((t, i)=> <AlertBanner key={i} tone={t.tone==='warn'?'warn':'info'} message={t.msg} />)}
      </div>
    </div>
  )
}
