import { useState, useEffect } from 'react'

export default function ReflectionForm({ initial = {}, onSave }){
  const [overspend, setOverspend] = useState(initial.overspend || '')
  const [unnecessary, setUnnecessary] = useState(initial.unnecessary || '')
  const [notes, setNotes] = useState(initial.notes || '')

  useEffect(() => {
    setOverspend(initial.overspend || '')
    setUnnecessary(initial.unnecessary || '')
    setNotes(initial.notes || '')
  }, [initial])

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm text-slate-300 mb-1">What did I overspend on?</label>
        <input value={overspend} onChange={e=>setOverspend(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-1">What unnecessary purchases did I make?</label>
        <input value={unnecessary} onChange={e=>setUnnecessary(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-1">Notes</label>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </div>
      <button onClick={()=>onSave({ overspend, unnecessary, notes })} className="w-full bg-blue-600 hover:bg-blue-500 transition text-white rounded-lg py-2">Save Reflection</button>
    </div>
  )
}
