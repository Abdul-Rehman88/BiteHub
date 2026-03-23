function StatCard({ value, label }) {
  return (
    <div className="bg-[#FFF8F1] p-5 rounded-lg shadow-[0_4px_10px_rgba(255,200,150,0.4)] 
                    hover:shadow-[0_12px_25px_rgba(255,200,150,0.5)] transition-shadow duration-300">
      <h2 className="text-2xl font-semibold">{value}</h2>
      <p className="text-gray-700">{label}</p>
    </div>
  )
}

export default StatCard
