function DataTable({ title, columns, rows }) {
  return (
    <div className="bg-[#FFF8F1] rounded-lg p-5 my-10 shadow-[0_8px_20px_rgba(255,200,150,0.4)]">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="text-left px-3 py-2 border-b border-gray-300">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
