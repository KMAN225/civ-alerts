export default function Spinner({ text = 'Chargement...' }) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <span className="w-5 h-5 border-2 border-gray-200 border-t-ciGreen rounded-full animate-spin"></span>
      <span className="text-sm font-bold text-gray-500">{text}</span>
    </div>
  );
}
