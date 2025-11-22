import { kakeiboCategories } from '../store/useBudgetStore'

const catColor = {
  'Needs': 'text-emerald-300',
  'Wants': 'text-sky-300',
  'Culture': 'text-purple-300',
  'Unexpected': 'text-rose-300',
}

export default function ExpenseItem({ item }){
  return (
    <div className="flex items-start justify-between py-3">
      <div>
        <div className="text-slate-100 font-medium">${item.amount.toFixed(2)} <span className={`ml-2 text-xs ${catColor[item.category]}`}>{item.category}</span></div>
        {item.description && <div className="text-slate-300 text-sm">{item.description}</div>}
        {item.note && <div className="text-slate-400 text-xs italic">{item.note}</div>}
      </div>
      <div className="text-slate-500 text-xs">{new Date(item.dateISO).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    </div>
  )
}
