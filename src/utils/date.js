export const pad2 = (n) => String(n).padStart(2, '0')

export const getTodayKey = (d = new Date()) => {
  const date = new Date(d)
  return `${date.getFullYear()}-${pad2(date.getMonth()+1)}-${pad2(date.getDate())}`
}

export const getWeekKey = (d = new Date()) => {
  const date = new Date(d)
  // ISO week number
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = tmp.getUTCDay() || 7
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(),0,1))
  const weekNo = Math.ceil((((tmp - yearStart) / 86400000) + 1)/7)
  return `${tmp.getUTCFullYear()}-W${pad2(weekNo)}`
}

export const getMonthKey = (d = new Date()) => {
  const date = new Date(d)
  return `${date.getFullYear()}-${pad2(date.getMonth()+1)}`
}
