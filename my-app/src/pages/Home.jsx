import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import hero from '../assets/imgs/hero.png'
import Card1 from '../components/Card1'

export default function Home() {
  return (
    <Layout className="min-h-screen pb-48">
      <div className="page-container ">
        {/* Constrain the hero section to 75vh and keep image in normal flow */}
        <div className="w-full h-[75vh] max-h-screen overflow-hidden flex items-center justify-center">
          <img src={hero} alt="" className="block max-h-full max-w-full w-auto h-auto object-contain" />
        </div>
      </div>

      <div className='h-96 w-full px-16 flex items-center justify-around gap-16 mt-32'>
        <Card1 className='flex-1 h-full' title='News and Press Releases'>

          
        </Card1>
        <Card1 className='flex-1 h-full' title='Most Requested Information'>
          
          
        </Card1>
        <Card1 className='flex-1 h-full' title='Activities and Initiatives'>
          
          
        </Card1>

      </div>

    </Layout>
  )
}
