export default function AlertBanner({ message, tone = 'info' }){
  const color = tone === 'warn' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-blue-500/10 text-blue-200 border-blue-500/30'
  return (
    <div className={`w-full border ${color} rounded-xl px-4 py-3 text-sm`}>{message}</div>
  )
}
