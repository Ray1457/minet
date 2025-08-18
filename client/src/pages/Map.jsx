import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

import flagmockup from '../assets/imgs/flagmockup.png'
import map from '../assets/imgs/map.png'



export default function Map() {
  return (
    <Layout className="min-h-screen pb-48 text-gray-800 font-blockblueprint">

        <div className="flex w-full mt-8 px-12 gap-12 max-h-[75vh justify-center items-start">
             <p className='text-5xl font-bold text-center mr-12 mt-24'>
            UNITED PINGDOM OF MINET <br />

                <span className='text-3xl'>
                    Capital : Susland
                </span>
            </p>

            <div className='flex flex-col items-center justify-center w-auto'>
              <img src={map} alt="Map" className='h-[75vh]' />
            </div>
        </div>

    </Layout>
  )
}
