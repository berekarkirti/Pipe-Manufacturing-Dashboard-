import { dbOperations } from './supabase'

export const authUtils = {
  // Validate user credentials against database
  async authenticateUser(email, password) {
    try {
      // Query users collection in database
      const { data: users, error } = await dbOperations.getUsers()
      
      if (error) {
        throw new Error('Database connection failed')
      }

      // Find user by email (case insensitive)
      const user = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase()
      )

      if (!user) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      // Check password (in production, use proper password hashing)
      if (user.password !== password) {
        return {
          success: false,
          message: 'Invalid password'
        }
      }

      // Check if user is active
      if (user.status !== 'active') {
        return {
          success: false,
          message: 'Account is inactive. Contact administrator.'
        }
      }

      // Generate session token (in production, use JWT)
      const token = this.generateToken(user.id)

      // Return user data (exclude password)
      const { password: _, ...userWithoutPassword } = user

      return {
        success: true,
        user: userWithoutPassword,
        token: token
      }
    } catch (error) {
      console.error('Authentication error:', error)
      return {
        success: false,
        message: 'Authentication failed'
      }
    }
  },

  // Generate simple token (use JWT in production)
  generateToken(userId) {
    const timestamp = Date.now()
    return btoa(`${userId}:${timestamp}`)
  },

  // Validate token and get user data
  async validateToken(token) {
    try {
      if (!token) return null

      // Decode token (in production, verify JWT)
      const decoded = atob(token)
      const [userId] = decoded.split(':')

      // Get user from database
      const { data: users, error } = await dbOperations.getUsers()
      if (error) return null

      const user = users.find(u => u.id.toString() === userId)
      if (!user || user.status !== 'active') return null

      // Return user without password
      const { password: _, ...userWithoutPassword } = user
      return userWithoutPassword
    } catch (error) {
      console.error('Token validation error:', error)
      return null
    }
  },

  // Get current logged in user
  getCurrentUser() {
    if (typeof window === 'undefined') return null
    
    const userData = localStorage.getItem('userData')
    return userData ? JSON.parse(userData) : null
  },

  // Check if user is logged in
  isAuthenticated() {
    if (typeof window === 'undefined') return false
    
    const token = localStorage.getItem('userToken')
    const userData = localStorage.getItem('userData')
    return !!(token && userData)
  },

  // Logout user
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userToken')
      localStorage.removeItem('userData')
      window.location.href = '/login'
    }
  }
}