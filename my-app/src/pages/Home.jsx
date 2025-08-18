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
        <Card1 className='flex-1 h-full text-gray-700' title='News and Press Releases'>
            <div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Press Conference on 2 August 2002</li>
                <li>Press Conference on 18 July 2002</li>
                <li>Notice for all residents of Susland</li>
                <li>Notice in lieu of security for UPM Day</li>
                <li>Press Conference on 21 June 2002</li>
                <li>Details of Surveillance Committee setup by govt.</li>
                <li>Budget Day - 2002</li>
              </ul>
            </div>
          
        </Card1>
        <Card1 className='flex-1 h-full text-gray-700' title='Most Requested Information'>
          <div>
            <ul className="list-disc pl-5 space-y-1">
              <li>How to operate '.com for all'</li>
              <li>Details on Budget 2002</li>
              <li>How to register for Voter ID (new voters)</li>
              <li>How to apply for an Aadhar Card</li>
              <li>How to pay my electricity bill?</li>
            </ul>
          </div>
        </Card1>
        
        <Card1 className='flex-1 h-full text-gray-700' title='Activities and Initiatives'>
          <div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Details on Govt. Supported Farmer Loans</li>
              <li>Details on Govt. Supported Small Business Loans</li>
              <li>Details on the new state-wise Healthcare Scheme</li>
              <li>Details on benefits for Economically Weaker Section</li>
              <li>Details on New Pension Scheme</li>
            </ul>
          </div>
        </Card1>

      </div>

    </Layout>
  )
}
