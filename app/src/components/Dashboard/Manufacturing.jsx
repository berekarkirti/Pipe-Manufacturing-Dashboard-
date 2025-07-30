// import { useState } from 'react'
// import { Plus, Edit2, Trash2, Save, X, ChevronDown } from 'lucide-react'

// export default function Manufacturing({ data = [], onRefresh = () => {} }) {
//   const [showAddForm, setShowAddForm] = useState(false)
//   const [editingRecord, setEditingRecord] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [showProductDropdown, setShowProductDropdown] = useState(false)
//   const [showBrandDropdown, setShowBrandDropdown] = useState(false)
//   const [showMaterialDropdown, setShowMaterialDropdown] = useState({})
//   const [newRecord, setNewRecord] = useState({
//     brand_name: '',
//     product_name: '',
//     raw_materials: [{ material_name: '', quantity: '', unit: '', remark: '' }],
//     total_waste: '',
//     manufactured_pieces: [{ length: '', quantity: '', unit: 'm' }],
//     date: new Date().toISOString().split('T')[0]
//   })

//   // Use data from props (comes from database backend)
//   const displayData = data

//   // Get unique brand names, product names, and material names from existing data
//   const uniqueBrands = [...new Set(displayData.map(item => item.brand_name).filter(Boolean))]
//   const uniqueProducts = [...new Set(displayData.map(item => item.product_name).filter(Boolean))]
//   const uniqueMaterials = [...new Set(
//     displayData.flatMap(item => 
//       item.raw_materials?.map(material => material.material_name) || []
//     ).filter(Boolean)
//   )]

//   const addRawMaterial = () => {
//     setNewRecord({
//       ...newRecord,
//       raw_materials: [...newRecord.raw_materials, { material_name: '', quantity: '', unit: '', remark: '' }]
//     })
//   }

//   const removeRawMaterial = (index) => {
//     const updatedMaterials = newRecord.raw_materials.filter((_, i) => i !== index)
//     setNewRecord({ ...newRecord, raw_materials: updatedMaterials })
//   }

//   const updateRawMaterial = (index, field, value) => {
//     const updatedMaterials = [...newRecord.raw_materials]
//     updatedMaterials[index][field] = value
//     setNewRecord({ ...newRecord, raw_materials: updatedMaterials })
//   }

//   const addManufacturedPiece = () => {
//     setNewRecord({
//       ...newRecord,
//       manufactured_pieces: [...newRecord.manufactured_pieces, { length: '', quantity: '', unit: 'm' }]
//     })
//   }

//   const removeManufacturedPiece = (index) => {
//     const updatedPieces = newRecord.manufactured_pieces.filter((_, i) => i !== index)
//     setNewRecord({ ...newRecord, manufactured_pieces: updatedPieces })
//   }

//   const updateManufacturedPiece = (index, field, value) => {
//     const updatedPieces = [...newRecord.manufactured_pieces]
//     updatedPieces[index][field] = value
//     setNewRecord({ ...newRecord, manufactured_pieces: updatedPieces })
//   }

//   const handleAddRecord = async () => {
//     if (!newRecord.brand_name || !newRecord.product_name || !newRecord.total_waste) {
//       alert('Please fill in all required fields')
//       return
//     }

//     setLoading(true)
//     try {
//       console.log('Adding manufacturing record:', newRecord)
      
//       setNewRecord({
//         brand_name: '',
//         product_name: '',
//         raw_materials: [{ material_name: '', quantity: '', unit: '', remark: '' }],
//         total_waste: '',
//         manufactured_pieces: [{ length: '', quantity: '', unit: 'm' }],
//         date: new Date().toISOString().split('T')[0]
//       })
//       setShowAddForm(false)
//       setShowBrandDropdown(false)
//       setShowProductDropdown(false)
//       setShowMaterialDropdown({})
//       onRefresh()
//     } catch (error) {
//       console.error('Error adding manufacturing record:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleEditRecord = async (record) => {
//     setLoading(true)
//     try {
//       console.log('Updating manufacturing record:', record.id, record)
//       setEditingRecord(null)
//       onRefresh()
//     } catch (error) {
//       console.error('Error updating manufacturing record:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDeleteRecord = async (recordId) => {
//     if (!confirm('Are you sure you want to delete this manufacturing record?')) return
    
//     setLoading(true)
//     try {
//       console.log('Deleting manufacturing record:', recordId)
//       onRefresh()
//     } catch (error) {
//       console.error('Error deleting manufacturing record:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const startEdit = (record) => {
//     setEditingRecord({ ...record })
//   }

//   const cancelEdit = () => {
//     setEditingRecord(null)
//   }

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-GB')
//   }

