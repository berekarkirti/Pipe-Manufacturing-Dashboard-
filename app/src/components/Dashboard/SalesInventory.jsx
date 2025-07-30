// "use client";

// import { useState, useMemo, useEffect } from "react";
// import {
//   Search,
//   ShoppingCart,
//   Edit2,
//   Trash2,
//   Save,
//   X,
//   Plus,
//   ChevronDown,
// } from "lucide-react";

// export default function SalesInventory() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSaleForm, setShowSaleForm] = useState(false);
//   const [showProductDropdown, setShowProductDropdown] = useState(false);
//   const [showBrandDropdown, setShowBrandDropdown] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [editingSale, setEditingSale] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [products, setProducts] = useState(() => {
//     if (typeof window !== "undefined") {
//       const saved = localStorage.getItem("products");
//       return saved
//         ? JSON.parse(saved)
//         : [
//             {
//               id: 1,
//               product_name: "PVC Pipe",
//               brand_name: "Supreme",
//               req_length: 120,
//               available_length: 100,
//               price_per_meter: 45,
//               status: "In Stock",
//               updated_at: "2025-01-15",
//             },
//             {
//               id: 2,
//               product_name: "HDPE Pipe",
//               brand_name: "Finolex",
//               req_length: 100,
//               available_length: 80,
//               price_per_meter: 60,
//               status: "In Stock",
//               updated_at: "2025-01-14",
//             },
//             {
//               id: 3,
//               product_name: "Steel Pipe",
//               brand_name: "Tata",
//               req_length: 50,
//               available_length: 25,
//               price_per_meter: 120,
//               status: "Low Stock",
//               updated_at: "2025-01-13",
//             },
//           ];
//     }
//     return [];
//   });

//   const [salesData, setSalesData] = useState(() => {
//     if (typeof window !== "undefined") {
//       const saved = localStorage.getItem("salesData");
//       return saved
//         ? JSON.parse(saved)
//         : [
//             {
//               id: 1,
//               sale_id: "SALE001",
//               product_id: 1,
//               customer_name: "John Doe",
//               customer_details: "9876543210",
//               requested_length: 50,
//               sold_length: 50,
//               price_per_meter: 45,
//               total_amount: 2250,
//               date: "2025-01-15",
//               remarks: "Regular customer",
//             },
//             {
//               id: 2,
//               sale_id: "SALE002",
//               product_id: 2,
//               customer_name: "ABC Construction",
//               customer_details: "abc@construction.com",
//               requested_length: 75,
//               sold_length: 75,
//               price_per_meter: 60,
//               total_amount: 4500,
//               date: "2025-01-14",
//               remarks: "Bulk order",
//             },
//           ];
//     }
//     return [];
//   });

//   const [saleData, setSaleData] = useState({
//     customer_name: "",
//     customer_details: "",
//     requested_length: "",
//     price_per_meter: "",
//     remarks: "",
//   });

//   const [newProduct, setNewProduct] = useState({
//     product_name: "",
//     brand_name: "",
//     req_length: "",
//     available_length: "",
//     price_per_meter: "",
//     status: "In Stock",
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("products", JSON.stringify(products));
//     }
//   }, [products]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("salesData", JSON.stringify(salesData));
//     }
//   }, [salesData]);

//   const uniqueProducts = [
//     ...new Set(products.map((item) => item.product_name).filter(Boolean)),
//   ];
//   const uniqueBrands = [
//     ...new Set(products.map((item) => item.brand_name).filter(Boolean)),
//   ];

//   const filteredProducts = useMemo(() => {
//     return products.filter(
//       (product) =>
//         product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.brand_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.available_length.toString().includes(searchQuery)
//     );
//   }, [products, searchQuery]);

//   const handleAddProduct = async () => {
//     const { product_name, brand_name, req_length, available_length, price_per_meter } =
//       newProduct;
//     if (!product_name || !brand_name || !req_length || !available_length || !price_per_meter) {
//       alert("Please fill in all required fields");
//       return;
//     }
//     if (req_length <= 0 || available_length <= 0 || price_per_meter <= 0) {
//       alert("Length and price must be positive numbers");
//       return;
//     }

//     setLoading(true);
//     try {
//       const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
//       const productToAdd = {
//         id: newId,
//         ...newProduct,
//         req_length: parseFloat(newProduct.req_length),
//         available_length: parseFloat(newProduct.available_length),
//         price_per_meter: parseFloat(newProduct.price_per_meter),
//         updated_at: new Date().toISOString().split("T")[0],
//       };

