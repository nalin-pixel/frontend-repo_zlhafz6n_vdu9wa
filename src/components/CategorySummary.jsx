import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#34d399','#38bdf8','#a78bfa','#f43f5e']

export default function CategorySummary({ data }){
  const chartData = Object.entries(data || {}).map(([name, value]) => ({ name, value }))
  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie dataKey="value" data={chartData} innerRadius={45} outerRadius={60} paddingAngle={3}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', color: '#e2e8f0' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
