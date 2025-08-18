import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

import flagmockup from '../assets/imgs/flagmockup.png'
import map from '../assets/imgs/map.png'



export default function Map() {
  return (
    <Layout className="min-h-screen pb-48 text-gray-800 font-blockblueprint">
        <p className='text-4xl font-bold text-center'>
            UNITED PINGDOM OF MINET
        </p>

        <div className="flex w-full mt-8 px-12 gap-12 max-h-[75vh">
            <div className='flex flex-col items-center justify-center w-1/2 '>
              <p className='text-3xl font-semibold'>
                FLAG
              </p>
              <img src={flagmockup} alt="Flag Mockup" className='w-full' />
            </div>
            <div className='flex flex-col items-center justify-center w-1/2 '>
              <p className='text-3xl font-semibold'>
                MAP
              </p>
              <img src={map} alt="Map" className='w-full' />
            </div>
        </div>

    </Layout>
  )
}
