import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getTodayKey, getWeekKey, getMonthKey } from '../utils/date'

const categories = ['Needs', 'Wants', 'Culture', 'Unexpected']

export const useBudgetStore = create(
  persist(
    (set, get) => ({
      income: 0,
      savingsTarget: 0,
      darkMode: false,
      expenses: [], // {id, amount, description, category, note, dateISO, dayKey, weekKey, monthKey}
      reflections: {}, // { [weekKey]: { overspend: '', unnecessary: '', notes: '' } }

      setIncome: (income) => set({ income: Number(income) || 0 }),
      setSavingsTarget: (target) => set({ savingsTarget: Number(target) || 0 }),
      toggleDarkMode: () => set({ darkMode: !get().darkMode }),

      addExpense: (expense) => {
        const date = expense.date ? new Date(expense.date) : new Date()
        const entry = {
          id: crypto.randomUUID(),
          amount: Number(expense.amount),
          description: expense.description || '',
          category: categories.includes(expense.category) ? expense.category : 'Needs',
          note: expense.note || '',
          dateISO: date.toISOString(),
          dayKey: getTodayKey(date),
          weekKey: getWeekKey(date),
          monthKey: getMonthKey(date),
        }
        set({ expenses: [entry, ...get().expenses] })
        return entry
      },

      saveReflection: (weekKey, data) => set({
        reflections: { ...get().reflections, [weekKey]: { ...data } },
      }),

      // selectors/helpers
      getTodayTotals: (date = new Date()) => {
        const dayKey = getTodayKey(date)
        const items = get().expenses.filter(e => e.dayKey === dayKey)
        const total = items.reduce((s, e) => s + e.amount, 0)
        return { total, items }
      },

      getWeekByCategory: (date = new Date()) => {
        const wk = getWeekKey(date)
        const items = get().expenses.filter(e => e.weekKey === wk)
        const sums = categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {})
        for (const e of items) sums[e.category] += e.amount
        return { weekKey: wk, items, sums }
      },

      getMonthSummary: (date = new Date()) => {
        const mk = getMonthKey(date)
        const items = get().expenses.filter(e => e.monthKey === mk)
        const total = items.reduce((s, e) => s + e.amount, 0)
        const byCat = categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {})
        for (const e of items) byCat[e.category] += e.amount
        return { monthKey: mk, items, total, byCat }
      },

      exportCSV: () => {
        const rows = [
          ['id','amount','description','category','note','dateISO','dayKey','weekKey','monthKey'],
          ...get().expenses.map(e => [e.id, e.amount, e.description, e.category, e.note, e.dateISO, e.dayKey, e.weekKey, e.monthKey])
        ]
        const csv = rows.map(r => r.map(v => typeof v === 'string' ? '"'+v.replaceAll('"','""')+'"' : v).join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'kakeibo_export.csv'
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
      },
    }),
    {
      name: 'kakeibo-store',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        income: state.income,
        savingsTarget: state.savingsTarget,
        darkMode: state.darkMode,
        expenses: state.expenses,
        reflections: state.reflections,
      }),
    }
  )
)

export const kakeiboCategories = categories
