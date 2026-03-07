const DEFAULT_BOLNA_URL = 'https://bolna.ai/a/d46dcef7-19bf-443f-af1c-3bc1e1721bc0'

function resolveBolnaUrl() {
  const configuredUrl = import.meta.env.VITE_BOLNA_AGENT_URL
  const configuredAgentId = import.meta.env.VITE_BOLNA_AGENT_ID

  if (configuredUrl) {
    return configuredUrl
  }

  if (configuredAgentId) {
    return `https://bolna.ai/a/${configuredAgentId}`
  }

  return DEFAULT_BOLNA_URL
}

const BOLNA_AGENT_URL = resolveBolnaUrl()

export default function AIReceptionist() {
  const startCall = () => {
    window.open(BOLNA_AGENT_URL, '_blank', 'noopener,noreferrer')
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
          Start a conversation with our AI receptionist to schedule your
          appointment.
        </p>

        <button
          type="button"
          onClick={startCall}
          className="mt-8 rounded-xl bg-cyan-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700"
        >
          Start AI Call
        </button>
      </section>
    </main>
  )
}
