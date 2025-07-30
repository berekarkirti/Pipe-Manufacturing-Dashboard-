import { useState } from 'react'
import { Plus, Edit2, Trash2, Save, X, ChevronDown } from 'lucide-react'

export default function RawMaterials({ data = [], onRefresh = () => {} }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false)
  const [newMaterial, setNewMaterial] = useState({
    material_name: '',
    current_quantity: '',
    unit: '',
    remarks: ''
  })

  const handleAddMaterial = async () => {
    if (!newMaterial.material_name || !newMaterial.current_quantity || !newMaterial.unit) {
      alert('Please fill in all required fields')
      return
    }
    
    setLoading(true)
    try {
      // Simulated API call - replace with actual dbOperations.addRawMaterial
      console.log('Adding material:', {
        ...newMaterial,
        current_quantity: parseFloat(newMaterial.current_quantity)
      })
      
      // Reset form
      setNewMaterial({
        material_name: '',
        current_quantity: '',
        unit: '',
        remarks: ''
      })
      setShowAddForm(false)
      onRefresh()
    } catch (error) {
      console.error('Error adding material:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditMaterial = async (material) => {
    setLoading(true)
    try {
      // Simulated API call - replace with actual dbOperations.updateRawMaterial
      console.log('Updating material:', material.id, {
        material_name: material.material_name,
        current_quantity: parseFloat(material.current_quantity),
        unit: material.unit,
        remarks: material.remarks
      })
      
      setEditingMaterial(null)
      onRefresh()
    } catch (error) {
      console.error('Error updating material:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMaterial = async (materialId) => {
    if (!confirm('Are you sure you want to delete this material?')) return
    
    setLoading(true)
    try {
      // Simulated API call - replace with actual dbOperations.deleteRawMaterial
      console.log('Deleting material:', materialId)
      onRefresh()
    } catch (error) {
      console.error('Error deleting material:', error)
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (material) => {
    setEditingMaterial({ ...material })
  }

  const cancelEdit = () => {
    setEditingMaterial(null)
  }

  const selectExistingMaterial = (materialName) => {
    setNewMaterial({...newMaterial, material_name: materialName})
    setShowMaterialDropdown(false)
  }

  const selectAddNew = () => {
    setNewMaterial({...newMaterial, material_name: ''})
    setShowMaterialDropdown(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
          <button
            onClick={() => setShowAddForm(true)}
            disabled={loading}
            className="flex items-center justify-center space-x-2 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm"
            style={{ backgroundColor: '#8B7CF8', width: '200px', height: '40px' }}
          >
            <Plus className="h-4 w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">Add New Raw Material</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {showAddForm && (
          <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-base sm:text-lg font-medium mb-4">Add New Raw Material</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Material Name with Accordion Dropdown */}
                <div className="relative">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Material Name"
                      value={newMaterial.material_name}
                      onChange={(e) => setNewMaterial({...newMaterial, material_name: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                      style={{ '--tw-ring-color': '#8B7CF8' }}
                      required
                    />
                    <button
                      onClick={() => setShowMaterialDropdown(!showMaterialDropdown)}
                      className="flex items-center justify-center border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50 focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': '#8B7CF8', width: '40px', height: '42px' }}
                    >
                      <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showMaterialDropdown ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  
                  {/* Accordion Dropdown */}
                  {showMaterialDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {/* Add New Option */}
                      <button
                        onClick={selectAddNew}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 border-b border-gray-100 font-medium text-blue-600"
                      >
                        + Add New Material
                      </button>
                      
                      {/* Existing Materials */}
                      {data && data.length > 0 && (
                        <>
                          <div className="px-3 py-1 text-xs text-gray-500 bg-gray-50 font-medium">
                            Existing Materials
                          </div>
                          {data.map((material) => (
                            <button
                              key={material.id}
                              onClick={() => selectExistingMaterial(material.material_name)}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between"
                            >
                              <span>{material.material_name}</span>
                              <span className="text-xs text-gray-400">
                                {material.current_quantity} {material.unit}
                              </span>
                            </button>
                          ))}
                        </>
                      )}
                      
                      {(!data || data.length === 0) && (
                        <div className="px-3 py-4 text-sm text-gray-500 text-center">
                          No existing materials
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <input
                  type="number"
                  step="0.01"
                  placeholder="Quantity"
                  value={newMaterial.current_quantity}
                  onChange={(e) => setNewMaterial({...newMaterial, current_quantity: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#8B7CF8' }}
                  required
                />
                <input
                  type="text"
                  placeholder="Unit (kg, liters, etc.)"
                  value={newMaterial.unit}
                  onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#8B7CF8' }}
                  required
                />
                <input
                  type="text"
                  placeholder="Remarks"
                  value={newMaterial.remarks}
                  onChange={(e) => setNewMaterial({...newMaterial, remarks: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#8B7CF8' }}
                />
              </div>
              <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2">
                <button
                  onClick={handleAddMaterial}
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm sm:text-base"
                >
                  {loading ? 'Adding...' : 'Add Material'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setShowMaterialDropdown(false)
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Responsive Table View */}
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#8B7CF8' }}>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 rounded-tl-lg whitespace-nowrap">Material Name</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Current Quantity</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Unit</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Remarks</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white rounded-tr-lg whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? data.map((material, index) => (
                <tr 
                  key={material.id} 
                  className={`hover:bg-gray-50 border-b border-gray-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  {editingMaterial && editingMaterial.id === material.id ? (
                    <>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="text"
                          value={editingMaterial.material_name}
                          onChange={(e) => setEditingMaterial({...editingMaterial, material_name: e.target.value})}
                          className="w-full min-w-[100px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          value={editingMaterial.current_quantity}
                          onChange={(e) => setEditingMaterial({...editingMaterial, current_quantity: e.target.value})}
                          className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="text"
                          value={editingMaterial.unit}
                          onChange={(e) => setEditingMaterial({...editingMaterial, unit: e.target.value})}
                          className="w-full min-w-[60px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                        <input
                          type="text"
                          value={editingMaterial.remarks || ''}
                          onChange={(e) => setEditingMaterial({...editingMaterial, remarks: e.target.value})}
                          className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleEditMaterial(editingMaterial)}
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
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900 border-r border-gray-200">{material.material_name}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{material.current_quantity}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{material.unit}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{material.remarks || '-'}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => startEdit(material)}
                            className="flex items-center justify-center text-white rounded text-xs hover:opacity-90"
                            style={{ backgroundColor: '#8B7CF8', width: '60px', height: '32px' }}
                          >
                            <Edit2 className="h-3 w-3" />
                            <span className="hidden sm:inline ml-1">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteMaterial(material.id)}
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
                  <td colSpan="5" className="px-2 md:px-4 py-6 md:py-8 text-center text-gray-500 text-xs md:text-sm">
                    No raw materials found. Add some materials to get started.
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