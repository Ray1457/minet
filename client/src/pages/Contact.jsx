import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Card4 from '../components/Card4'
import maize from '../assets/imgs/maize.png'
import transport from '../assets/imgs/transport.png'

export default function Home() {
  return (
    <Layout className="min-h-screen pb-48 font-['Block-Blueprint']">
      {/* Main Window */}
      <Card4 title="Contact Forms" className='w-3/4 mx-auto'>
        <div className="space-y-6 text-gray-900">

          {/* Agriculture Department */}
          <div className="flex items-center gap-4 bg-red-100 p-4 rounded-lg shadow-sm">
            {/* Icon */}
            <img src={maize} alt="Agriculture" className="w-20 h-20 object-contain" />

            {/* Info */}
            <div className="flex flex-col text-black">
              <h2 className="text-lg font-bold">Agriculture Department</h2>
              <p className="text-sm">Name: John Doe</p>
              <p className="text-sm">Office: 8th Floor, Agriculture Ministry, Susland</p>
              <p className="text-sm">Contact No.: 1400 XXX 141</p>

              {/* Button */}
              <Link
                to="/"
                className="mt-2 bg-orange-100 text-blue-700 font-semibold px-3 py-1 rounded shadow hover:bg-orange-200 transition"
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Transport Department */}
          <div className="flex items-center gap-4 bg-red-100 p-4 rounded-lg shadow-sm">
            {/* Icon */}
            <img src={transport} alt="Transport" className="w-20 h-20 object-contain" />
            
            {/* Info */}
            <div className="flex flex-col font-black">
              <h2 className="text-lg font-bold">Transport Department</h2>
              <p className="text-sm">Name: John Loe</p>
              <p className="text-sm">Office: 14, Transport House, Susland</p>
              <p className="text-sm">Contact No.: 1400 XXX 181</p>

              {/* Button */}
              <Link
                to="/"
                className="mt-2 bg-orange-100 text-blue-700 font-semibold px-3 py-1 rounded shadow hover:bg-orange-200 transition"
              >
                Book Appointment
              </Link>
            </div>
          </div>

        </div>
      </Card4>
    </Layout>
  )
}
