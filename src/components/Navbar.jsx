import { NavLink } from 'react-router-dom'
import { Home, PlusCircle, BarChart2, Settings, Lightbulb } from 'lucide-react'

const linkClass = ({ isActive }) => `flex-1 flex flex-col items-center justify-center py-2 text-xs ${isActive ? 'text-blue-500' : 'text-slate-400'}`

export default function Navbar(){
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/80 backdrop-blur z-20">
      <div className="max-w-md mx-auto flex">
        <NavLink to="/home" className={linkClass}>
          <Home size={22} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/add" className={linkClass}>
          <PlusCircle size={22} />
          <span>Add</span>
        </NavLink>
        <NavLink to="/insights" className={linkClass}>
          <Lightbulb size={22} />
          <span>Insights</span>
        </NavLink>
        <NavLink to="/monthly" className={linkClass}>
          <BarChart2 size={22} />
          <span>Reports</span>
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          <Settings size={22} />
          <span>Settings</span>
        </NavLink>
      </div>
    </nav>
  )
}
