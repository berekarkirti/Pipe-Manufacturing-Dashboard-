export default function StatsCards({ stats }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const cards = [
    {
      title: 'Total Pipes in Stock',
      value: stats.totalPipes?.toLocaleString() || '1',
      className: 'bg-white'
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(stats.monthlyRevenue || ''),
      className: 'bg-white'
    },
    {
      title: 'Orders This Month',
      value: stats.ordersThisMonth?.toString() || '',
      className: 'bg-white'
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockItems?.toString() || '',
      className: 'bg-white'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className={`${card.className} rounded-2xl p-6 shadow-lg border border-gray-100`}>
          <p className="text-3xl font-bold text-gray-800 mb-2">{card.value}</p>
          <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
        </div>
      ))}
    </div>
  )
}