//   // Calculate totals for raw materials
//   const calculateRawMaterialTotals = (rawMaterials) => {
//     const totals = {}
//     rawMaterials?.forEach(material => {
//       if (material.material_name && material.quantity) {
//         const key = `${material.material_name}_${material.unit}`
//         if (totals[key]) {
//           totals[key].quantity += parseFloat(material.quantity)
//         } else {
//           totals[key] = {
//             material_name: material.material_name,
//             quantity: parseFloat(material.quantity),
//             unit: material.unit
//           }
//         }
//       }
//     })
//     return Object.values(totals)
//   }

//   // Calculate totals for manufactured pieces
//   const calculateManufacturedTotals = (manufacturedPieces) => {
//     const totals = {}
//     let grandTotalPieces = 0
//     let grandTotalLength = 0
    
//     manufacturedPieces?.forEach(piece => {
//       if (piece.length && piece.quantity && piece.unit) {
//         const key = `${piece.length}_${piece.unit}`
//         const qty = parseInt(piece.quantity)
//         const length = parseFloat(piece.length)
//         const totalLength = length * qty
        
//         grandTotalPieces += qty
//         grandTotalLength += totalLength
        
//         if (totals[key]) {
//           totals[key].quantity += qty
//         } else {
//           totals[key] = {
//             length: piece.length,
//             quantity: qty,
//             unit: piece.unit
//           }
//         }
//       }
//     })
//     return { 
//       breakdown: Object.values(totals), 
//       grandTotalPieces, 
//       grandTotalLength: grandTotalLength.toFixed(1),
//       unit: manufacturedPieces?.[0]?.unit || 'm'
//     }
//   }

//   const selectExistingBrand = (brandName) => {
//     setNewRecord({...newRecord, brand_name: brandName})
//     setShowBrandDropdown(false)
//   }

//   const selectAddNewBrand = () => {
//     setNewRecord({...newRecord, brand_name: ''})
//     setShowBrandDropdown(false)
//   }

//   const selectExistingProduct = (productName) => {
//     setNewRecord({...newRecord, product_name: productName})
//     setShowProductDropdown(false)
//   }

//   const selectAddNewProduct = () => {
//     setNewRecord({...newRecord, product_name: ''})
//     setShowProductDropdown(false)
//   }

//   const toggleMaterialDropdown = (index) => {
//     setShowMaterialDropdown(prev => ({
//       ...prev,
//       [index]: !prev[index]
//     }))
//   }

//   const selectExistingMaterial = (index, materialName) => {
//     updateRawMaterial(index, 'material_name', materialName)
//     setShowMaterialDropdown(prev => ({ ...prev, [index]: false }))
//   }

//   const selectAddNewMaterial = (index) => {
//     updateRawMaterial(index, 'material_name', '')
//     setShowMaterialDropdown(prev => ({ ...prev, [index]: false }))
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
//       <div className="p-4 sm:p-6 border-b border-gray-200">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
//           <div className="flex items-center space-x-3">
//             <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: '#8B7CF8' }}></div>
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Manufacturing Process</h2>
//           </div>
//           <button
//             onClick={() => setShowAddForm(true)}
//             disabled={loading}
//             className="flex items-center justify-center space-x-2 text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm"
//             style={{ backgroundColor: '#8B7CF8', width: '200px', height: '40px' }}
//           >
//             <Plus className="h-4 w-4 flex-shrink-0" />
//             <span className="whitespace-nowrap">Add New Record</span>
//           </button>
//         </div>
//       </div>

//       <div className="p-4 sm:p-6">
//         {showAddForm && (
//           <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
//             <h3 className="text-base sm:text-lg font-medium mb-4">Add New Manufacturing Record</h3>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                 {/* Brand Name with Accordion */}
//                 <div className="relative">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
//                   <div className="flex">
//                     <input
//                       type="text"
//                       placeholder="Brand Name"
//                       value={newRecord.brand_name}
//                       onChange={(e) => setNewRecord({...newRecord, brand_name: e.target.value})}
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 text-sm"
//                       style={{ '--tw-ring-color': '#8B7CF8' }}
//                       required
//                     />
//                     <button
//                       onClick={() => setShowBrandDropdown(!showBrandDropdown)}
//                       className="flex items-center justify-center border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50 focus:outline-none focus:ring-2"
//                       style={{ '--tw-ring-color': '#8B7CF8', width: '40px', height: '42px' }}
//                     >
//                       <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showBrandDropdown ? 'rotate-180' : ''}`} />
//                     </button>
//                   </div>
                  
//                   {showBrandDropdown && (
//                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       <button
//                         onClick={selectAddNewBrand}
//                         className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 border-b border-gray-100 font-medium text-blue-600"
//                       >
//                         + Add New Brand
//                       </button>
                      
