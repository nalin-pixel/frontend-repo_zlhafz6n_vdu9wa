import ExpenseItem from './ExpenseItem'

export default function ExpenseList({ items }){
  if (!items || items.length === 0) {
    return <div className="text-slate-400 text-sm">No expenses yet. Add your first one.</div>
  }
  return (
    <div>
      {items.map(i => (
        <div key={i.id} className="border-b border-slate-800">
          <ExpenseItem item={i} />
        </div>
      ))}
    </div>
  )
}
