import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import AddExpense from './pages/AddExpense'
import Weekly from './pages/Weekly'
import Monthly from './pages/Monthly'
import Insights from './pages/Insights'
import Settings from './pages/Settings'
import Navbar from './components/Navbar'

function Shell({ children }){
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {children}
      <Navbar />
    </div>
  )
}

function App(){
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/onboarding" replace />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/home" element={<Shell><Home /></Shell>} />
      <Route path="/add" element={<AddExpense />} />
      <Route path="/weekly" element={<Shell><Weekly /></Shell>} />
      <Route path="/monthly" element={<Shell><Monthly /></Shell>} />
      <Route path="/insights" element={<Shell><Insights /></Shell>} />
      <Route path="/settings" element={<Shell><Settings /></Shell>} />
      <Route path="*" element={<div className="p-6 text-center"><h1 className="text-2xl font-semibold">Not Found</h1><Link className="text-blue-400" to="/home">Go Home</Link></div>} />
    </Routes>
  )
}

export default App
