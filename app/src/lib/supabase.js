import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database operations
export const dbOperations = {

  // Get all users from database
  async getUsers() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
      
      return { data, error }
    } catch (error) {
      console.error('Error fetching users:', error)
      return { data: null, error: error.message }
    }
  },

  // Get user by ID
  async getUserById(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
      
      return { data, error }
    } catch (error) {
      console.error('Error fetching user:', error)
      return { data: null, error: error.message }
    }
  },

  // Update user profile
  async updateUserProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          phone: profileData.phone,
          position: profileData.position,
          department: profileData.department,
          updatedAt: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single()
      
      return { data, error }
    } catch (error) {
      console.error('Error updating user profile:', error)
      return { data: null, error: error.message }
    }
  },

  // Update user password
  async updateUserPassword(userId, currentPassword, newPassword) {
    try {
      // First verify current password
      const { data: user, error: fetchError } = await this.getUserById(userId)
      
      if (fetchError || !user) {
        return { data: null, error: 'User not found' }
      }

      if (user.password !== currentPassword) {
        return { data: null, error: 'Current password is incorrect' }
      }

      // Update password
      const { data, error } = await supabase
        .from('users')
        .update({ 
          password: newPassword,  // Hash this in production!
          updatedAt: new Date().toISOString()
        })
        .eq('id', userId)
      
      return { data: { success: true }, error }
    } catch (error) {
      console.error('Error updating password:', error)
      return { data: null, error: error.message }
    }
  },

  // Update raw material
  async updateRawMaterial(materialId, updateData) {
    try {
      const { data, error } = await supabase
        .from('raw_materials')  // Adjust table name as needed
        .update(updateData)
        .eq('id', materialId)
      
      return { data, error }
    } catch (error) {
      console.error('Error updating raw material:', error)
      return { data: null, error: error.message }
    }
  },

  // Raw Materials CRUD
  async getRawMaterials() {
    const { data, error } = await supabase
      .from('raw_materials')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async addRawMaterial(material) {
    const { data, error } = await supabase
      .from('raw_materials')
      .insert([material])
      .select()
    return { data, error }
  },

  async updateRawMaterial(id, updates) {
    const { data, error } = await supabase
      .from('raw_materials')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    return { data, error }
  },

  async deleteRawMaterial(id) {
    const { data, error } = await supabase
      .from('raw_materials')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  // Products CRUD
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async addProduct(product) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
    return { data, error }
  },

  async updateProduct(id, updates) {
    const { data, error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    return { data, error }
  },

  async deleteProduct(id) {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  // Manufacturing Records CRUD
  async getManufacturingRecords() {
    const { data, error } = await supabase
      .from('manufacturing_records')
      .select('*')
      .order('date', { ascending: false })
    return { data, error }
  },

  async addManufacturingRecord(record) {
    const { data, error } = await supabase
      .from('manufacturing_records')
      .insert([record])
      .select()
    return { data, error }
  },

  async updateManufacturingRecord(id, updates) {
    const { data, error } = await supabase
      .from('manufacturing_records')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  async deleteManufacturingRecord(id) {
    const { data, error } = await supabase
      .from('manufacturing_records')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  // Sales Transactions CRUD
  async getSalesTransactions() {
    const { data, error } = await supabase
      .from('sales_transactions')
      .select('*')
      .order('date', { ascending: false })
    return { data, error }
  },

  async addSalesTransaction(transaction) {
    const { data, error } = await supabase
      .from('sales_transactions')
      .insert([transaction])
      .select()
    return { data, error }
  },

  async updateSalesTransaction(id, updates) {
    const { data, error } = await supabase
      .from('sales_transactions')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  async deleteSalesTransaction(id) {
    const { data, error } = await supabase
      .from('sales_transactions')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  // Waste Management CRUD
  async getWasteRecords() {
    const { data, error } = await supabase
      .from('waste_management')
      .select('*')
      .order('date', { ascending: false })
    return { data, error }
  },

  async addWasteRecord(record) {
    const { data, error } = await supabase
      .from('waste_management')
      .insert([record])
      .select()
    return { data, error }
  },

  async updateWasteRecord(id, updates) {
    const { data, error } = await supabase
      .from('waste_management')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  async deleteWasteRecord(id) {
    const { data, error } = await supabase
      .from('waste_management')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  // Dashboard Analytics
  async getDashboardStats() {
    try {
      // Get total pipes in stock
      const { data: products } = await supabase
        .from('products')
        .select('available_length')
      
      const totalPipes = products?.reduce((sum, product) => sum + parseFloat(product.available_length || 0), 0) || 0

      // Get monthly revenue
      const currentMonth = new Date().getMonth() + 1
      const currentYear = new Date().getFullYear()
      
      const { data: sales } = await supabase
        .from('sales_transactions')
        .select('total_amount')
        .gte('date', `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`)
      
      const monthlyRevenue = sales?.reduce((sum, sale) => sum + parseFloat(sale.total_amount || 0), 0) || 0

      // Get orders this month
      const ordersThisMonth = sales?.length || 0

      // Get low stock items
      const { data: lowStockProducts } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'Low Stock')
      
      const lowStockItems = lowStockProducts?.length || 0

      return {
        totalPipes: Math.round(totalPipes),
        monthlyRevenue,
        ordersThisMonth,
        lowStockItems
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      return {
        totalPipes: 0,
        monthlyRevenue: 0,
        ordersThisMonth: 0,
        lowStockItems: 0
      }
    }
  }
}