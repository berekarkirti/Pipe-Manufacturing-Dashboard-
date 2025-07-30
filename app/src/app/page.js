'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Layout/Header'
import StatsCards from '@/components/Dashboard/StatsCards'
import RawMaterials from '@/components/Dashboard/RawMaterials'
import Manufacturing from '@/components/Dashboard/Manufacturing'
import SalesInventory from '@/components/Dashboard/SalesInventory'
import RecentSales from '@/components/Dashboard/RecentSales'
import WasteManagement from '@/components/Dashboard/WasteManagement'
import { dbOperations } from '@/lib/supabase'
import SettingsPanel from '@/components/Dashboard/SettingsPanel'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Raw Materials')
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalPipes: 0,
      monthlyRevenue: 0,
      ordersThisMonth: 0,
      lowStockItems: 0
    },
    rawMaterials: [],
    products: [],
    manufacturingRecords: [],
    salesTransactions: [],
    wasteRecords: []
  })
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const [stats, rawMaterials, products, manufacturing, sales, waste] = await Promise.all([
        dbOperations.getDashboardStats(),
        dbOperations.getRawMaterials(),
        dbOperations.getProducts(),
        dbOperations.getManufacturingRecords(),
        dbOperations.getSalesTransactions(),
        dbOperations.getWasteRecords()
      ])

      setDashboardData({
        stats: stats || {
          totalPipes: 0,
          monthlyRevenue: 0,
          ordersThisMonth: 0,
          lowStockItems: 0
        },
        rawMaterials: rawMaterials.data || [],
        products: products.data || [],
        manufacturingRecords: manufacturing.data || [],
        salesTransactions: sales.data || [],
        wasteRecords: waste.data || []
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Keep default values on error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refreshData = () => {
    fetchData()
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#8B7CF8' }}></div>
        </div>
      )
    }

    switch (activeTab) {
      case 'Manufacturing':
        return <Manufacturing data={dashboardData.manufacturingRecords} onRefresh={refreshData} />
      case 'Sales':
        return (
          <div className='space-y-6'>
            <SalesInventory data={dashboardData.products} onRefresh={refreshData} />
            <RecentSales data={dashboardData.salesTransactions} />
          </div>
        )
      case 'Reports':
        return (

          <WasteManagement data={dashboardData.wasteRecords} onRefresh={refreshData} />

        )
      case 'Settings':
        return <SettingsPanel />
      default:
        return <RawMaterials data={dashboardData.rawMaterials} onRefresh={refreshData} />
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Use the merged Header component with props */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <StatsCards stats={dashboardData.stats} />
        {renderContent()}
      </div>
    </div>
  )
}