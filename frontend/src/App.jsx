import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import AIReceptionist from './pages/AIReceptionist'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-receptionist" element={<AIReceptionist />} />
      </Routes>
    </div>
  )
}
