import { useCallback, useEffect, useState } from 'react'
import { fetchAppointments, fetchAppointmentsByDate } from '../api/api'

const POLL_INTERVAL_MS = 5000

export default function useAppointments(selectedDate = '') {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadAppointments = useCallback(async () => {
    try {
      setError('')
      const data = selectedDate
        ? await fetchAppointmentsByDate(selectedDate)
        : await fetchAppointments()
      setAppointments(Array.isArray(data) ? data : [])
    } catch {
      setError('Unable to load appointments. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [selectedDate])

  useEffect(() => {
    setLoading(true)
    loadAppointments()

    const poller = setInterval(loadAppointments, POLL_INTERVAL_MS)
    return () => clearInterval(poller)
  }, [loadAppointments])

  return {
    appointments,
    loading,
    error,
    refreshAppointments: loadAppointments,
  }
}
