function formatDate(value) {
  if (!value) {
    return '-'
  }

  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export default function AppointmentTable({ appointments, loading, error }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Appointments</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          Auto-refresh every 5s
        </span>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-10 animate-pulse rounded-md bg-slate-100" />
          ))}
        </div>
      ) : error ? (
        <p className="text-sm font-medium text-rose-600">{error}</p>
      ) : appointments.length === 0 ? (
        <p className="text-sm text-slate-500">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-3 py-3 font-semibold">Patient Name</th>
                <th className="px-3 py-3 font-semibold">Symptoms</th>
                <th className="px-3 py-3 font-semibold">Date</th>
                <th className="px-3 py-3 font-semibold">Time</th>
                <th className="px-3 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-slate-100 text-slate-700">
                  <td className="px-3 py-3 font-medium text-slate-900">{appointment.name}</td>
                  <td className="px-3 py-3">{appointment.symptoms || '-'}</td>
                  <td className="px-3 py-3">{formatDate(appointment.date)}</td>
                  <td className="px-3 py-3">{appointment.time}</td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {appointment.status || 'Confirmed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
