import { useMemo, useState } from 'react'
import AppointmentForm from '../components/AppointmentForm'
import AppointmentTable from '../components/AppointmentTable'
import DateFilter from '../components/DateFilter'
import SlotViewer from '../components/SlotViewer'
import useAppointments from '../hooks/useAppointments'

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState('')
  const { appointments, loading, error, refreshAppointments } =
    useAppointments(selectedDate)

  const sortedAppointments = useMemo(() => {
    return [...appointments].sort((first, second) => {
      const firstDateTime = `${first.date || ''} ${first.time || ''}`
      const secondDateTime = `${second.date || ''} ${second.time || ''}`
      return firstDateTime.localeCompare(secondDateTime)
    })
  }, [appointments])

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="mb-6 rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-cyan-700">Clinic Operations Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Appointment Management
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Monitor Voice AI and manual bookings in real time.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <DateFilter
          selectedDate={selectedDate}
          onChange={setSelectedDate}
          onClear={() => setSelectedDate('')}
        />
        <SlotViewer selectedDate={selectedDate} />
        <AppointmentForm
          selectedDate={selectedDate}
          onBooked={refreshAppointments}
        />
      </section>

      <section className="mt-4">
        <AppointmentTable
          appointments={sortedAppointments}
          loading={loading}
          error={error}
        />
      </section>
    </main>
  )
}