//                       {uniqueBrands.length > 0 && (
//                         <>
//                           <div className="px-3 py-1 text-xs text-gray-500 bg-gray-50 font-medium">
//                             Existing Brands
//                           </div>
//                           {uniqueBrands.map((brand, index) => (
//                             <button
//                               key={index}
//                               onClick={() => selectExistingBrand(brand)}
//                               className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
//                             >
//                               {brand}
//                             </button>
//                           ))}
//                         </>
//                       )}
                      
//                       {uniqueBrands.length === 0 && (
//                         <div className="px-3 py-4 text-sm text-gray-500 text-center">
//                           No existing brands
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Product Name with Accordion */}
//                 <div className="relative">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
//                   <div className="flex">
//                     <input
//                       type="text"
//                       placeholder="Product Name"
//                       value={newRecord.product_name}
//                       onChange={(e) => setNewRecord({...newRecord, product_name: e.target.value})}
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 text-sm"
//                       style={{ '--tw-ring-color': '#8B7CF8' }}
//                       required
//                     />
//                     <button
//                       onClick={() => setShowProductDropdown(!showProductDropdown)}
//                       className="flex items-center justify-center border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50 focus:outline-none focus:ring-2"
//                       style={{ '--tw-ring-color': '#8B7CF8', width: '40px', height: '42px' }}
//                     >
//                       <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showProductDropdown ? 'rotate-180' : ''}`} />
//                     </button>
//                   </div>
                  
//                   {showProductDropdown && (
//                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       <button
//                         onClick={selectAddNewProduct}
//                         className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 border-b border-gray-100 font-medium text-blue-600"
//                       >
//                         + Add New Product
//                       </button>
                      
//                       {uniqueProducts.length > 0 && (
//                         <>
//                           <div className="px-3 py-1 text-xs text-gray-500 bg-gray-50 font-medium">
//                             Existing Products
//                           </div>
//                           {uniqueProducts.map((product, index) => (
//                             <button
//                               key={index}
//                               onClick={() => selectExistingProduct(product)}
//                               className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
//                             >
//                               {product}
//                             </button>
//                           ))}
//                         </>
//                       )}
                      
//                       {uniqueProducts.length === 0 && (
//                         <div className="px-3 py-4 text-sm text-gray-500 text-center">
//                           No existing products
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Raw Materials Section */}
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-medium text-gray-700">Raw Materials</label>
//                   <button
//                     onClick={addRawMaterial}
//                     className="flex items-center justify-center bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
//                     style={{ width: '80px', height: '28px' }}
//                   >
//                     <Plus className="h-3 w-3 mr-1" />
//                     Add
//                   </button>
//                 </div>
//                 {newRecord.raw_materials.map((material, index) => (
//                   <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2 p-2 border border-gray-200 rounded">
//                     {/* Material Name with Accordion */}
//                     <div className="relative">
//                       <div className="flex">
//                         <input
//                           type="text"
//                           placeholder="Material Name"
//                           value={material.material_name}
//                           onChange={(e) => updateRawMaterial(index, 'material_name', e.target.value)}
//                           className="flex-1 px-2 py-1 border border-gray-300 rounded-l text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         />
//                         <button
//                           onClick={() => toggleMaterialDropdown(index)}
//                           className="px-2 py-1 border border-l-0 border-gray-300 rounded-r hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           style={{ width: '28px' }}
//                         >
//                           <ChevronDown className={`h-3 w-3 text-gray-500 transition-transform ${showMaterialDropdown[index] ? 'rotate-180' : ''}`} />
//                         </button>
//                       </div>
                      
//                       {/* Material Accordion Dropdown */}
//                       {showMaterialDropdown[index] && (
//                         <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
//                           {/* Add New Option */}
//                           <button
//                             onClick={() => selectAddNewMaterial(index)}
//                             className="w-full px-2 py-1 text-left text-xs hover:bg-blue-50 border-b border-gray-100 font-medium text-blue-600"
//                           >
//                             + Add New Material
//                           </button>
                          
//                           {/* Existing Materials */}
//                           {uniqueMaterials.length > 0 && (
//                             <>
//                               <div className="px-2 py-1 text-xs text-gray-500 bg-gray-50 font-medium">
//                                 Existing Materials
//                               </div>
//                               {uniqueMaterials.map((matName, matIndex) => (
//                                 <button
//                                   key={matIndex}
//                                   onClick={() => selectExistingMaterial(index, matName)}
//                                   className="w-full px-2 py-1 text-left text-xs hover:bg-gray-50"
//                                 >
//                                   {matName}
//                                 </button>
//                               ))}
//                             </>
//                           )}
                          
//                           {uniqueMaterials.length === 0 && (
//                             <div className="px-2 py-2 text-xs text-gray-500 text-center">
//                               No existing materials
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
                    
