import React, { useState, useEffect } from 'react'
import { 
  Settings, 
  User, 
  Package,
  Save,
  LogOut,
  Eye,
  EyeOff,
  Upload,
  AlertTriangle,
  Check,
  X,
  Menu
} from 'lucide-react'

export default function SettingsPanel() {
  const [activeSection, setActiveSection] = useState('Profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // User Profile State
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    profilePicture: null
  })

  // Inventory Settings State
  const [inventorySettings, setInventorySettings] = useState({
    rawMaterials: [
      { id: 1, name: 'Steel Sheets', currentStock: 150, lowStockLevel: 20, unit: 'pieces', category: 'Raw Material' },
      { id: 2, name: 'Aluminum Pipes', currentStock: 85, lowStockLevel: 15, unit: 'pieces', category: 'Raw Material' },
      { id: 3, name: 'Copper Tubes', currentStock: 45, lowStockLevel: 10, unit: 'pieces', category: 'Raw Material' },
      { id: 4, name: 'Welding Rods', currentStock: 200, lowStockLevel: 50, unit: 'pieces', category: 'Consumable' },
      { id: 5, name: 'Paint Coating', currentStock: 25, lowStockLevel: 8, unit: 'liters', category: 'Finishing' }
    ],
    emailAlerts: true,
    smsAlerts: false,
    alertFrequency: 'daily', // daily, weekly, immediate
    alertRecipients: ['']
  })

  // Load user data on component mount
  useEffect(() => {
    loadUserProfile()
    loadInventorySettings()
  }, [])

  const loadUserProfile = async () => {
    try {
      // Replace with actual API call
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        phone: '+91 98765 43210',
        position: 'Production Manager',
        department: 'Manufacturing'
      }
      setUserProfile(prev => ({ ...prev, ...userData }))
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  const loadInventorySettings = async () => {
    try {
      // Replace with actual API call to load current settings
      console.log('Loading inventory settings...')
    } catch (error) {
      console.error('Error loading inventory settings:', error)
    }
  }

  const handleProfileUpdate = async () => {
    setSaveStatus('saving')
    
    try {
      // Validate passwords if changing
      if (userProfile.newPassword) {
        if (userProfile.newPassword !== userProfile.confirmPassword) {
          throw new Error('New passwords do not match')
        }
        if (userProfile.newPassword.length < 6) {
          throw new Error('Password must be at least 6 characters')
        }
      }

      // API call to update profile
      const updateData = {
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        phone: userProfile.phone,
        position: userProfile.position,
        department: userProfile.department
      }

      if (userProfile.newPassword) {
        updateData.currentPassword = userProfile.currentPassword
        updateData.newPassword = userProfile.newPassword
      }

      // Replace with actual API call
      console.log('Updating profile:', updateData)
      
      setSaveStatus('success')
      // Clear password fields
      setUserProfile(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }))
      
      setTimeout(() => setSaveStatus(''), 3000)
    } catch (error) {
      setSaveStatus('error')
      console.error('Error updating profile:', error)
      setTimeout(() => setSaveStatus(''), 3000)
    }
  }

  const handleInventoryUpdate = async () => {
    setSaveStatus('saving')
    
    try {
      // Validate email recipients
      const validEmails = inventorySettings.alertRecipients.filter(email => 
        email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      )

      const updateData = {
        ...inventorySettings,
        alertRecipients: validEmails
      }

      // Replace with actual API call
      console.log('Updating inventory settings:', updateData)
      
      setSaveStatus('success')
      setTimeout(() => setSaveStatus(''), 3000)
    } catch (error) {
      setSaveStatus('error')
      console.error('Error updating inventory settings:', error)
      setTimeout(() => setSaveStatus(''), 3000)
    }
  }

  const handleStockLevelChange = (id, newLevel) => {
    setInventorySettings(prev => ({
      ...prev,
      rawMaterials: prev.rawMaterials.map(item =>
        item.id === id ? { ...item, lowStockLevel: parseInt(newLevel) || 0 } : item
      )
    }))
  }

  const addEmailRecipient = () => {
    setInventorySettings(prev => ({
      ...prev,
      alertRecipients: [...prev.alertRecipients, '']
    }))
  }

  const updateEmailRecipient = (index, email) => {
    setInventorySettings(prev => ({
      ...prev,
      alertRecipients: prev.alertRecipients.map((item, i) => 
        i === index ? email : item
      )
    }))
  }

  const removeEmailRecipient = (index) => {
    setInventorySettings(prev => ({
      ...prev,
      alertRecipients: prev.alertRecipients.filter((_, i) => i !== index)
    }))
  }

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        // Replace with actual logout API call
        console.log('Logging out...')
        // Clear user session
        localStorage.removeItem('userToken')
        // Redirect to login page
        window.location.href = '/login'
      } catch (error) {
        console.error('Error during logout:', error)
      }
    }
  }

  const sections = [
    { id: 'Profile', title: 'User Profile', icon: User },
    { id: 'Inventory', title: 'Inventory Settings', icon: Package }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 overflow-hidden max-w-full">
      <div className="flex flex-col lg:flex-row min-h-screen lg:min-h-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-purple-100 border-b-2 border-purple-300 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6" style={{ color: '#8B7CF8' }} />
              <h2 className="text-xl font-bold text-gray-800">Settings</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`w-full lg:w-80 bg-purple-100 border-r-2 border-purple-300 ${
          sidebarOpen ? 'block' : 'hidden lg:block'
        }`}>
          <div className="hidden lg:block p-6 border-b-2 border-purple-300">
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6" style={{ color: '#8B7CF8' }} />
              <h2 className="text-xl font-bold text-gray-800">Settings</h2>
            </div>
          </div>
          
          <div className="p-4 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left border-2 ${
                    activeSection === section.id
                      ? 'text-white shadow-lg border-purple-400'
                      : 'text-gray-700 hover:bg-purple-200 border-transparent hover:border-purple-300'
                  }`}
                  style={activeSection === section.id ? { backgroundColor: '#8B7CF8' } : {}}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{section.title}</span>
                </button>
              )
            })}
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left text-red-600 hover:bg-red-50 mt-4 border-2 border-transparent hover:border-red-200"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-auto">
          {activeSection === 'Profile' && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">User Profile</h3>
                <p className="text-sm sm:text-base text-gray-600">Manage your personal information and account settings</p>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={userProfile.firstName}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={userProfile.lastName}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Position</label>
                    <input
                      type="text"
                      value={userProfile.position}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, position: e.target.value }))}
                      className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={userProfile.department}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-sm sm:text-base"
                    >
                      <option value="">Select Department</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Sales">Sales</option>
                      <option value="Quality Control">Quality Control</option>
                      <option value="Inventory">Inventory</option>
                      <option value="Administration">Administration</option>
                    </select>
                  </div>
                </div>

                {/* Change Password Section */}
                <div className="border-t-2 border-purple-200 pt-6">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Change Password</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={userProfile.currentPassword}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 pr-10 text-sm sm:text-base"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-purple-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={userProfile.newPassword}
                            onChange={(e) => setUserProfile(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 pr-10 text-sm sm:text-base"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-purple-600 transition-colors"
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          value={userProfile.confirmPassword}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleProfileUpdate}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 text-white rounded-lg transition-all duration-200 shadow-lg font-medium border-2 border-purple-400 hover:border-purple-500 text-sm sm:text-base"
                    style={{ backgroundColor: '#8B7CF8' }}
                    disabled={saveStatus === 'saving'}
                  >
                    <Save className="h-4 w-4" />
                    <span>{saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  
                  {saveStatus === 'success' && (
                    <div className="flex items-center space-x-2 text-green-600 text-sm sm:text-base">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Changes saved successfully!</span>
                    </div>
                  )}
                  
                  {saveStatus === 'error' && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm sm:text-base">
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Error saving changes. Please try again.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'Inventory' && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Inventory Settings</h3>
                <p className="text-sm sm:text-base text-gray-600">Configure low stock alerts and inventory management preferences</p>
              </div>

              <div className="space-y-8">
                {/* Low Stock Levels */}
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Low Stock Alert Levels</h4>
                  <div className="space-y-4">
                    {inventorySettings.rawMaterials.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border-2 border-purple-200 space-y-3 sm:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-start sm:items-center space-x-3">
                            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 mt-1 sm:mt-0 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-gray-800 text-sm sm:text-base">{item.name}</h5>
                              <p className="text-xs sm:text-sm text-gray-600">
                                Current Stock: {item.currentStock} {item.unit} • Category: {item.category}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                          {item.currentStock <= item.lowStockLevel && (
                            <div className="flex items-center space-x-1 text-red-600">
                              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="text-xs sm:text-sm font-medium">Low Stock!</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <label className="text-xs sm:text-sm font-medium text-gray-700">Alert Level:</label>
                            <input
                              type="number"
                              value={item.lowStockLevel}
                              onChange={(e) => handleStockLevelChange(item.id, e.target.value)}
                              className="w-16 sm:w-20 px-2 py-1 border-2 border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-xs sm:text-sm"
                              min="0"
                            />
                            <span className="text-xs sm:text-sm text-gray-600">{item.unit}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alert Settings */}
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Alert Preferences</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Alert Frequency</label>
                        <select
                          value={inventorySettings.alertFrequency}
                          onChange={(e) => setInventorySettings(prev => ({ ...prev, alertFrequency: e.target.value }))}
                          className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-sm sm:text-base"
                        >
                          <option value="immediate">Immediate</option>
                          <option value="daily">Daily Summary</option>
                          <option value="weekly">Weekly Summary</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="emailAlerts"
                            checked={inventorySettings.emailAlerts}
                            onChange={(e) => setInventorySettings(prev => ({ ...prev, emailAlerts: e.target.checked }))}
                            className="w-4 h-4 text-purple-600 border-2 border-purple-300 rounded focus:ring-purple-500"
                          />
                          <label htmlFor="emailAlerts" className="text-xs sm:text-sm font-medium text-gray-700">Email Alerts</label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="smsAlerts"
                            checked={inventorySettings.smsAlerts}
                            onChange={(e) => setInventorySettings(prev => ({ ...prev, smsAlerts: e.target.checked }))}
                            className="w-4 h-4 text-purple-600 border-2 border-purple-300 rounded focus:ring-purple-500"
                          />
                          <label htmlFor="smsAlerts" className="text-xs sm:text-sm font-medium text-gray-700">SMS Alerts</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Recipients */}
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Alert Recipients</h4>
                  <div className="space-y-3">
                    {inventorySettings.alertRecipients.map((email, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => updateEmailRecipient(index, e.target.value)}
                          placeholder="Enter email address"
                          className="flex-1 px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-sm sm:text-base"
                        />
                        <button
                          type="button"
                          onClick={() => removeEmailRecipient(index)}
                          className="px-2 sm:px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border-2 border-transparent hover:border-red-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addEmailRecipient}
                      className="text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-lg transition-colors font-medium border-2 border-transparent hover:border-purple-200 text-sm sm:text-base"
                    >
                      + Add Email Recipient
                    </button>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleInventoryUpdate}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 text-white rounded-lg transition-all duration-200 shadow-lg font-medium border-2 border-purple-400 hover:border-purple-500 text-sm sm:text-base"
                    style={{ backgroundColor: '#8B7CF8' }}
                    disabled={saveStatus === 'saving'}
                  >
                    <Save className="h-4 w-4" />
                    <span>{saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}</span>
                  </button>
                  
                  {saveStatus === 'success' && (
                    <div className="flex items-center space-x-2 text-green-600 text-sm sm:text-base">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Settings saved successfully!</span>
                    </div>
                  )}
                  
                  {saveStatus === 'error' && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm sm:text-base">
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Error saving settings. Please try again.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}