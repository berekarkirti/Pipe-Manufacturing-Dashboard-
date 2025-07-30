import { Factory, Package, Settings, BarChart3, ShoppingCart, Wrench, Menu, X } from 'lucide-react'
import { useState } from 'react'

const tabs = [
  { name: 'Raw Materials', icon: Package },
  { name: 'Manufacturing', icon: Wrench },
  { name: 'Sales', icon: ShoppingCart },
  { name: 'Reports', icon: BarChart3 },
  { name: 'Settings', icon: Settings }
]

export default function Header({ activeTab, setActiveTab }) {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)

  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
    setIsOffcanvasOpen(false) // Close offcanvas when tab is selected
  }

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          {/* Header Section */}
          <div className="flex items-center space-x-3">
            <Factory className="h-8 w-8" style={{ color: '#8B7CF8' }} />
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#8B7CF8' }}>
                <span className="hidden sm:inline">Pipe Manufacturing Dashboard</span>
                <span className="sm:hidden">Dashboard</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1 hidden md:block">
                Complete Production, Inventory & Sales Management System
              </p>
            </div>
          </div>

          {/* Desktop Navigation Section */}
          <div className="hidden lg:flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.name
                        
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                  style={isActive ? { backgroundColor: '#8B7CF8' } : {}}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOffcanvasOpen(true)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Off-canvas Overlay */}
      {isOffcanvasOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0  bg-opacity-50 transition-opacity"
            onClick={() => setIsOffcanvasOpen(false)}
          />
          
          {/* Off-canvas Panel */}
          <div className="relative ml-auto flex h-full w-80 max-w-xs flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Factory className="h-6 w-6" style={{ color: '#8B7CF8' }} />
                <h2 className="text-lg font-bold" style={{ color: '#8B7CF8' }}>
                  Navigation
                </h2>
              </div>
              <button
                onClick={() => setIsOffcanvasOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 px-6 py-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.name
                  
                  return (
                    <button
                      key={tab.name}
                      onClick={() => handleTabClick(tab.name)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-left ${
                        isActive
                          ? 'text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                      style={isActive ? { backgroundColor: '#8B7CF8' } : {}}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}