//                     <input
//                       type="number"
//                       step="0.01"
//                       placeholder="Quantity"
//                       value={material.quantity}
//                       onChange={(e) => updateRawMaterial(index, 'quantity', e.target.value)}
//                       className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Unit (kg, liter)"
//                       value={material.unit}
//                       onChange={(e) => updateRawMaterial(index, 'unit', e.target.value)}
//                       className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                     <div className="flex space-x-1">
//                       <input
//                         type="text"
//                         placeholder="Remark"
//                         value={material.remark}
//                         onChange={(e) => updateRawMaterial(index, 'remark', e.target.value)}
//                         className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                       />
//                       {newRecord.raw_materials.length > 1 && (
//                         <button
//                           onClick={() => removeRawMaterial(index)}
//                           className="flex items-center justify-center bg-red-600 text-white rounded text-xs hover:bg-red-700"
//                           style={{ width: '28px', height: '28px' }}
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Total Waste */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Total Waste (kg)</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   placeholder="Total Waste"
//                   value={newRecord.total_waste}
//                   onChange={(e) => setNewRecord({...newRecord, total_waste: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
//                   style={{ '--tw-ring-color': '#8B7CF8' }}
//                   required
//                 />
//               </div>

//               {/* Manufactured Pieces Section */}
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-medium text-gray-700">Manufactured Pieces</label>
//                   <button
//                     onClick={addManufacturedPiece}
//                     className="flex items-center justify-center bg-green-600 text-white rounded text-xs hover:bg-green-700"
//                     style={{ width: '80px', height: '28px' }}
//                   >
//                     <Plus className="h-3 w-3 mr-1" />
//                     Add
//                   </button>
//                 </div>
//                 {newRecord.manufactured_pieces.map((piece, index) => (
//                   <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2 p-2 border border-gray-200 rounded">
//                     <input
//                       type="number"
//                       step="0.01"
//                       placeholder="Length/Size"
//                       value={piece.length}
//                       onChange={(e) => updateManufacturedPiece(index, 'length', e.target.value)}
//                       className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                     <input
//                       type="number"
//                       placeholder="Quantity"
//                       value={piece.quantity}
//                       onChange={(e) => updateManufacturedPiece(index, 'quantity', e.target.value)}
//                       className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                     <div className="flex space-x-1">
//                       <select
//                         value={piece.unit}
//                         onChange={(e) => updateManufacturedPiece(index, 'unit', e.target.value)}
//                         className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                       >
//                         <option value="m">meters</option>
//                         <option value="pieces">pieces</option>
//                         <option value="ft">feet</option>
//                       </select>
//                       {newRecord.manufactured_pieces.length > 1 && (
//                         <button
//                           onClick={() => removeManufacturedPiece(index)}
//                           className="flex items-center justify-center bg-red-600 text-white rounded text-xs hover:bg-red-700"
//                           style={{ width: '28px', height: '28px' }}
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//                 <input
//                   type="date"
//                   value={newRecord.date}
//                   onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
//                   style={{ '--tw-ring-color': '#8B7CF8' }}
//                   required
//                 />
//               </div>

//               {/* Form Buttons */}
//               <div className="flex space-x-2" style={{ width: 'fit-content' }}>
//                 <button
//                   onClick={handleAddRecord}
//                   disabled={loading}
//                   className="flex items-center justify-center bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm flex-shrink-0"
//                   style={{ width: '200px', height: '40px' }}
//                 >
//                   {loading ? 'Saving...' : 'Save Record'}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowAddForm(false)
//                     setShowBrandDropdown(false)
//                     setShowProductDropdown(false)
//                     setShowMaterialDropdown({})
//                   }}
//                   className="flex items-center justify-center bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm flex-shrink-0"
//                   style={{ width: '200px', height: '40px' }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Table */}
//         <div className="overflow-x-auto border border-gray-300 rounded-lg">
//           <table className="w-full min-w-[1200px] border-collapse">
//             <thead>
//               <tr style={{ backgroundColor: '#8B7CF8' }}>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 rounded-tl-lg whitespace-nowrap">ID</th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Brand Name</th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Product Name</th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Total Raw Material</th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Total Waste</th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Total Manufactured</th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Date</th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white rounded-tr-lg whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {displayData && displayData.length > 0 ? displayData.map((record, index) => (
//                 <tr 
//                   key={record.id} 
//                   className={`hover:bg-gray-50 border-b border-gray-200 ${
//                     index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
//                   }`}
//                 >
//                   <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900 border-r border-gray-200">#{record.id}</td>
//                   <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{record.brand_name}</td>
//                   <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{record.product_name}</td>
//                   <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-600 border-r border-gray-200">
//                     <div className="space-y-2">
//                       {/* Totals summary only */}
//                       {record.raw_materials && record.raw_materials.length > 0 && (
//                         <>
//                           <div className="text-xs text-gray-500 font-medium">Material Totals:</div>
//                           {calculateRawMaterialTotals(record.raw_materials).map((total, idx) => (
//                             <div key={idx} className="flex justify-between text-xs font-medium text-gray-700">
//                               <span>{total.material_name}: {total.quantity}{total.unit}</span>
//                             </div>
//                           ))}
//                         </>
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{record.total_waste}kg</td>
//                   <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-600 border-r border-gray-200">
//                     <div className="space-y-2">
//                       {/* Size totals only */}
//                       {record.manufactured_pieces && record.manufactured_pieces.length > 0 && (
//                         <>
//                           <div className="text-xs text-gray-500 font-medium">Size Totals:</div>
//                           {calculateManufacturedTotals(record.manufactured_pieces).breakdown.map((total, idx) => (
//                             <div key={idx} className="text-xs font-medium text-gray-700">
//                               {total.length}{total.unit} × {total.quantity} pieces
//                             </div>
//                           ))}
                          
