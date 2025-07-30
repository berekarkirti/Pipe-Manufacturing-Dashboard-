'use client'

import React, { useState, useEffect } from 'react'
import { Factory, Eye, EyeOff, User, Lock, AlertCircle, Loader } from 'lucide-react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Check if already authenticated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('userToken')
      const userData = localStorage.getItem('userData')
      
      if (token && userData) {
        window.location.href = '/dashboard'
      }
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const handleLogin = async () => {
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      // API call to authenticate user
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Login successful
        localStorage.setItem('userToken', data.token)
        localStorage.setItem('userData', JSON.stringify(data.user))
        
        // Redirect to dashboard
        window.location.href = '/dashboard'
      } else {
        // Login failed
        setError(data.message || 'Invalid email or password')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(135deg, #8B7CF8 0%, #9D8DF1 50%, #C084FC 100%)' }}>
      <div className="max-w-md w-full mx-auto space-y-8 flex flex-col justify-center min-h-screen">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Factory className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Pipe Manufacturing</h1>
          <p className="text-white/80 mt-2">Production Management System</p>
        </div>

        {/* Login Form - Same white card style as dashboard */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all"
                  style={{ focusRingColor: '#8B7CF8' }}
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all"
                  style={{ focusRingColor: '#8B7CF8' }}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Login Button - Same color as dashboard theme */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 outline-none shadow-lg hover:shadow-xl"
              style={{ 
                backgroundColor: '#8B7CF8',
                ':hover': { backgroundColor: '#7C3AED' },
                ':disabled': { backgroundColor: '#C4B5FD' }
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#7C3AED')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#8B7CF8')}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 inline mr-2" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}