import React, { useState } from 'react'
    import Sidebar from './components/Sidebar'
    import Header from './components/Header'
    import Dashboard from './views/Dashboard'
    import Promoters from './views/Promoters'
    import Assets from './views/Assets'
    import { Route, Routes } from 'react-router-dom'

    export default function App() {
      const [sidebarOpen, setSidebarOpen] = useState(false)

      return (
        <div className="min-h-screen bg-gray-100">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="lg:pl-64 flex flex-col flex-1">
            <Header setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/promoters" element={<Promoters />} />
                <Route path="/assets" element={<Assets />} />
              </Routes>
            </main>
          </div>
        </div>
      )
    }