//                           {/* Grand Total */}
//                           <hr className="my-1 border-gray-200" />
//                           <div className="space-y-1">
//                             <div className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded">
//                               Total Pieces: {calculateManufacturedTotals(record.manufactured_pieces).grandTotalPieces}
//                             </div>
//                             <div className="text-xs font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded">
//                               Total Length: {calculateManufacturedTotals(record.manufactured_pieces).grandTotalLength}{calculateManufacturedTotals(record.manufactured_pieces).unit}
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{formatDate(record.date)}</td>
//                   <td className="px-2 md:px-4 py-2 md:py-3">
//                     <div className="flex space-x-1">
//                       <button
//                         onClick={() => startEdit(record)}
//                         className="flex items-center justify-center text-white rounded text-xs hover:opacity-90"
//                         style={{ backgroundColor: '#8B7CF8', width: '60px', height: '32px' }}
//                       >
//                         <Edit2 className="h-3 w-3" />
//                         <span className="hidden sm:inline ml-1">Edit</span>
//                       </button>
//                       <button
//                         onClick={() => handleDeleteRecord(record.id)}
//                         disabled={loading}
//                         className="flex items-center justify-center bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50"
//                         style={{ width: '60px', height: '32px' }}
//                       >
//                         <Trash2 className="h-3 w-3" />
//                         <span className="hidden sm:inline ml-1">Delete</span>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr>
//                   <td colSpan="8" className="px-2 md:px-4 py-6 md:py-8 text-center text-gray-500 text-xs md:text-sm">
//                     No manufacturing records found. Add your first record to get started.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'
import { Plus, Edit2, Trash2, Save, X, ChevronDown } from 'lucide-react'