//       setProducts([...products, productToAdd]);
//       setNewProduct({
//         product_name: "",
//         brand_name: "",
//         req_length: "",
//         available_length: "",
//         price_per_meter: "",
//         status: "In Stock",
//       });
//       setShowAddForm(false);
//       setShowProductDropdown(false);
//       setShowBrandDropdown(false);
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Failed to add product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditProduct = async (product) => {
//     if (
//       !product.product_name ||
//       !product.brand_name ||
//       !product.req_length ||
//       !product.available_length ||
//       !product.price_per_meter
//     ) {
//       alert("Please fill in all required fields");
//       return;
//     }
//     if (product.req_length <= 0 || product.available_length <= 0 || product.price_per_meter <= 0) {
//       alert("Length and price must be positive numbers");
//       return;
//     }

//     setLoading(true);
//     try {
//       const updatedProducts = products.map((p) =>
//         p.id === product.id
//           ? {
//               ...product,
//               req_length: parseFloat(product.req_length),
//               available_length: parseFloat(product.available_length),
//               price_per_meter: parseFloat(product.price_per_meter),
//               updated_at: new Date().toISOString().split("T")[0],
//             }
//           : p
//       );
//       setProducts(updatedProducts);
//       setEditingProduct(null);
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("Failed to update product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     setLoading(true);
//     try {
//       setProducts(products.filter((p) => p.id !== productId));
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Failed to delete product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSale = (product) => {
//     setSelectedProduct(product);
//     setShowSaleForm(true);
//     setSaleData({
//       customer_name: "",
//       customer_details: "",
//       requested_length: "",
//       price_per_meter: product.price_per_meter,
//       remarks: "",
//     });
//   };

//   const processSale = async () => {
//     const { customer_name, requested_length, price_per_meter } = saleData;
//     if (!customer_name || !requested_length || !price_per_meter) {
//       alert("Please fill in all required fields");
//       return;
//     }
//     if (requested_length <= 0 || price_per_meter <= 0) {
//       alert("Requested length and price must be positive numbers");
//       return;
//     }

//     setLoading(true);
//     try {
//       const requestedLength = parseFloat(saleData.requested_length);
//       const pricePerMeter = parseFloat(saleData.price_per_meter);
//       const soldLength = Math.min(requestedLength, selectedProduct.available_length);
//       const totalAmount = soldLength * pricePerMeter;

//       const saleId = `SALE${String(Date.now()).slice(-6)}`;
//       const newSale = {
//         id: salesData.length ? Math.max(...salesData.map((s) => s.id)) + 1 : 1,
//         sale_id: saleId,
//         product_id: selectedProduct.id,
//         customer_name: saleData.customer_name,
//         customer_details: saleData.customer_details,
//         requested_length: requestedLength,
//         sold_length: soldLength,
//         price_per_meter: pricePerMeter,
//         total_amount: totalAmount,
//         remarks: saleData.remarks,
//         date: new Date().toISOString().split("T")[0],
//       };

//       setSalesData([newSale, ...salesData]);

//       const updatedProducts = products.map((p) =>
//         p.id === selectedProduct.id
//           ? {
//               ...p,
//               available_length: p.available_length - soldLength,
//               updated_at: new Date().toISOString().split("T")[0],
//             }
//           : p
//       );
//       setProducts(updatedProducts);

//       setShowSaleForm(false);
//       setSelectedProduct(null);
//     } catch (error) {
//       console.error("Error processing sale:", error);
//       alert("Failed to process sale.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditSale = async (sale) => {
//     if (
//       !sale.customer_name ||
//       !sale.requested_length ||
//       !sale.sold_length ||
//       !sale.price_per_meter ||
//       !sale.total_amount
//     ) {
//       alert("Please fill in all required fields");
//       return;
//     }
//     if (
//       sale.requested_length <= 0 ||
//       sale.sold_length <= 0 ||
//       sale.price_per_meter <= 0 ||
//       sale.total_amount <= 0
//     ) {
//       alert("Length, price, and total amount must be positive numbers");
//       return;
//     }

//     setLoading(true);
//     try {
//       const originalSale = salesData.find((s) => s.id === sale.id);
//       const product = products.find((p) => p.id === originalSale.product_id);
//       if (!product) throw new Error("Product not found");

//       const lengthDifference = originalSale.sold_length - parseFloat(sale.sold_length);
//       if (product.available_length + lengthDifference < 0) {
//         alert("Cannot edit sale: insufficient stock available.");
//         return;
//       }

//       const updatedProducts = products.map((p) =>
//         p.id === originalSale.product_id
//           ? { ...p, available_length: p.available_length + lengthDifference }
//           : p
//       );
//       setProducts(updatedProducts);

//       const updatedSales = salesData.map((s) =>
//         s.id === sale.id
//           ? {
//               ...sale,
//               requested_length: parseFloat(sale.requested_length),
//               sold_length: parseFloat(sale.sold_length),
//               price_per_meter: parseFloat(sale.price_per_meter),
//               total_amount: parseFloat(sale.sold_length) * parseFloat(sale.price_per_meter),
//               date: sale.date,
//             }
//           : s
//       );
//       setSalesData(updatedSales);
//       setEditingSale(null);
//     } catch (error) {
//       console.error("Error updating sale:", error);
//       alert("Failed to update sale.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteSale = async (saleId) => {
//     if (!window.confirm("Are you sure you want to delete this sale record?")) return;

//     setLoading(true);
//     try {
//       const sale = salesData.find((s) => s.id === saleId);
//       const product = products.find((p) => p.id === sale.product_id);
//       if (product) {
//         const updatedProducts = products.map((p) =>
//           p.id === sale.product_id
//             ? { ...p, available_length: p.available_length + sale.sold_length }
//             : p
//         );
//         setProducts(updatedProducts);
//       }
//       setSalesData(salesData.filter((s) => s.id !== saleId));
//     } catch (error) {
//       console.error("Error deleting sale:", error);
//       alert("Failed to delete sale.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-GB");
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg border border-gray-100  mx-auto my-8">
//       <div className="p-4 sm:p-6 border-b border-gray-200">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
//           <div className="flex items-center space-x-3">
//             <div className="w-4 h-4 rounded-full flex-shrink-0 bg-[#8B7CF8]"></div>
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               Sales & Inventory Management
//             </h2>
//           </div>
          
//         </div>
//       </div>

//       <div className="p-4 sm:p-6">
//         <div className="mb-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search products by name, brand, or length..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 bg-gray-50 text-sm sm:text-base ring-[#8B7CF8]"
//               aria-label="Search products"
//             />
//           </div>
//         </div>

       
//         {showSaleForm && selectedProduct && (
//           <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
//             <h3 className="text-base sm:text-lg font-medium mb-4">
//               Process Sale - {selectedProduct.brand_name} {selectedProduct.product_name}
//             </h3>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                 <input
//                   type="text"
//                   placeholder="Customer Name"
//                   value={saleData.customer_name}
//                   onChange={(e) => setSaleData({ ...saleData, customer_name: e.target.value })}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ring-[#8B7CF8]"
//                   required
//                   aria-label="Customer name"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Customer Details (Phone/Address)"
//                   value={saleData.customer_details}
//                   onChange={(e) => setSaleData({ ...saleData, customer_details: e.target.value })}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ring-[#8B7CF8]"
//                   aria-label="Customer details"
//                 />
//                 <input
//                   type="number"
//                   step="0.01"
//                   placeholder="Requested Length (m)"
//                   value={saleData.requested_length}
//                   onChange={(e) => setSaleData({ ...saleData, requested_length: e.target.value })}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ring-[#8B7CF8]"
//                   required
//                   aria-label="Requested length in meters"
//                 />
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                 <input
//                   type="number"
//                   step="0.01"
//                   placeholder="Price per Meter (₹)"
//                   value={saleData.price_per_meter}
//                   onChange={(e) => setSaleData({ ...saleData, price_per_meter: e.target.value })}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ring-[#8B7CF8]"
//                   required
//                   aria-label="Price per meter"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Remarks (Optional)"
//                   value={saleData.remarks}
//                   onChange={(e) => setSaleData({ ...saleData, remarks: e.target.value })}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ring-[#8B7CF8]"
//                   aria-label="Remarks"
//                 />
//               </div>
//               <div className="text-xs sm:text-sm text-gray-600 bg-blue-50 p-2 sm:p-3 rounded">
//                 <span className="block sm:inline">Available Stock: {selectedProduct.available_length}m</span>
//                 <span className="hidden sm:inline mx-1">|</span>
//                 <span className="block sm:inline">
//                   Suggested Price: {formatCurrency(selectedProduct.price_per_meter)}/m
//                 </span>
//                 {saleData.requested_length && saleData.price_per_meter && (
//                   <>
//                     <span className="hidden sm:inline mx-1">|</span>
//                     <span className="block sm:inline font-medium">
//                       Total:{" "}
//                       {formatCurrency(
//                         parseFloat(saleData.requested_length || 0) *
//                           parseFloat(saleData.price_per_meter || 0)
//                       )}
//                     </span>
//                   </>
//                 )}
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={processSale}
//                   disabled={loading}
//                   className="flex items-center justify-center bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm w-[150px] h-10"
//                   aria-label="Process sale"
//                 >
//                   {loading ? "Processing..." : "Process Sale"}
//                 </button>
//                 <button
//                   onClick={() => setShowSaleForm(false)}
//                   className="flex items-center justify-center bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm w-[100px] h-10"
//                   aria-label="Cancel sale"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="overflow-x-auto border border-gray-300 rounded-lg mb-8">
//           <table className="w-full min-w-[900px] border-collapse">
//             <thead>
//               <tr className="bg-[#8B7CF8]">
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 rounded-tl-lg whitespace-nowrap">
//                   Brand Name
//                 </th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                   Product Name
//                 </th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                   Req. Length
//                 </th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                   Available Length
//                 </th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                   Price per Meter
//                 </th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                   Status
//                 </th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                   Last Updated
//                 </th>
//                 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white rounded-tr-lg whitespace-nowrap">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((product, index) => (
//                   <tr
//                     key={product.id}
//                     className={`hover:bg-gray-50 border-b border-gray-200 ${
//                       index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//                     }`}
//                   >
//                     {editingProduct && editingProduct.id === product.id ? (
//                       <>
//                         <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                           <input
//                             type="text"
//                             value={editingProduct.brand_name}
//                             onChange={(e) =>
//                               setEditingProduct({ ...editingProduct, brand_name: e.target.value })
//                             }
//                             className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                             aria-label="Edit brand name"
//                           />
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                           <input
//                             type="text"
//                             value={editingProduct.product_name}
//                             onChange={(e) =>
//                               setEditingProduct({ ...editingProduct, product_name: e.target.value })
//                             }
//                             className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                             aria-label="Edit product name"
//                           />
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                           <input
//                             type="number"
//                             step="0.01"
//                             value={editingProduct.req_length}
//                             onChange={(e) =>
//                               setEditingProduct({ ...editingProduct, req_length: e.target.value })
//                             }
//                             className="w-full min-w-[70px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                             aria-label="Edit required length"
//                           />
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                           <input
//                             type="number"
//                             step="0.01"
//                             value={editingProduct.available_length}
//                             onChange={(e) =>
//                               setEditingProduct({
//                                 ...editingProduct,
//                                 available_length: e.target.value,
//                               })
//                             }
//                             className="w-full min-w-[70px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                             aria-label="Edit available length"
//                           />
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                           <input
//                             type="number"
//                             step="0.01"
//                             value={editingProduct.price_per_meter}
//                             onChange={(e) =>
//                               setEditingProduct({
//                                 ...editingProduct,
//                                 price_per_meter: e.target.value,
//                               })
//                             }
//                             className="w-full min-w-[70px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                             aria-label="Edit price per meter"
//                           />
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                           <select
//                             value={editingProduct.status}
//                             onChange={(e) =>
//                               setEditingProduct({ ...editingProduct, status: e.target.value })
//                             }
//                             className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                             aria-label="Edit product status"
//                           >
//                             <option value="In Stock">In Stock</option>
//                             <option value="Low Stock">Low Stock</option>
//                           </select>
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
//                           {formatDate(product.updated_at)}
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3">
//                           <div className="flex space-x-1">
//                             <button
//                               onClick={() => handleEditProduct(editingProduct)}
//                               disabled={loading}
//                               className="flex items-center justify-center bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50 w-[60px] h-8"
//                               aria-label="Save product changes"
//                             >
//                               <Save className="h-3 w-3" />
//                               <span className="hidden sm:inline ml-1">
//                                 {loading ? "Saving..." : "Save"}
//                               </span>
//                             </button>
//                             <button
//                               onClick={() => setEditingProduct(null)}
//                               className="flex items-center justify-center bg-gray-500 text-white rounded text-xs hover:bg-gray-600 w-[60px] h-8"
//                               aria-label="Cancel editing product"
//                             >
//                               <X className="h-3 w-3" />
//                               <span className="hidden sm:inline ml-1">Cancel</span>
//                             </button>
//                           </div>
//                         </td>
//                       </>
//                     ) : (
//                       <>
//                         <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
//                           {product.brand_name}
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
//                           {product.product_name}
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
//                           {product.req_length}m
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
//                           {product.available_length}m
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
//                           {formatCurrency(product.price_per_meter)}
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                           <span
//                             className={`inline-flex px-1 md:px-2 py-1 text-xs font-medium rounded-full ${
//                               product.status === "In Stock"
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-yellow-100 text-yellow-800"
//                             }`}
//                           >
//                             {product.status}
//                           </span>
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
//                           {formatDate(product.updated_at)}
//                         </td>
//                         <td className="px-2 md:px-4 py-2 md:py-3">
//                           <div className="flex space-x-1">
//                             <button
//                               onClick={() => handleSale(product)}
//                               className="flex items-center justify-center bg-[#8B7CF8] text-white rounded text-xs hover:opacity-90 w-[60px] h-8"
//                               aria-label={`Sell ${product.brand_name} ${product.product_name}`}
//                             >
//                               <ShoppingCart className="h-3 w-3" />
//                               <span className="hidden sm:inline ml-1">Sell</span>
//                             </button>
//                             <button
//                               onClick={() => setEditingProduct({ ...product })}
//                               className="flex items-center justify-center bg-blue-600 text-white rounded text-xs hover:bg-blue-700 w-[60px] h-8"
//                               aria-label={`Edit ${product.brand_name} ${product.product_name}`}
//                             >
//                               <Edit2 className="h-3 w-3" />
//                               <span className="hidden sm:inline ml-1">Edit</span>
//                             </button>
//                             <button
//                               onClick={() => handleDeleteProduct(product.id)}
//                               disabled={loading}
//                               className="flex items-center justify-center bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50 w-[60px] h-8"
//                               aria-label={`Delete ${product.brand_name} ${product.product_name}`}
//                             >
//                               <Trash2 className="h-3 w-3" />
//                               <span className="hidden sm:inline ml-1">Delete</span>
//                             </button>
//                           </div>
//                         </td>
//                       </>
//                     )}
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="8"
//                     className="px-2 md:px-4 py-6 md:py-8 text-center text-gray-500 text-xs md:text-sm"
//                   >
//                     {searchQuery
//                       ? "No products found matching your search."
//                       : "No products found. Add your first product to get started."}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-8">
//           <div className="mb-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-4 h-4 rounded-full flex-shrink-0 bg-[#8B7CF8]"></div>
//               <h3 className="text-lg font-semibold text-gray-800">Customer Sales Records</h3>
//             </div>
//           </div>

//           <div className="overflow-x-auto border border-gray-300 rounded-lg">
//             <table className="w-full min-w-[900px] border-collapse">
//               <thead>
//                 <tr className="bg-[#8B7CF8]">
//                   <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 rounded-tl-lg whitespace-nowrap">
//                     Sale ID
//                   </th>
//                   <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                     Customer
//                   </th>
//                   <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                     Customer Details
//                   </th>
//                   <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                     Requested
//                   </th>
//                   <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                     Sold
//                   </th>
//                   <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                     Price/Meter
//                   </th>
//                   <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                     Total Amount
//                   </th>
//                   <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                     Date
//                   </th>
//                   <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
//                     Remarks
//                   </th>
//                   <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white rounded-tr-lg whitespace-nowrap">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {salesData && salesData.length > 0 ? (
//                   salesData.map((sale, index) => (
//                     <tr
//                       key={sale.id}
//                       className={`hover:bg-gray-50 border-b border-gray-200 ${
//                         index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//                       }`}
//                     >
//                       {editingSale && editingSale.id === sale.id ? (
//                         <>
//                           <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900 border-r border-gray-200">
//                             {sale.sale_id}
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                             <input
//                               type="text"
//                               value={editingSale.customer_name}
//                               onChange={(e) =>
//                                 setEditingSale({ ...editingSale, customer_name: e.target.value })
//                               }
//                               className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                               aria-label="Edit customer name"
//                             />
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                             <input
//                               type="text"
//                               value={editingSale.customer_details || ""}
//                               onChange={(e) =>
//                                 setEditingSale({ ...editingSale, customer_details: e.target.value })
//                               }
//                               className="w-full min-w-[100px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                               aria-label="Edit customer details"
//                             />
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                             <input
//                               type="number"
//                               step="0.01"
//                               value={editingSale.requested_length}
//                               onChange={(e) =>
//                                 setEditingSale({
//                                   ...editingSale,
//                                   requested_length: e.target.value,
//                                 })
//                               }
//                               className="w-full min-w-[60px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                               aria-label="Edit requested length"
//                             />
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                             <input
//                               type="number"
//                               step="0.01"
//                               value={editingSale.sold_length}
//                               onChange={(e) =>
//                                 setEditingSale({ ...editingSale, sold_length: e.target.value })
//                               }
//                               className="w-full min-w-[60px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                               aria-label="Edit sold length"
//                             />
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                             <input
//                               type="number"
//                               step="0.01"
//                               value={editingSale.price_per_meter}
//                               onChange={(e) =>
//                                 setEditingSale({
//                                   ...editingSale,
//                                   price_per_meter: e.target.value,
//                                 })
//                               }
//                               className="w-full min-w-[60px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                               aria-label="Edit price per meter"
//                             />
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                             <input
//                               type="number"
//                               step="0.01"
//                               value={editingSale.total_amount}
//                               onChange={(e) =>
//                                 setEditingSale({ ...editingSale, total_amount: e.target.value })
//                               }
//                               className="w-full min-w-[70px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                               aria-label="Edit total amount"
//                             />
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                             <input
//                               type="date"
//                               value={editingSale.date}
//                               onChange={(e) => setEditingSale({ ...editingSale, date: e.target.value })}
//                               className="w-full min-w-[100px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                               aria-label="Edit sale date"
//                             />
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
//                             <input
//                               type="text"
//                               value={editingSale.remarks || ""}
//                               onChange={(e) =>
//                                 setEditingSale({ ...editingSale, remarks: e.target.value })
//                               }
//                               className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
//                               aria-label="Edit remarks"
//                             />
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3">
//                             <div className="flex space-x-1">
//                               <button
//                                 onClick={() => handleEditSale(editingSale)}
//                                 disabled={loading}
//                                 className="flex items-center justify-center bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50 w-[60px] h-8"
//                                 aria-label="Save sale changes"
//                               >
//                                 <Save className="h-3 w-3" />
//                                 <span className="hidden sm:inline ml-1">
//                                   {loading ? "Saving..." : "Save"}
//                                 </span>
//                               </button>
//                               <button
//                                 onClick={() => setEditingSale(null)}
//                                 className="flex items-center justify-center bg-gray-500 text-white rounded text-xs hover:bg-gray-600 w-[60px] h-8"
//                                 aria-label="Cancel editing sale"
//                               >
//                                 <X className="h-3 w-3" />
//                                 <span className="hidden sm:inline ml-1">Cancel</span>
//                               </button>
//                             </div>
//                           </td>
//                         </>
//                       ) : (
//                         <>
//                           <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900 border-r border-gray-200">
//                             {sale.sale_id}
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
//                             {sale.customer_name}
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-600 border-r border-gray-200">
//                             {sale.customer_details || "-"}
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
//                             {sale.requested_length}m
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
//                             {sale.sold_length}m
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
//                             {formatCurrency(sale.price_per_meter)}
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-green-600 border-r border-gray-200">
//                             {formatCurrency(sale.total_amount)}
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
//                             {formatDate(sale.date)}
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-600 border-r border-gray-200">
//                             {sale.remarks || "-"}
//                           </td>
//                           <td className="px-2 md:px-4 py-2 md:py-3">
//                             <div className="flex space-x-1">
//                               <button
//                                 onClick={() => setEditingSale({ ...sale })}
//                                 className="flex items-center justify-center bg-[#8B7CF8] text-white rounded text-xs hover:opacity-90 w-[60px] h-8"
//                                 aria-label={`Edit sale ${sale.sale_id}`}
//                               >
//                                 <Edit2 className="h-3 w-3" />
//                                 <span className="hidden sm:inline ml-1">Edit</span>
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteSale(sale.id)}
//                                 disabled={loading}
//                                 className="flex items-center justify-center bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50 w-[60px] h-8"
//                                 aria-label={`Delete sale ${sale.sale_id}`}
//                               >
//                                 <Trash2 className="h-3 w-3" />
//                                 <span className="hidden sm:inline ml-1">Delete</span>
//                               </button>
//                             </div>
//                           </td>
//                         </>
//                       )}
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="10"
//                       className="px-2 md:px-4 py-6 md:py-8 text-center text-gray-500 text-xs md:text-sm"
//                     >
//                       No sales records found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useMemo, useEffect } from "react";
import {
  ShoppingCart,
  Edit2,
  Trash2,
  Save,
  X,
  Plus,
  ChevronDown,
} from "lucide-react";

export default function SalesInventory() {
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingSale, setEditingSale] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("brand_name"); // Default sort by brand name
  const [sortDirection, setSortDirection] = useState("asc"); // Default ascending
  const [minLength, setMinLength] = useState(""); // Min available length filter
  const [maxLength, setMaxLength] = useState(""); // Max available length filter

  const [products, setProducts] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("products");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              product_name: "PVC Pipe",
              brand_name: "Supreme",
              req_length: 120,
              available_length: 100,
              price_per_meter: 45,
              status: "In Stock",
              updated_at: "2025-01-15",
            },
            {
              id: 2,
              product_name: "HDPE Pipe",
              brand_name: "Finolex",
              req_length: 100,
              available_length: 80,
              price_per_meter: 60,
              status: "In Stock",
              updated_at: "2025-01-14",
            },
            {
              id: 3,
              product_name: "Steel Pipe",
              brand_name: "Tata",
              req_length: 50,
              available_length: 25,
              price_per_meter: 120,
              status: "Low Stock",
              updated_at: "2025-01-13",
            },
          ];
    }
    return [];
  });

  const [salesData, setSalesData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("salesData");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              sale_id: "SALE001",
              product_id: 1,
              customer_name: "John Doe",
              customer_details: "9876543210",
              requested_length: 50,
              sold_length: 50,
              price_per_meter: 45,
              total_amount: 2250,
              date: "2025-01-15",
              remarks: "Regular customer",
            },
            {
              id: 2,
              sale_id: "SALE002",
              product_id: 2,
              customer_name: "ABC Construction",
              customer_details: "abc@construction.com",
              requested_length: 75,
              sold_length: 75,
              price_per_meter: 60,
              total_amount: 4500,
              date: "2025-01-14",
              remarks: "Bulk order",
            },
          ];
    }
    return [];
  });

  const [saleData, setSaleData] = useState({
    customer_name: "",
    customer_details: "",
    requested_length: "",
    price_per_meter: "",
    remarks: "",
  });

  const [newProduct, setNewProduct] = useState({
    product_name: "",
    brand_name: "",
    req_length: "",
    available_length: "",
    price_per_meter: "",
    status: "In Stock",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("salesData", JSON.stringify(salesData));
    }
  }, [salesData]);

  const uniqueProducts = [
    ...new Set(products.map((item) => item.product_name).filter(Boolean)),
  ];
  const uniqueBrands = [
    ...new Set(products.map((item) => item.brand_name).filter(Boolean)),
  ];

  const sortedAndFilteredProducts = useMemo(() => {
    let result = [...products];

    // Apply size range filter
    if (minLength !== "" || maxLength !== "") {
      const min = minLength !== "" ? parseFloat(minLength) : 0;
      const max = maxLength !== "" ? parseFloat(maxLength) : Infinity;
      result = result.filter(
        (product) =>
          product.available_length >= min && product.available_length <= max
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const fieldA =
        sortField === "available_length"
          ? a[sortField]
          : a[sortField].toLowerCase();
      const fieldB =
        sortField === "available_length"
          ? b[sortField]
          : b[sortField].toLowerCase();
      if (sortDirection === "asc") {
        return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
      } else {
        return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
      }
    });

    return result;
  }, [products, sortField, sortDirection, minLength, maxLength]);

  const handleAddProduct = async () => {
    const { product_name, brand_name, req_length, available_length, price_per_meter } =
      newProduct;
    if (!product_name || !brand_name || !req_length || !available_length || !price_per_meter) {
      alert("Please fill in all required fields");
      return;
    }
    if (req_length <= 0 || available_length <= 0 || price_per_meter <= 0) {
      alert("Length and price must be positive numbers");
      return;
    }

    setLoading(true);
    try {
      const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      const productToAdd = {
        id: newId,
        ...newProduct,
        req_length: parseFloat(newProduct.req_length),
        available_length: parseFloat(newProduct.available_length),
        price_per_meter: parseFloat(newProduct.price_per_meter),
        updated_at: new Date().toISOString().split("T")[0],
      };

      setProducts([...products, productToAdd]);
      setNewProduct({
        product_name: "",
        brand_name: "",
        req_length: "",
        available_length: "",
        price_per_meter: "",
        status: "In Stock",
      });
      setShowAddForm(false);
      setShowProductDropdown(false);
      setShowBrandDropdown(false);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (product) => {
    if (
      !product.product_name ||
      !product.brand_name ||
      !product.req_length ||
      !product.available_length ||
      !product.price_per_meter
    ) {
      alert("Please fill in all required fields");
      return;
    }
    if (product.req_length <= 0 || product.available_length <= 0 || product.price_per_meter <= 0) {
      alert("Length and price must be positive numbers");
      return;
    }

    setLoading(true);
    try {
      const updatedProducts = products.map((p) =>
        p.id === product.id
          ? {
              ...product,
              req_length: parseFloat(product.req_length),
              available_length: parseFloat(product.available_length),
              price_per_meter: parseFloat(product.price_per_meter),
              updated_at: new Date().toISOString().split("T")[0],
            }
          : p
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    try {
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  const handleSale = (product) => {
    setSelectedProduct(product);
    setShowSaleForm(true);
    setSaleData({
      customer_name: "",
      customer_details: "",
      requested_length: "",
      price_per_meter: product.price_per_meter,
      remarks: "",
    });
  };

  const processSale = async () => {
    const { customer_name, requested_length, price_per_meter } = saleData;
    if (!customer_name || !requested_length || !price_per_meter) {
      alert("Please fill in all required fields");
      return;
    }
    if (requested_length <= 0 || price_per_meter <= 0) {
      alert("Requested length and price must be positive numbers");
      return;
    }

    setLoading(true);
    try {
      const requestedLength = parseFloat(saleData.requested_length);
      const pricePerMeter = parseFloat(saleData.price_per_meter);
      const soldLength = Math.min(requestedLength, selectedProduct.available_length);
      const totalAmount = soldLength * pricePerMeter;

      const saleId = `SALE${String(Date.now()).slice(-6)}`;
      const newSale = {
        id: salesData.length ? Math.max(...salesData.map((s) => s.id)) + 1 : 1,
        sale_id: saleId,
        product_id: selectedProduct.id,
        customer_name: saleData.customer_name,
        customer_details: saleData.customer_details,
        requested_length: requestedLength,
        sold_length: soldLength,
        price_per_meter: pricePerMeter,
        total_amount: totalAmount,
        remarks: saleData.remarks,
        date: new Date().toISOString().split("T")[0],
      };

      setSalesData([newSale, ...salesData]);

      const updatedProducts = products.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...p,
              available_length: p.available_length - soldLength,
              updated_at: new Date().toISOString().split("T")[0],
            }
          : p
      );
      setProducts(updatedProducts);

      setShowSaleForm(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error processing sale:", error);
      alert("Failed to process sale.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSale = async (sale) => {
    if (
      !sale.customer_name ||
      !sale.requested_length ||
      !sale.sold_length ||
      !sale.price_per_meter ||
      !sale.total_amount
    ) {
      alert("Please fill in all required fields");
      return;
    }
    if (
      sale.requested_length <= 0 ||
      sale.sold_length <= 0 ||
      sale.price_per_meter <= 0 ||
      sale.total_amount <= 0
    ) {
      alert("Length, price, and total amount must be positive numbers");
      return;
    }

    setLoading(true);
    try {
      const originalSale = salesData.find((s) => s.id === sale.id);
      const product = products.find((p) => p.id === originalSale.product_id);
      if (!product) throw new Error("Product not found");

      const lengthDifference = originalSale.sold_length - parseFloat(sale.sold_length);
      if (product.available_length + lengthDifference < 0) {
        alert("Cannot edit sale: insufficient stock available.");
        return;
      }

      const updatedProducts = products.map((p) =>
        p.id === originalSale.product_id
          ? { ...p, available_length: p.available_length + lengthDifference }
          : p
      );
      setProducts(updatedProducts);

      const updatedSales = salesData.map((s) =>
        s.id === sale.id
          ? {
              ...sale,
              requested_length: parseFloat(sale.requested_length),
              sold_length: parseFloat(sale.sold_length),
              price_per_meter: parseFloat(sale.price_per_meter),
              total_amount: parseFloat(sale.sold_length) * parseFloat(sale.price_per_meter),
              date: sale.date,
            }
          : s
      );
      setSalesData(updatedSales);
      setEditingSale(null);
    } catch (error) {
      console.error("Error updating sale:", error);
      alert("Failed to update sale.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSale = async (saleId) => {
    if (!window.confirm("Are you sure you want to delete this sale record?")) return;

    setLoading(true);
    try {
      const sale = salesData.find((s) => s.id === saleId);
      const product = products.find((p) => p.id === sale.product_id);
      if (product) {
        const updatedProducts = products.map((p) =>
          p.id === sale.product_id
            ? { ...p, available_length: p.available_length + sale.sold_length }
            : p
        );
        setProducts(updatedProducts);
      }
      setSalesData(salesData.filter((s) => s.id !== saleId));
    } catch (error) {
      console.error("Error deleting sale:", error);
      alert("Failed to delete sale.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100  mx-auto my-8">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full flex-shrink-0 bg-[#8B7CF8]"></div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Sales & Inventory Management
            </h2>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            disabled={loading}
            className="flex items-center justify-center space-x-2 bg-[#8B7CF8] text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm w-[200px] h-10"
            aria-label="Add new product"
          >
            <Plus className="h-4 w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">Add New Product</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort By:</label>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm ring-[#8B7CF8]"
              aria-label="Sort by field"
            >
              <option value="brand_name">Brand Name</option>
              <option value="product_name">Product Name</option>
              <option value="available_length">Available Length</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Direction:</label>
            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm ring-[#8B7CF8]"
              aria-label="Sort direction"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Size Range (m):</label>
            <input
              type="number"
              step="0.01"
              placeholder="Min"
              value={minLength}
              onChange={(e) => setMinLength(e.target.value)}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm ring-[#8B7CF8]"
              aria-label="Minimum available length"
            />
            <span className="text-sm text-gray-500">to</span>
            <input
              type="number"
              step="0.01"
              placeholder="Max"
              value={maxLength}
              onChange={(e) => setMaxLength(e.target.value)}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm ring-[#8B7CF8]"
              aria-label="Maximum available length"
            />
          </div>
        </div>

        {showAddForm && (
          <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-base sm:text-lg font-medium mb-4">Add New Product</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={newProduct.product_name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, product_name: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 text-sm ring-[#8B7CF8]"
                      required
                      aria-label="Product name"
                    />
                    <button
                      onClick={() => setShowProductDropdown(!showProductDropdown)}
                      className="flex items-center justify-center border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50 focus:outline-none focus:ring-2 w-10 h-[42px] ring-[#8B7CF8]"
                      aria-label="Toggle product dropdown"
                    >
                      <ChevronDown
                        className={`h-4 w-4 text-gray-500 transition-transform ${
                          showProductDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {showProductDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <button
                        onClick={() => {
                          setNewProduct({ ...newProduct, product_name: "" });
                          setShowProductDropdown(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 border-b border-gray-100 font-medium text-blue-600"
                        aria-label="Add new product name"
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
                              onClick={() => {
                                setNewProduct({ ...newProduct, product_name: product });
                                setShowProductDropdown(false);
                              }}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                              aria-label={`Select product ${product}`}
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

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand Name
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Brand Name"
                      value={newProduct.brand_name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, brand_name: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 text-sm ring-[#8B7CF8]"
                      required
                      aria-label="Brand name"
                    />
                    <button
                      onClick={() => setShowBrandDropdown(!showBrandDropdown)}
                      className="flex items-center justify-center border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50 focus:outline-none focus:ring-2 w-10 h-[42px] ring-[#8B7CF8]"
                      aria-label="Toggle brand dropdown"
                    >
                      <ChevronDown
                        className={`h-4 w-4 text-gray-500 transition-transform ${
                          showBrandDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {showBrandDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <button
                        onClick={() => {
                          setNewProduct({ ...newProduct, brand_name: "" });
                          setShowBrandDropdown(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 border-b border-gray-100 font-medium text-blue-600"
                        aria-label="Add new brand"
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
                              onClick={() => {
                                setNewProduct({ ...newProduct, brand_name: brand });
                                setShowBrandDropdown(false);
                              }}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                              aria-label={`Select brand ${brand}`}
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Req. Length (m)"
                  value={newProduct.req_length}
                  onChange={(e) => setNewProduct({ ...newProduct, req_length: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm ring-[#8B7CF8]"
                  required
                  aria-label="Required length in meters"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Available Length (m)"
                  value={newProduct.available_length}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, available_length: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm ring-[#8B7CF8]"
                  required
                  aria-label="Available length in meters"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price per Meter (₹)"
                  value={newProduct.price_per_meter}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price_per_meter: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm ring-[#8B7CF8]"
                  required
                  aria-label="Price per meter"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <select
                  value={newProduct.status}
                  onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm ring-[#8B7CF8]"
                  aria-label="Product status"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                </select>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleAddProduct}
                  disabled={loading}
                  className="flex items-center justify-center bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm w-[150px] h-10"
                  aria-label="Add product"
                >
                  {loading ? "Adding..." : "Add Product"}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setShowProductDropdown(false);
                    setShowBrandDropdown(false);
                  }}
                  className="flex items-center justify-center bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm w-[100px] h-10"
                  aria-label="Cancel adding product"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showSaleForm && selectedProduct && (
          <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-base sm:text-lg font-medium mb-4">
              Process Sale - {selectedProduct.brand_name} {selectedProduct.product_name}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={saleData.customer_name}
                  onChange={(e) => setSaleData({ ...saleData, customer_name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ring-[#8B7CF8]"
                  required
                  aria-label="Customer name"
                />
                <input
                  type="text"
                  placeholder="Customer Details (Phone/Address)"
                  value={saleData.customer_details}
                  onChange={(e) => setSaleData({ ...saleData, customer_details: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ring-[#8B7CF8]"
                  aria-label="Customer details"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Requested Length (m)"
                  value={saleData.requested_length}
                  onChange={(e) => setSaleData({ ...saleData, requested_length: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ring-[#8B7CF8]"
                  required
                  aria-label="Requested length in meters"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price per Meter (₹)"
                  value={saleData.price_per_meter}
                  onChange={(e) => setSaleData({ ...saleData, price_per_meter: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ring-[#8B7CF8]"
                  required
                  aria-label="Price per meter"
                />
                <input
                  type="text"
                  placeholder="Remarks (Optional)"
                  value={saleData.remarks}
                  onChange={(e) => setSaleData({ ...saleData, remarks: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ring-[#8B7CF8]"
                  aria-label="Remarks"
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-600 bg-blue-50 p-2 sm:p-3 rounded">
                <span className="block sm:inline">Available Stock: {selectedProduct.available_length}m</span>
                <span className="hidden sm:inline mx-1">|</span>
                <span className="block sm:inline">
                  Suggested Price: {formatCurrency(selectedProduct.price_per_meter)}/m
                </span>
                {saleData.requested_length && saleData.price_per_meter && (
                  <>
                    <span className="hidden sm:inline mx-1">|</span>
                    <span className="block sm:inline font-medium">
                      Total:{" "}
                      {formatCurrency(
                        parseFloat(saleData.requested_length || 0) *
                          parseFloat(saleData.price_per_meter || 0)
                      )}
                    </span>
                  </>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={processSale}
                  disabled={loading}
                  className="flex items-center justify-center bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm w-[150px] h-10"
                  aria-label="Process sale"
                >
                  {loading ? "Processing..." : "Process Sale"}
                </button>
                <button
                  onClick={() => setShowSaleForm(false)}
                  className="flex items-center justify-center bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm w-[100px] h-10"
                  aria-label="Cancel sale"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto border border-gray-300 rounded-lg mb-8">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-[#8B7CF8]">
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 rounded-tl-lg whitespace-nowrap">
                  Brand Name
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                  Product Name
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                  Req. Length
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                  Available Length
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                  Price per Meter
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                  Status
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                  Last Updated
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white rounded-tr-lg whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredProducts.length > 0 ? (
                sortedAndFilteredProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50 border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    {editingProduct && editingProduct.id === product.id ? (
                      <>
                        <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                          <input
                            type="text"
                            value={editingProduct.brand_name}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, brand_name: e.target.value })
                            }
                            className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                            aria-label="Edit brand name"
                          />
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                          <input
                            type="text"
                            value={editingProduct.product_name}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, product_name: e.target.value })
                            }
                            className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                            aria-label="Edit product name"
                          />
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                          <input
                            type="number"
                            step="0.01"
                            value={editingProduct.req_length}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, req_length: e.target.value })
                            }
                            className="w-full min-w-[70px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                            aria-label="Edit required length"
                          />
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                          <input
                            type="number"
                            step="0.01"
                            value={editingProduct.available_length}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                available_length: e.target.value,
                              })
                            }
                            className="w-full min-w-[70px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                            aria-label="Edit available length"
                          />
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                          <input
                            type="number"
                            step="0.01"
                            value={editingProduct.price_per_meter}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                price_per_meter: e.target.value,
                              })
                            }
                            className="w-full min-w-[70px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                            aria-label="Edit price per meter"
                          />
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                          <select
                            value={editingProduct.status}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, status: e.target.value })
                            }
                            className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                            aria-label="Edit product status"
                          >
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                          </select>
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
                          {formatDate(product.updated_at)}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3">
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleEditProduct(editingProduct)}
                              disabled={loading}
                              className="flex items-center justify-center bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50 w-[60px] h-8"
                              aria-label="Save product changes"
                            >
                              <Save className="h-3 w-3" />
                              <span className="hidden sm:inline ml-1">
                                {loading ? "Saving..." : "Save"}
                              </span>
                            </button>
                            <button
                              onClick={() => setEditingProduct(null)}
                              className="flex items-center justify-center bg-gray-500 text-white rounded text-xs hover:bg-gray-600 w-[60px] h-8"
                              aria-label="Cancel editing product"
                            >
                              <X className="h-3 w-3" />
                              <span className="hidden sm:inline ml-1">Cancel</span>
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
                          {product.brand_name}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
                          {product.product_name}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
                          {product.req_length}m
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
                          {product.available_length}m
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
                          {formatCurrency(product.price_per_meter)}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                          <span
                            className={`inline-flex px-1 md:px-2 py-1 text-xs font-medium rounded-full ${
                              product.status === "In Stock"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
                          {formatDate(product.updated_at)}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3">
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleSale(product)}
                              className="flex items-center justify-center bg-[#8B7CF8] text-white rounded text-xs hover:opacity-90 w-[60px] h-8"
                              aria-label={`Sell ${product.brand_name} ${product.product_name}`}
                            >
                              <ShoppingCart className="h-3 w-3" />
                              <span className="hidden sm:inline ml-1">Sell</span>
                            </button>
                            <button
                              onClick={() => setEditingProduct({ ...product })}
                              className="flex items-center justify-center bg-blue-600 text-white rounded text-xs hover:bg-blue-700 w-[60px] h-8"
                              aria-label={`Edit ${product.brand_name} ${product.product_name}`}
                            >
                              <Edit2 className="h-3 w-3" />
                              <span className="hidden sm:inline ml-1">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              disabled={loading}
                              className="flex items-center justify-center bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50 w-[60px] h-8"
                              aria-label={`Delete ${product.brand_name} ${product.product_name}`}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="hidden sm:inline ml-1">Delete</span>
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-2 md:px-4 py-6 md:py-8 text-center text-gray-500 text-xs md:text-sm"
                  >
                    No products found. Add your first product to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <div className="mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full flex-shrink-0 bg-[#8B7CF8]"></div>
              <h3 className="text-lg font-semibold text-gray-800">Customer Sales Records</h3>
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-300 rounded-lg">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="bg-[#8B7CF8]">
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 rounded-tl-lg whitespace-nowrap">
                    Sale ID
                  </th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                    Customer
                  </th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                    Customer Details
                  </th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                    Requested
                  </th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                    Sold
                  </th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                    Price/Meter
                  </th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                    Total Amount
                  </th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white border-r border-white/20 whitespace-nowrap">
                    Remarks
                  </th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-white rounded-tr-lg whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesData && salesData.length > 0 ? (
                  salesData.map((sale, index) => (
                    <tr
                      key={sale.id}
                      className={`hover:bg-gray-50 border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      {editingSale && editingSale.id === sale.id ? (
                        <>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900 border-r border-gray-200">
                            {sale.sale_id}
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                            <input
                              type="text"
                              value={editingSale.customer_name}
                              onChange={(e) =>
                                setEditingSale({ ...editingSale, customer_name: e.target.value })
                              }
                              className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                              aria-label="Edit customer name"
                            />
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                            <input
                              type="text"
                              value={editingSale.customer_details || ""}
                              onChange={(e) =>
                                setEditingSale({ ...editingSale, customer_details: e.target.value })
                              }
                              className="w-full min-w-[100px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                              aria-label="Edit customer details"
                            />
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                            <input
                              type="number"
                              step="0.01"
                              value={editingSale.requested_length}
                              onChange={(e) =>
                                setEditingSale({
                                  ...editingSale,
                                  requested_length: e.target.value,
                                })
                              }
                              className="w-full min-w-[60px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                              aria-label="Edit requested length"
                            />
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                            <input
                              type="number"
                              step="0.01"
                              value={editingSale.sold_length}
                              onChange={(e) =>
                                setEditingSale({ ...editingSale, sold_length: e.target.value })
                              }
                              className="w-full min-w-[60px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                              aria-label="Edit sold length"
                            />
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                            <input
                              type="number"
                              step="0.01"
                              value={editingSale.price_per_meter}
                              onChange={(e) =>
                                setEditingSale({
                                  ...editingSale,
                                  price_per_meter: e.target.value,
                                })
                              }
                              className="w-full min-w-[60px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                              aria-label="Edit price per meter"
                            />
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                            <input
                              type="number"
                              step="0.01"
                              value={editingSale.total_amount}
                              onChange={(e) =>
                                setEditingSale({ ...editingSale, total_amount: e.target.value })
                              }
                              className="w-full min-w-[70px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                              aria-label="Edit total amount"
                            />
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                            <input
                              type="date"
                              value={editingSale.date}
                              onChange={(e) => setEditingSale({ ...editingSale, date: e.target.value })}
                              className="w-full min-w-[100px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                              aria-label="Edit sale date"
                            />
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 border-r border-gray-200">
                            <input
                              type="text"
                              value={editingSale.remarks || ""}
                              onChange={(e) =>
                                setEditingSale({ ...editingSale, remarks: e.target.value })
                              }
                              className="w-full min-w-[80px] px-1 md:px-2 py-1 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 ring-blue-500"
                              aria-label="Edit remarks"
                            />
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3">
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleEditSale(editingSale)}
                                disabled={loading}
                                className="flex items-center justify-center bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50 w-[60px] h-8"
                                aria-label="Save sale changes"
                              >
                                <Save className="h-3 w-3" />
                                <span className="hidden sm:inline ml-1">
                                  {loading ? "Saving..." : "Save"}
                                </span>
                              </button>
                              <button
                                onClick={() => setEditingSale(null)}
                                className="flex items-center justify-center bg-gray-500 text-white rounded text-xs hover:bg-gray-600 w-[60px] h-8"
                                aria-label="Cancel editing sale"
                              >
                                <X className="h-3 w-3" />
                                <span className="hidden sm:inline ml-1">Cancel</span>
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900 border-r border-gray-200">
                            {sale.sale_id}
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
                            {sale.customer_name}
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-600 border-r border-gray-200">
                            {sale.customer_details || "-"}
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
                            {sale.requested_length}m
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
                            {sale.sold_length}m
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
                            {formatCurrency(sale.price_per_meter)}
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-green-600 border-r border-gray-200">
                            {formatCurrency(sale.total_amount)}
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 border-r border-gray-200">
                            {formatDate(sale.date)}
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-600 border-r border-gray-200">
                            {sale.remarks || "-"}
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3">
                            <div className="flex space-x-1">
                              <button
                                onClick={() => setEditingSale({ ...sale })}
                                className="flex items-center justify-center bg-[#8B7CF8] text-white rounded text-xs hover:opacity-90 w-[60px] h-8"
                                aria-label={`Edit sale ${sale.sale_id}`}
                              >
                                <Edit2 className="h-3 w-3" />
                                <span className="hidden sm:inline ml-1">Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteSale(sale.id)}
                                disabled={loading}
                                className="flex items-center justify-center bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50 w-[60px] h-8"
                                aria-label={`Delete sale ${sale.sale_id}`}
                              >
                                <Trash2 className="h-3 w-3" />
                                <span className="hidden sm:inline ml-1">Delete</span>
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      className="px-2 md:px-4 py-6 md:py-8 text-center text-gray-500 text-xs md:text-sm"
                    >
                      No sales records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

