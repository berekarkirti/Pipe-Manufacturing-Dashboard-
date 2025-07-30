import { useState } from 'react'
import { Edit2, Trash2, Save, X } from 'lucide-react'
import { dbOperations } from '@/lib/supabase'

export default function RecentSales({ data, onRefresh }) {
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [loading, setLoading] = useState(false)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB')
  }

  const handleEditTransaction = async (transaction) => {
    setLoading(true)
    try {
      const { error } = await dbOperations.updateSalesTransaction(transaction.id, {
        customer_name: transaction.customer_name,
        product_name: transaction.product_name,
        requested_length: parseFloat(transaction.requested_length),
        sold_length: parseFloat(transaction.sold_length),
        remaining_stock: parseFloat(transaction.remaining_stock),
        waste_generated: parseFloat(transaction.waste_generated),
        total_amount: parseFloat(transaction.total_amount),
        date: transaction.date
      })
      
      if (!error) {
        setEditingTransaction(null)
        onRefresh()
      } else {
        console.error('Error updating sales transaction:', error)
      }
    } catch (error) {
      console.error('Error updating sales transaction:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTransaction = async (transactionId) => {
    if (!confirm('Are you sure you want to delete this sales transaction?')) return
    
    setLoading(true)
    try {
      const { error } = await dbOperations.deleteSalesTransaction(transactionId)
      
      if (!error) {
        onRefresh()
      } else {
        console.error('Error deleting sales transaction:', error)
      }
    } catch (error) {
      console.error('Error deleting sales transaction:', error)
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (transaction) => {
    setEditingTransaction({ ...transaction })
  }

  const cancelEdit = () => {
    setEditingTransaction(null)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: '#8B7CF8' }}></div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Recent Sales Transactions</h2>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Responsive Table View */}
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#8B7CF8' }}>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 rounded-tl-lg whitespace-nowrap">Sale ID</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Customer</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Product</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Requested Length</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Sold Length</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Remaining Stock</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Waste Generated</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Total Amount</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Date</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white rounded-tr-lg whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? data.map((transaction, index) => (
                <tr 
                  key={transaction.id} 
                  className={`hover:bg-gray-50 border-b border-gray-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  {editingTransaction && editingTransaction.id === transaction.id ? (
                    <>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900 border-r border-gray-200">{transaction.sale_id}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="text"
                          value={editingTransaction.customer_name}
                          onChange={(e) => setEditingTransaction({...editingTransaction, customer_name: e.target.value})}
                          className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="text"
                          value={editingTransaction.product_name}
                          onChange={(e) => setEditingTransaction({...editingTransaction, product_name: e.target.value})}
                          className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          value={editingTransaction.requested_length}
                          onChange={(e) => setEditingTransaction({...editingTransaction, requested_length: e.target.value})}
                          className="w-full min-w-[60px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          value={editingTransaction.sold_length}
                          onChange={(e) => setEditingTransaction({...editingTransaction, sold_length: e.target.value})}
                          className="w-full min-w-[60px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          value={editingTransaction.remaining_stock}
                          onChange={(e) => setEditingTransaction({...editingTransaction, remaining_stock: e.target.value})}
                          className="w-full min-w-[60px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          value={editingTransaction.waste_generated}
                          onChange={(e) => setEditingTransaction({...editingTransaction, waste_generated: e.target.value})}
                          className="w-full min-w-[60px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          value={editingTransaction.total_amount}
                          onChange={(e) => setEditingTransaction({...editingTransaction, total_amount: e.target.value})}
                          className="w-full min-w-[60px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="date"
                          value={editingTransaction.date}
                          onChange={(e) => setEditingTransaction({...editingTransaction, date: e.target.value})}
                          className="w-full min-w-[100px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-1">
                          <button
                            onClick={() => handleEditTransaction(editingTransaction)}
                            disabled={loading}
                            className="flex items-center justify-center space-x-1 bg-green-600 text-white px-1 md:px-2 py-1 rounded text-xs hover:bg-green-700 disabled:opacity-50 min-w-[50px]"
                          >
                            <Save className="h-3 w-3" />
                            <span className="hidden sm:inline">{loading ? 'Saving...' : 'Save'}</span>
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex items-center justify-center space-x-1 bg-gray-500 text-white px-1 md:px-2 py-1 rounded text-xs hover:bg-gray-600 min-w-[50px]"
                          >
                            <X className="h-3 w-3" />
                            <span className="hidden sm:inline">Cancel</span>
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900 border-r border-gray-200">{transaction.sale_id}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{transaction.customer_name}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{transaction.product_name}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{transaction.requested_length}m</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{transaction.sold_length}m</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{transaction.remaining_stock}m</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{transaction.waste_generated}m</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-green-600 border-r border-gray-200">
                        {formatCurrency(transaction.total_amount)}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{formatDate(transaction.date)}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-1">
                          <button
                            onClick={() => startEdit(transaction)}
                            className="text-white px-1 md:px-2 py-1 rounded text-xs hover:opacity-90 flex items-center justify-center space-x-1 min-w-[50px]"
                            style={{ backgroundColor: '#8B7CF8' }}
                          >
                            <Edit2 className="h-3 w-3" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            disabled={loading}
                            className="bg-red-600 text-white px-1 md:px-2 py-1 rounded text-xs hover:bg-red-700 flex items-center justify-center space-x-1 disabled:opacity-50 min-w-[50px]"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              )) : (
                <tr>
                  <td colSpan="10" className="px-2 md:px-4 py-6 md:py-8 text-center text-gray-500 text-xs md:text-sm border-r border-gray-200">
                    No sales transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}