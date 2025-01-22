import { XMarkIcon } from '@heroicons/react/24/outline'
    import { NavLink } from 'react-router-dom'

    const navigation = [
      { name: 'Dashboard', href: '/' },
      { name: 'Promoters', href: '/promoters' },
      { name: 'Campaigns', href: '/campaigns' },
      { name: 'Commissions', href: '/commissions' },
      { name: 'Reports', href: '/reports' },
      { name: 'Assets', href: '/assets' }
    ]

    export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
      return (
        <>
          <div className={`fixed inset-0 bg-gray-900/50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} 
               onClick={() => setSidebarOpen(false)} />
          <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition duration-200 ease-in-out bg-white ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto`}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <div className="text-lg font-semibold">Affiliate Dashboard</div>
              <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <nav className="mt-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => 
                    `block px-4 py-2 text-sm font-medium ${
                      isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </>
      )
    }
