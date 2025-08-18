import flag from '../assets/imgs/flag.png';


export default function Navbar({ isAuthenticated = false, onLogout }) {
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
              <a href="/topics" className='text-xl text-gray-700'>
                  Topics
              </a>
              <a href="/services" className='text-xl text-gray-700'>
                  Services
              </a>
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
