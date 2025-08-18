import flag from '../assets/imgs/flag.png';
import { useState } from 'react';


export default function Navbar({ isAuthenticated = false, onLogout }) {
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <header className="w-full bg-cream font-blockblueprint relative h-32">
      <div className="flex flex-col w-full h-full">
        <div className="w-full shadow-xl px-2 h-1/2 flex items-center justify-between">
          <div className="flex w-1/2 h-full">
              <a href="/" className='h-full w-12'><img src={flag} alt="" className='object-cover my-2' /> </a>
              <div className='mx-4 my-auto'>
                <p className='text-theme-orange text-3xl'>
                  United Pingdom of Minet
                </p>
                <p className='text-lg text-slate-500 mt-[-8px]'>
                  Your Nation, Online. Safe. Simple. Secure.
                </p>
              </div>                   
          </div>

          <div>
            {isAuthenticated && (
              <a
                href="/dashboard"
                title="Profile"
                className="h-10 w-10 rounded-full bg-theme-orange text-cream flex items-center justify-center border-2 border-dark-orange shadow-md hover:shadow-sm transition-shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
                  <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8H4z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        <a 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-theme-orange text-cream h-24 w-24 flex items-center justify-center"
        href='/'
        >
            <p className="text-3xl font-calpina">UPM</p>
        </a>

        <div className='flex justify-between h-1/2 w-full'>
          <nav className='flex justify-around items-center w-1/3'>
              {/* Topics with dropdown that stays open while hovering menu */}
              <div
                className="relative"
                onMouseEnter={() => setTopicsOpen(true)}
                onMouseLeave={() => setTopicsOpen(false)}
              >
                <a
                  href="/topics"
                  className="text-xl text-gray-700 inline-flex items-center gap-1"
                  aria-haspopup="true"
                  aria-expanded={topicsOpen}
                >
                  Topics
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.2l3.71-2.97a.75.75 0 11.94 1.16l-4.24 3.4a.75.75 0 01-.94 0L5.25 8.39a.75.75 0 01-.02-1.18z"/>
                  </svg>
                </a>
                {/* Dropdown menu */}
                <div
                  className={`absolute left-0 top-full mt-0 w-48 bg-cream border-2 border-black rounded-md shadow-lg z-50 transition 
                    ${topicsOpen ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 translate-y-1 invisible pointer-events-none'}`}
                  role="menu"
                >
                  <a href="/map" className="block px-3 py-2 text-gray-800 hover:bg-gray-100" role="menuitem">Map</a>
                  <a href="/price" className="block px-3 py-2 text-gray-800 hover:bg-gray-100" role="menuitem">Prices</a>
                </div>
              </div>
        {/* Services with dropdown (submenu: Electricity, Water) */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <a
                  href="/services"
                  className="text-xl text-gray-700 inline-flex items-center gap-1"
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                >
                  Services
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.2l3.71-2.97a.75.75 0 11.94 1.16l-4.24 3.4a.75.75 0 01-.94 0L5.25 8.39a.75.75 0 01-.02-1.18z"/>
                  </svg>
                </a>
                <div
                  className={`absolute left-0 top-full mt-0 w-56 bg-cream border-2 border-black rounded-md shadow-lg z-50 transition ${servicesOpen ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 translate-y-1 invisible pointer-events-none'}`}
                  role="menu"
                >
          <a href="/services/electricity" className="block px-3 py-2 text-gray-800 hover:bg-gray-100" role="menuitem">Electricity</a>
          <a href="/services/water" className="block px-3 py-2 text-gray-800 hover:bg-gray-100" role="menuitem">Water</a>
                </div>
              </div>
              <a href="/scam-alert" className='text-xl text-gray-700 bg-red-500 rounded-md px-2 py-1'>
                  Scam Alert
              </a>
          </nav>
          <nav className='flex justify-around items-center w-1/3 gap-2'>
              <a href="/tutorials" className='text-xl text-gray-700'>
                  Tutorials
              </a>
              <a href="/contact" className='text-xl text-gray-700'>
                  Contact
              </a>
              {!isAuthenticated ? (
                <>
                  <a href="/login" className='text-xl text-white bg-gold rounded-lg px-2 py-1 border-8 border-t-yellow-300 border-l-yellow-300 border-r-yellow-700 border-b-yellow-700 shadow-xl hover:shadow-lg active:shadow-inner transition-all duration-150 font-semibold'>
                    Sign in
                  </a>
                  <a href="/register" className='text-xl text-white bg-theme-orange rounded-lg px-2 py-1 border-8 border-t-orange-300 border-l-orange-300 border-r-red-700 border-b-red-700 shadow-xl hover:shadow-lg active:shadow-inner transition-all duration-150 font-semibold'>
                    Register
                  </a>
                </>
              ) : (
                <button
                  type='button'
                  onClick={onLogout}
                  className='text-xl text-white bg-theme-orange rounded-lg px-2 py-1 border-8 border-t-orange-300 border-l-orange-300 border-r-red-700 border-b-red-700 shadow-xl hover:shadow-lg active:shadow-inner transition-all duration-150 font-semibold'
                >
                  Logout
                </button>
              )}
          </nav>
        </div>
      </div>
    </header>
  )
}
