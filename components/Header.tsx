import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline'

    export default function Header({ setSidebarOpen }) {
      return (
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex-1 px-4">
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-1 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <BellIcon className="w-6 h-6" />
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 overflow-hidden rounded-full">
                  <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="User profile"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
      )
    }
