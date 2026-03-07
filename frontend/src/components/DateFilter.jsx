export default function DateFilter({ selectedDate, onChange, onClear }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Date Filter</h2>
        {selectedDate && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-cyan-700 hover:text-cyan-800"
          >
            Clear
          </button>
        )}
      </div>

      <input
        type="date"
        value={selectedDate}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
      />
    </div>
  )
}
