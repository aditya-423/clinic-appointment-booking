import { useEffect, useState } from 'react'
import { fetchSlots } from '../api/api'

export default function SlotViewer({ selectedDate }) {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!selectedDate) {
      setSlots([])
      setError('')
      return
    }

    const loadSlots = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await fetchSlots(selectedDate)
        setSlots(Array.isArray(data?.availableSlots) ? data.availableSlots : [])
      } catch {
        setError('Unable to fetch slots for selected date.')
        setSlots([])
      } finally {
        setLoading(false)
      }
    }

    loadSlots()
  }, [selectedDate])

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Available Slots</h2>

      {!selectedDate && (
        <p className="text-sm text-slate-500">Select a date to view available slots.</p>
      )}

      {selectedDate && loading && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-9 animate-pulse rounded-full bg-slate-100"
            />
          ))}
        </div>
      )}

      {selectedDate && !loading && error && (
        <p className="text-sm font-medium text-rose-600">{error}</p>
      )}

      {selectedDate && !loading && !error && (
        <div className="flex flex-wrap gap-2">
          {slots.length > 0 ? (
            slots.map((slot) => (
              <span
                key={slot}
                className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-800"
              >
                {slot}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-500">No available slots for this date.</p>
          )}
        </div>
      )}
    </div>
  )
}
