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
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2">
                    {col.render ? col.render(row[col.key]) : row[col.key]}
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

// Usage example:
//
// const orderColumns = [
//   { key: 'customer', label: 'Customer' },
//   { key: 'phone',    label: 'Phone' },
//   { key: 'address',  label: 'Address' },
//   { key: 'items',    label: 'Items' },
//   {
//     key: 'status',
//     label: 'Status',
//     render: (val) => (
//       <span className={`px-2 py-1 rounded-full text-xs text-white
//         ${val === 'Delivered' ? 'bg-green-500' : 'bg-orange-500'}`}>
//         {val}
//       </span>
//     ),
//   },
// ]
//
// const orderRows = [
//   { customer: 'Ali', phone: '03123456789', address: 'Baldia Town', items: 'Pizza x2', status: 'Pending' },
//   { customer: 'Ahmed', phone: '03123456789', address: 'Baldia Town', items: 'Burger x1', status: 'Delivered' },
// ]
//
// <DataTable title="Recent Orders" columns={orderColumns} rows={orderRows} />
