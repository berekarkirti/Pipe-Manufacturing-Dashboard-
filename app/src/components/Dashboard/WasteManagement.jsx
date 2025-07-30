import { useState } from 'react'
import { Plus, Edit2, Trash2, Save, X, Search, ChevronDown } from 'lucide-react'

export default function WasteManagement({ data = [], onRefresh = () => {} }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [showProductDropdown, setShowProductDropdown] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [loading, setLoading] = useState(false)
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    source: 'Manufacturing',
    product: '',
    waste_type: 'Production Waste',
    quantity: '',
    unit: 'kg',
    reason: '',
    disposal_method: 'Recycling'
  })

  // Get unique product names from existing data
  const uniqueProducts = [...new Set(data.map(item => item.product).filter(Boolean))]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB')
  }

  const handleAddRecord = async () => {
    if (!newRecord.product || !newRecord.quantity) {
      alert('Please fill in all required fields')
      return
    }
    
    setLoading(true)
    try {
      // Simulated API call - replace with actual dbOperations.addWasteRecord
      console.log('Adding waste record:', {
        ...newRecord,
        quantity: parseFloat(newRecord.quantity)
      })
      
      setNewRecord({
        date: new Date().toISOString().split('T')[0],
        source: 'Manufacturing',
        product: '',
        waste_type: 'Production Waste',
        quantity: '',
        unit: 'kg',
        reason: '',
        disposal_method: 'Recycling'
      })
      setShowAddForm(false)
      setShowProductDropdown(false)
      onRefresh()
    } catch (error) {
      console.error('Error adding waste record:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditRecord = async (record) => {
    setLoading(true)
    try {
      // Simulated API call - replace with actual dbOperations.updateWasteRecord
      console.log('Updating waste record:', record.id, {
        date: record.date,
        source: record.source,
        product: record.product,
        waste_type: record.waste_type,
        quantity: parseFloat(record.quantity),
        unit: record.unit,
        reason: record.reason,
        disposal_method: record.disposal_method
      })
      
      setEditingRecord(null)
      onRefresh()
    } catch (error) {
      console.error('Error updating waste record:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRecord = async (recordId) => {
    if (!confirm('Are you sure you want to delete this waste record?')) return
    
    setLoading(true)
    try {
      // Simulated API call - replace with actual dbOperations.deleteWasteRecord
      console.log('Deleting waste record:', recordId)
      onRefresh()
    } catch (error) {
      console.error('Error deleting waste record:', error)
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (record) => {
    setEditingRecord({ ...record })
  }

  const cancelEdit = () => {
    setEditingRecord(null)
  }

  const selectExistingProduct = (productName) => {
    setNewRecord({...newRecord, product: productName})
    setShowProductDropdown(false)
  }

  const selectAddNewProduct = () => {
    setNewRecord({...newRecord, product: ''})
    setShowProductDropdown(false)
  }

  const filteredWaste = (data || []).filter(waste =>
    waste.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    waste.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
    waste.waste_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    waste.reason.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: '#8B7CF8' }}></div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Waste Management Tracking</h2>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            disabled={loading}
            className="flex items-center justify-center space-x-2 text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm"
            style={{ backgroundColor: '#8B7CF8', width: '200px', height: '40px' }}
          >
            <Plus className="h-4 w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">Add Waste Record</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search waste records by product, source, type, or reason..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 bg-gray-50 text-sm sm:text-base"
              style={{ '--tw-ring-color': '#8B7CF8' }}
            />
          </div>
        </div>

        {showAddForm && (
          <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-base sm:text-lg font-medium mb-4">Add Waste Record</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <input
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#8B7CF8' }}
                  required
                />
                
                <select
                  value={newRecord.source}
                  onChange={(e) => setNewRecord({...newRecord, source: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#8B7CF8' }}
                >
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Sales">Sales</option>
                </select>

                {/* Product Name with Accordion */}
                <div className="relative">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={newRecord.product}
                      onChange={(e) => setNewRecord({...newRecord, product: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                      style={{ '--tw-ring-color': '#8B7CF8' }}
                      required
                    />
                    <button
                      onClick={() => setShowProductDropdown(!showProductDropdown)}
                      className="flex items-center justify-center border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50 focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': '#8B7CF8', width: '40px', height: '42px' }}
                    >
                      <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showProductDropdown ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  
                  {showProductDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <button
                        onClick={selectAddNewProduct}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 border-b border-gray-100 font-medium text-blue-600"
                      >
                        + Add New Product
                      </button>
                      
                      {uniqueProducts.length > 0 && (
                        <>
                          <div className="px-3 py-1 text-xs text-gray-500 bg-gray-50 font-medium">
                            Existing Products
                          </div>
                          {uniqueProducts.map((product, index) => (
                            <button
                              key={index}
                              onClick={() => selectExistingProduct(product)}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                            >
                              {product}
                            </button>
                          ))}
                        </>
                      )}
                      
                      {uniqueProducts.length === 0 && (
                        <div className="px-3 py-4 text-sm text-gray-500 text-center">
                          No existing products
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <select
                  value={newRecord.waste_type}
                  onChange={(e) => setNewRecord({...newRecord, waste_type: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#8B7CF8' }}
                >
                  <option value="Production Waste">Production Waste</option>
                  <option value="Cut Waste">Cut Waste</option>
                  <option value="Defective Material">Defective Material</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Quantity"
                  value={newRecord.quantity}
                  onChange={(e) => setNewRecord({...newRecord, quantity: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#8B7CF8' }}
                  required
                />
                
                <select
                  value={newRecord.unit}
                  onChange={(e) => setNewRecord({...newRecord, unit: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#8B7CF8' }}
                >
                  <option value="kg">kg</option>
                  <option value="m">m</option>
                  <option value="pieces">pieces</option>
                </select>
                
                <input
                  type="text"
                  placeholder="Reason"
                  value={newRecord.reason}
                  onChange={(e) => setNewRecord({...newRecord, reason: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#8B7CF8' }}
                />
                
                <select
                  value={newRecord.disposal_method}
                  onChange={(e) => setNewRecord({...newRecord, disposal_method: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#8B7CF8' }}
                >
                  <option value="Recycling">Recycling</option>
                  <option value="Store for future use">Store for future use</option>
                  <option value="Disposal">Disposal</option>
                </select>
              </div>
              
              <div className="flex space-x-2" style={{ width: 'fit-content' }}>
                <button
                  onClick={handleAddRecord}
                  disabled={loading}
                  className="flex items-center justify-center bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm flex-shrink-0"
                  style={{ width: '200px', height: '40px' }}
                >
                  {loading ? 'Adding...' : 'Add Record'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setShowProductDropdown(false)
                  }}
                  className="flex items-center justify-center bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm flex-shrink-0"
                  style={{ width: '200px', height: '40px' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Responsive Table View */}
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#8B7CF8' }}>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 rounded-tl-lg whitespace-nowrap">Date</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Source</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Product</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Waste Type</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Quantity</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Reason</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Disposal Method</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white rounded-tr-lg whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWaste.length > 0 ? filteredWaste.map((waste, index) => (
                <tr 
                  key={waste.id} 
                  className={`hover:bg-gray-50 border-b border-gray-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  {editingRecord && editingRecord.id === waste.id ? (
                    <>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="date"
                          value={editingRecord.date}
                          onChange={(e) => setEditingRecord({...editingRecord, date: e.target.value})}
                          className="w-full min-w-[100px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <select
                          value={editingRecord.source}
                          onChange={(e) => setEditingRecord({...editingRecord, source: e.target.value})}
                          className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Sales">Sales</option>
                        </select>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="text"
                          value={editingRecord.product}
                          onChange={(e) => setEditingRecord({...editingRecord, product: e.target.value})}
                          className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <select
                          value={editingRecord.waste_type}
                          onChange={(e) => setEditingRecord({...editingRecord, waste_type: e.target.value})}
                          className="w-full min-w-[100px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Production Waste">Production Waste</option>
                          <option value="Cut Waste">Cut Waste</option>
                          <option value="Defective Material">Defective Material</option>
                        </select>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <div className="flex space-x-1">
                          <input
                            type="number"
                            step="0.01"
                            value={editingRecord.quantity}
                            onChange={(e) => setEditingRecord({...editingRecord, quantity: e.target.value})}
                            className="w-16 px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <select
                            value={editingRecord.unit}
                            onChange={(e) => setEditingRecord({...editingRecord, unit: e.target.value})}
                            className="w-16 px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="kg">kg</option>
                            <option value="m">m</option>
                            <option value="pieces">pcs</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="text"
                          value={editingRecord.reason}
                          onChange={(e) => setEditingRecord({...editingRecord, reason: e.target.value})}
                          className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <select
                          value={editingRecord.disposal_method}
                          onChange={(e) => setEditingRecord({...editingRecord, disposal_method: e.target.value})}
                          className="w-full min-w-[100px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Recycling">Recycling</option>
                          <option value="Store for future use">Store for future use</option>
                          <option value="Disposal">Disposal</option>
                        </select>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleEditRecord(editingRecord)}
                            disabled={loading}
                            className="flex items-center justify-center bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50"
                            style={{ width: '60px', height: '32px' }}
                          >
                            <Save className="h-3 w-3" />
                            <span className="hidden sm:inline ml-1">{loading ? 'Saving...' : 'Save'}</span>
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex items-center justify-center bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                            style={{ width: '60px', height: '32px' }}
                          >
                            <X className="h-3 w-3" />
                            <span className="hidden sm:inline ml-1">Cancel</span>
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{formatDate(waste.date)}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{waste.source}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{waste.product}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <span className={`inline-flex px-1 md:px-2 py-1 text-xs font-medium rounded-full ${
                          waste.waste_type === 'Production Waste' 
                            ? 'bg-red-100 text-red-800' 
                            : waste.waste_type === 'Cut Waste'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {waste.waste_type}
                        </span>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{waste.quantity}{waste.unit}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{waste.reason}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{waste.disposal_method}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => startEdit(waste)}
                            className="flex items-center justify-center text-white rounded text-xs hover:opacity-90"
                            style={{ backgroundColor: '#8B7CF8', width: '60px', height: '32px' }}
                          >
                            <Edit2 className="h-3 w-3" />
                            <span className="hidden sm:inline ml-1">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteRecord(waste.id)}
                            disabled={loading}
                            className="flex items-center justify-center bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50"
                            style={{ width: '60px', height: '32px' }}
                          >
                            <Trash2 className="h-3 w-3" />
                            <span className="hidden sm:inline ml-1">Delete</span>
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-2 md:px-4 py-6 md:py-8 text-center text-gray-500 text-xs md:text-sm">
                    {searchQuery ? 'No waste records found matching your search.' : 'No waste records found. Add your first waste record to get started.'}
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