export default function Manufacturing({ data = [], onRefresh = () => {} }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showProductDropdown, setShowProductDropdown] = useState(false)
  const [showBrandDropdown, setShowBrandDropdown] = useState(false)
  const [showMaterialDropdown, setShowMaterialDropdown] = useState({})
  const [newRecord, setNewRecord] = useState({
    brand_name: '',
    product_name: '',
    raw_materials: [{ material_name: '', quantity: '', unit: '', remark: '' }],
    total_waste: '',
    manufactured_pieces: [{ length: '', quantity: '', unit: 'm' }],
    date: new Date().toISOString().split('T')[0]
  })

  // Use data from props (comes from database backend)
  const displayData = data

  // Get unique brand names, product names, and material names from existing data
  const uniqueBrands = [...new Set(displayData.map(item => item.brand_name).filter(Boolean))]
  const uniqueProducts = [...new Set(displayData.map(item => item.product_name).filter(Boolean))]
  const uniqueMaterials = [...new Set(
    displayData.flatMap(item => 
      item.raw_materials?.map(material => material.material_name) || []
    ).filter(Boolean)
  )]

  const addRawMaterial = () => {
    setNewRecord({
      ...newRecord,
      raw_materials: [...newRecord.raw_materials, { material_name: '', quantity: '', unit: '', remark: '' }]
    })
  }

  const removeRawMaterial = (index) => {
    const updatedMaterials = newRecord.raw_materials.filter((_, i) => i !== index)
    setNewRecord({ ...newRecord, raw_materials: updatedMaterials })
  }

  const updateRawMaterial = (index, field, value) => {
    const updatedMaterials = [...newRecord.raw_materials]
    updatedMaterials[index][field] = value
    setNewRecord({ ...newRecord, raw_materials: updatedMaterials })
  }

  const addManufacturedPiece = () => {
    setNewRecord({
      ...newRecord,
      manufactured_pieces: [...newRecord.manufactured_pieces, { length: '', quantity: '', unit: 'm' }]
    })
  }

  const removeManufacturedPiece = (index) => {
    const updatedPieces = newRecord.manufactured_pieces.filter((_, i) => i !== index)
    setNewRecord({ ...newRecord, manufactured_pieces: updatedPieces })
  }

  const updateManufacturedPiece = (index, field, value) => {
    const updatedPieces = [...newRecord.manufactured_pieces]
    updatedPieces[index][field] = value
    setNewRecord({ ...newRecord, manufactured_pieces: updatedPieces })
  }

  const handleAddRecord = async () => {
    if (!newRecord.brand_name || !newRecord.product_name || !newRecord.total_waste) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      console.log('Adding manufacturing record:', newRecord)
      
      setNewRecord({
        brand_name: '',
        product_name: '',
        raw_materials: [{ material_name: '', quantity: '', unit: '', remark: '' }],
        total_waste: '',
        manufactured_pieces: [{ length: '', quantity: '', unit: 'm' }],
        date: new Date().toISOString().split('T')[0]
      })
      setShowAddForm(false)
      setShowBrandDropdown(false)
      setShowProductDropdown(false)
      setShowMaterialDropdown({})
      onRefresh()
    } catch (error) {
      console.error('Error adding manufacturing record:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditRecord = async (record) => {
    setLoading(true)
    try {
      console.log('Updating manufacturing record:', record.id, record)
      setEditingRecord(null)
      onRefresh()
    } catch (error) {
      console.error('Error updating manufacturing record:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRecord = async (recordId) => {
    if (!confirm('Are you sure you want to delete this manufacturing record?')) return
    
    setLoading(true)
    try {
      console.log('Deleting manufacturing record:', recordId)
      onRefresh()
    } catch (error) {
      console.error('Error deleting manufacturing record:', error)
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB')
  }

  // Calculate totals for raw materials
  const calculateRawMaterialTotals = (rawMaterials) => {
    const totals = {}
    rawMaterials?.forEach(material => {
      if (material.material_name && material.quantity) {
        const key = `${material.material_name}_${material.unit}`
        if (totals[key]) {
          totals[key].quantity += parseFloat(material.quantity)
        } else {
          totals[key] = {
            material_name: material.material_name,
            quantity: parseFloat(material.quantity),
            unit: material.unit
          }
        }
      }
    })
    return Object.values(totals)
  }

  // Calculate totals for manufactured pieces
  const calculateManufacturedTotals = (manufacturedPieces) => {
    const totals = {}
    let grandTotalPieces = 0
    let grandTotalLength = 0
    
    manufacturedPieces?.forEach(piece => {
      if (piece.length && piece.quantity && piece.unit) {
        const key = `${piece.length}_${piece.unit}`
        const qty = parseInt(piece.quantity)
        const length = parseFloat(piece.length)
        const totalLength = length * qty
        
        grandTotalPieces += qty
        grandTotalLength += totalLength
        
        if (totals[key]) {
          totals[key].quantity += qty
        } else {
          totals[key] = {
            length: piece.length,
            quantity: qty,
            unit: piece.unit
          }
        }
      }
    })
    return { 
      breakdown: Object.values(totals), 
      grandTotalPieces, 
      grandTotalLength: grandTotalLength.toFixed(1),
      unit: manufacturedPieces?.[0]?.unit || 'm'
    }
  }

  const selectExistingBrand = (brandName) => {
    setNewRecord({...newRecord, brand_name: brandName})
    setShowBrandDropdown(false)
  }

  const selectAddNewBrand = () => {
    setNewRecord({...newRecord, brand_name: ''})
    setShowBrandDropdown(false)
  }

  const selectExistingProduct = (productName) => {
    setNewRecord({...newRecord, product_name: productName})
    setShowProductDropdown(false)
  }

  const selectAddNewProduct = () => {
    setNewRecord({...newRecord, product_name: ''})
    setShowProductDropdown(false)
  }

  const toggleMaterialDropdown = (index) => {
    setShowMaterialDropdown(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const selectExistingMaterial = (index, materialName) => {
    updateRawMaterial(index, 'material_name', materialName)
    setShowMaterialDropdown(prev => ({ ...prev, [index]: false }))
  }

  const selectAddNewMaterial = (index) => {
    updateRawMaterial(index, 'material_name', '')
    setShowMaterialDropdown(prev => ({ ...prev, [index]: false }))
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: '#8B7CF8' }}></div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Manufacturing Process</h2>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            disabled={loading}
            className="flex items-center justify-center space-x-2 text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm"
            style={{ backgroundColor: '#8B7CF8', width: '200px', height: '40px' }}
          >
            <Plus className="h-4 w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">Add New Record</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {showAddForm && (
          <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-base sm:text-lg font-medium mb-4">Add New Manufacturing Record</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Brand Name with Accordion */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Brand Name"
                      value={newRecord.brand_name}
                      onChange={(e) => setNewRecord({...newRecord, brand_name: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 text-sm"
                      style={{ '--tw-ring-color': '#8B7CF8' }}
                      required
                    />
                    <button
                      onClick={() => setShowBrandDropdown(!showBrandDropdown)}
                      className="flex items-center justify-center border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50 focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': '#8B7CF8', width: '40px', height: '42px' }}
                    >
                      <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showBrandDropdown ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  
                  {showBrandDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <button
                        onClick={selectAddNewBrand}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 border-b border-gray-100 font-medium text-blue-600"
                      >
                        + Add New Brand
                      </button>
                      
                      {uniqueBrands.length > 0 && (
                        <>
                          <div className="px-3 py-1 text-xs text-gray-500 bg-gray-50 font-medium">
                            Existing Brands
                          </div>
                          {uniqueBrands.map((brand, index) => (
                            <button
                              key={index}
                              onClick={() => selectExistingBrand(brand)}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                            >
                              {brand}
                            </button>
                          ))}
                        </>
                      )}
                      
                      {uniqueBrands.length === 0 && (
                        <div className="px-3 py-4 text-sm text-gray-500 text-center">
                          No existing brands
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Product Name with Accordion */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={newRecord.product_name}
                      onChange={(e) => setNewRecord({...newRecord, product_name: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 text-sm"
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
              </div>

              {/* Raw Materials Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Raw Materials</label>
                  <button
                    onClick={addRawMaterial}
                    className="flex items-center justify-center bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                    style={{ width: '80px', height: '28px' }}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </button>
                </div>
                {newRecord.raw_materials.map((material, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2 p-2 border border-gray-200 rounded">
                    {/* Material Name with Accordion */}
                    <div className="relative">
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Material Name"
                          value={material.material_name}
                          onChange={(e) => updateRawMaterial(index, 'material_name', e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded-l text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => toggleMaterialDropdown(index)}
                          className="px-2 py-1 border border-l-0 border-gray-300 rounded-r hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          style={{ width: '28px' }}
                        >
                          <ChevronDown className={`h-3 w-3 text-gray-500 transition-transform ${showMaterialDropdown[index] ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      
                      {/* Material Accordion Dropdown */}
                      {showMaterialDropdown[index] && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {/* Add New Option */}
                          <button
                            onClick={() => selectAddNewMaterial(index)}
                            className="w-full px-2 py-1 text-left text-xs hover:bg-blue-50 border-b border-gray-100 font-medium text-blue-600"
                          >
                            + Add New Material
                          </button>
                          
                          {/* Existing Materials */}
                          {uniqueMaterials.length > 0 && (
                            <>
                              <div className="px-2 py-1 text-xs text-gray-500 bg-gray-50 font-medium">
                                Existing Materials
                              </div>
                              {uniqueMaterials.map((matName, matIndex) => (
                                <button
                                  key={matIndex}
                                  onClick={() => selectExistingMaterial(index, matName)}
                                  className="w-full px-2 py-1 text-left text-xs hover:bg-gray-50"
                                >
                                  {matName}
                                </button>
                              ))}
                            </>
                          )}
                          
                          {uniqueMaterials.length === 0 && (
                            <div className="px-2 py-2 text-xs text-gray-500 text-center">
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
                      value={material.quantity}
                      onChange={(e) => updateRawMaterial(index, 'quantity', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Unit (kg, liter)"
                      value={material.unit}
                      onChange={(e) => updateRawMaterial(index, 'unit', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex space-x-1">
                      <input
                        type="text"
                        placeholder="Remark"
                        value={material.remark}
                        onChange={(e) => updateRawMaterial(index, 'remark', e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      {newRecord.raw_materials.length > 1 && (
                        <button
                          onClick={() => removeRawMaterial(index)}
                          className="flex items-center justify-center bg-red-600 text-white rounded text-xs hover:bg-red-700"
                          style={{ width: '28px', height: '28px' }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Waste */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Waste (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Total Waste"
                  value={newRecord.total_waste}
                  onChange={(e) => setNewRecord({...newRecord, total_waste: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ '--tw-ring-color': '#8B7CF8' }}
                  required
                />
              </div>

              {/* Manufactured Pieces Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Manufactured Pieces</label>
                  <button
                    onClick={addManufacturedPiece}
                    className="flex items-center justify-center bg-green-600 text-white rounded text-xs hover:bg-green-700"
                    style={{ width: '80px', height: '28px' }}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </button>
                </div>
                {newRecord.manufactured_pieces.map((piece, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2 p-2 border border-gray-200 rounded">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Length/Size"
                      value={piece.length}
                      onChange={(e) => updateManufacturedPiece(index, 'length', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={piece.quantity}
                      onChange={(e) => updateManufacturedPiece(index, 'quantity', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex space-x-1">
                      <select
                        value={piece.unit}
                        onChange={(e) => updateManufacturedPiece(index, 'unit', e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="m">meters</option>
                        <option value="pieces">pieces</option>
                        <option value="ft">feet</option>
                      </select>
                      {newRecord.manufactured_pieces.length > 1 && (
                        <button
                          onClick={() => removeManufacturedPiece(index)}
                          className="flex items-center justify-center bg-red-600 text-white rounded text-xs hover:bg-red-700"
                          style={{ width: '28px', height: '28px' }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ '--tw-ring-color': '#8B7CF8' }}
                  required
                />
              </div>

              {/* Form Buttons */}
              <div className="flex space-x-2" style={{ width: 'fit-content' }}>
                <button
                  onClick={handleAddRecord}
                  disabled={loading}
                  className="flex items-center justify-center bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm flex-shrink-0"
                  style={{ width: '200px', height: '40px' }}
                >
                  {loading ? 'Saving...' : 'Save Record'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setShowBrandDropdown(false)
                    setShowProductDropdown(false)
                    setShowMaterialDropdown({})
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

        {/* Table */}
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#8B7CF8' }}>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 rounded-tl-lg whitespace-nowrap">ID</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Brand Name</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Product Name</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Total Raw Material</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Remarks</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Total Waste</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Total Manufactured</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">Date</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white rounded-tr-lg whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayData && displayData.length > 0 ? displayData.map((record, index) => (
                <tr 
                  key={record.id} 
                  className={`hover:bg-gray-50 border-b border-gray-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900 border-r border-gray-200">#{record.id}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{record.brand_name}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{record.product_name}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-600 border-r border-gray-200">
                    <div className="space-y-2">
                      {/* Totals summary only */}
                      {record.raw_materials && record.raw_materials.length > 0 && (
                        <>
                          <div className="text-xs text-gray-500 font-medium">Material Totals:</div>
                          {calculateRawMaterialTotals(record.raw_materials).map((total, idx) => (
                            <div key={idx} className="flex justify-between text-xs font-medium text-gray-700">
                              <span>{total.material_name}: {total.quantity}{total.unit}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-600 border-r border-gray-200">
                    <div className="space-y-1">
                      {record.raw_materials && record.raw_materials.length > 0 && (
                        record.raw_materials.map((material, idx) => (
                          material.remark && (
                            <div key={idx} className="text-xs text-gray-600">
                              <span className="font-medium">{material.material_name}:</span> {material.remark}
                            </div>
                          )
                        ))
                      )}
                      {(!record.raw_materials || record.raw_materials.every(m => !m.remark)) && (
                        <span className="text-xs text-gray-400">No remarks</span>
                      )}
                    </div>
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{record.total_waste}kg</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-600 border-r border-gray-200">
                    <div className="space-y-2">
                      {/* Size totals only */}
                      {record.manufactured_pieces && record.manufactured_pieces.length > 0 && (
                        <>
                          <div className="text-xs text-gray-500 font-medium">Size Totals:</div>
                          {calculateManufacturedTotals(record.manufactured_pieces).breakdown.map((total, idx) => (
                            <div key={idx} className="text-xs font-medium text-gray-700">
                              {total.length}{total.unit} × {total.quantity} pieces
                            </div>
                          ))}
                          
                          {/* Grand Total */}
                          <hr className="my-1 border-gray-200" />
                          <div className="space-y-1">
                            <div className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded">
                              Total Pieces: {calculateManufacturedTotals(record.manufactured_pieces).grandTotalPieces}
                            </div>
                            <div className="text-xs font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded">
                              Total Length: {calculateManufacturedTotals(record.manufactured_pieces).grandTotalLength}{calculateManufacturedTotals(record.manufactured_pieces).unit}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">{formatDate(record.date)}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => startEdit(record)}
                        className="flex items-center justify-center text-white rounded text-xs hover:opacity-90"
                        style={{ backgroundColor: '#8B7CF8', width: '60px', height: '32px' }}
                      >
                        <Edit2 className="h-3 w-3" />
                        <span className="hidden sm:inline ml-1">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteRecord(record.id)}
                        disabled={loading}
                        className="flex items-center justify-center bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50"
                        style={{ width: '60px', height: '32px' }}
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="hidden sm:inline ml-1">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="px-2 md:px-4 py-6 md:py-8 text-center text-gray-500 text-xs md:text-sm">
                    No manufacturing records found. Add your first record to get started.
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