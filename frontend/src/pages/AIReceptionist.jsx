const DEFAULT_RECEPTION_NUMBER = '+12675515363'

const configuredNumber = import.meta.env.VITE_AI_RECEPTION_NUMBER
const receptionNumber = configuredNumber || DEFAULT_RECEPTION_NUMBER

export default function AIReceptionist() {
  const startCall = () => {
    window.location.href = `tel:${receptionNumber}`
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
          CityCare Medical Clinic
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
          Book Appointment via Voice AI
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          Start a phone call with our AI receptionist to schedule your
          appointment.
        </p>

        <button
          type="button"
          onClick={startCall}
          className="mt-8 rounded-xl bg-cyan-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700"
        >
          Start AI Call
        </button>

        <p className="mt-4 text-sm text-slate-500">
          Calling:{' '}
          <span className="font-semibold text-slate-700">{receptionNumber}</span>
        </p>
      </section>
    </main>
  )
}
