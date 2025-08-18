import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Card2 from '../components/Card2'
import Card1 from '../components/Card1'

import healthimg from '../assets/imgs/health.png'


export default function Home() {
  return (
    <Layout className="min-h-screen pb-48">
        <div className='relative h-[75vh] w-full' >
            <img src={healthimg} alt="" className='absolute right-28 z-30 top-[-3rem] h-96' />
            <Card2 className='w-3/4 mx-auto mt-12 text-gray-900 font-blockblueprint' contentClassName='px-12 py-16'>
                <p className='text-5xl font-bold '>
                    NATIONAL HEALTHCARE
                </p>

                <p className='text-gray-700 text-lg mt-1 max-w-prose'>
                    Welcome to the official website of National Healthcare of UPM. You can find appropriate medical advice you are seeking from government verified practitioners. You can also learn about, and apply for government healthcare schemes from here.
                </p>


                <div className='h-80 w-full px-2 flex items-center justify-around gap-4 mt-14'>
                        <Card1 className='flex-1 h-full text-gray-700' title='Pensioners(above 60y)'>
                            
The government of UPM launched it's healthcare scheme in association with the Pension Authority of UPM to ensure our elderly get the best possible treatment without having to worry about the cost.
This scheme includes an additional medical cover of 300,000ℳ for the receiver over their provided cover, and an additional cover of 150,000ℳ for any two family members.
                          
                        </Card1>
                        <Card1 className='flex-1 h-full text-gray-700' title='
                          Non Pensioners(above 60y)'>
The government of UPM launched it's healthcare scheme in association with the Hospitals Association of UPM to provide a total cover of 600,000ℳ for any non pensioner above the age of 60 under this scheme.
                        </Card1>
                        
                        <Card1 className='flex-1 h-full text-gray-700' title='Families of Armed Personnel'>
                          
The government of UPM has launched a full medical cover of upto 600,000ℳ and a 50% cover above that for families of all military and para-military personnel.
                        </Card1>
                
                      </div>

            </Card2>

        </div>

        

    </Layout>
  )
}
