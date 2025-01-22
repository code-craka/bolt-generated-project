import { useState } from 'react'
    import { Outlet } from 'react-router-dom'
    import Sidebar from './Sidebar'
    import Header from './Header'

    export default function Layout() {
      const [sidebarOpen, setSidebarOpen] = useState(false)

      return (
        <div className="min-h-screen bg-gray-50">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="lg:pl-64 flex flex-col flex-1">
            <Header setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 p-6">
              <Outlet />
            </main>
          </div>
        </div>
      )
    }
