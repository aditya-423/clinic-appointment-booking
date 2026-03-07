import { useEffect, useState } from 'react'
import { createAppointment } from '../api/api'

const initialState = {
  name: '',
  symptoms: '',
  date: '',
  time: '',
}

export default function AppointmentForm({ selectedDate, onBooked }) {
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (selectedDate) {
      setForm((previous) => ({ ...previous, date: selectedDate }))
    }
  }, [selectedDate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    try {
      setSubmitting(true)
      const response = await createAppointment(form)

      if (response?.success === false) {
        setError(response.message || 'Unable to create appointment.')
        return
      }

      setSuccess('Appointment booked successfully.')
      setForm((previous) => ({ ...initialState, date: previous.date }))
      onBooked()
    } catch (requestError) {
      const message =
        requestError?.response?.data?.message ||
        'Unable to create appointment. Please verify details.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        Manual Appointment Booking
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Patient Name"
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        />

        <textarea
          name="symptoms"
          value={form.symptoms}
          onChange={handleChange}
          placeholder="Symptoms"
          rows={3}
          className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
          />

          <input
            type="text"
            name="time"
            value={form.time}
            onChange={handleChange}
            placeholder="e.g. 10:00 AM"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
          />
        </div>

        {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
        {success && <p className="text-sm font-medium text-emerald-600">{success}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  )
}
