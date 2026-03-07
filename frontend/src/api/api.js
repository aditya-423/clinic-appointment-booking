import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5050/api',
})

export const fetchAppointments = async () => {
  const { data } = await api.get('/appointments')
  return data
}

export const fetchAppointmentsByDate = async (date) => {
  const { data } = await api.get('/appointments', { params: { date } })
  return data
}

export const fetchSlots = async (date) => {
  const { data } = await api.get('/slots', { params: { date } })
  return data
}

export const createAppointment = async (payload) => {
  const { data } = await api.post('/book', payload)
  return data
}
