import { NavLink } from 'react-router-dom'

const navItemClass = ({ isActive }) =>
  `rounded-md px-4 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-cyan-600 text-white shadow-sm'
      : 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-700'
  }`

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-tight text-slate-900">
            CityCare Clinic
          </p>
          <p className="text-xs text-slate-500">Voice AI Appointment Desk</p>
        </div>

        <div className="flex items-center gap-2">
          <NavLink to="/dashboard" className={navItemClass}>
            Dashboard
          </NavLink>
          <NavLink to="/ai-receptionist" className={navItemClass}>
            AI Receptionist
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
