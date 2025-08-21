import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Card2 from '../components/Card2'
import Card1 from '../components/Card1'
import Avatar from '../assets/imgs/Avatar.png'
import doc1 from '../assets/imgs/doc1.png'
import doc2 from '../assets/imgs/doc2.png'

import healthimg from '../assets/imgs/health.png'

export default function Home() {
  return (
    <Layout className="min-h-screen pb-48">
      <div className='relative h-[75vh] w-full'>
        <img src={healthimg} alt="" className='absolute right-28 z-30 top-[-3rem] h-96' />
        <Card2 className='w-3/4 mx-auto mt-12 text-gray-900 font-blockblueprint' contentClassName='px-12 py-16'>
          <p className='text-5xl font-bold '>
            NATIONAL HEALTHCARE
          </p>

          <p className='text-gray-700 text-lg mt-1 max-w-prose'>
            Welcome to the official website of National Healthcare of UPM. You can find appropriate medical advice you are seeking from government verified practitioners. You can also learn about, and apply for government healthcare schemes from here.
          </p>

          {/* Schemes Section */}
          <div className='h-80 w-full px-2 flex items-center justify-around gap-4 mt-14'>
            <Card1 className='flex-1 h-full text-gray-700' title='Pensioners(above 60y)'>
              The government of UPM launched it's healthcare scheme in association with the Pension Authority of UPM to ensure our elderly get the best possible treatment without having to worry about the cost.
              This scheme includes an additional medical cover of 300,000ℳ for the receiver over their provided cover, and an additional cover of 150,000ℳ for any two family members.
            </Card1>

            <Card1 className='flex-1 h-full text-gray-700' title='Non Pensioners(above 60y)'>
              The government of UPM launched it's healthcare scheme in association with the Hospitals Association of UPM to provide a total cover of 600,000ℳ for any non pensioner above the age of 60 under this scheme.
            </Card1>

            <Card1 className='flex-1 h-full text-gray-700' title='Families of Armed Personnel'>
              The government of UPM has launched a full medical cover of upto 600,000ℳ and a 50% cover above that for families of all military and para-military personnel.
            </Card1>
          </div>
        </Card2>
      </div>

      {/* Learn From The Best Section */}
      <div className="mt-48 w-3/4 mx-auto text-gray-900 font-blockblueprint">
        <h2 className="text-5xl md:text-6xl font-extrabold text-left mb-2 ">Learn From The Best!</h2>
        <p className="text-left text-gray-600 text-lg mt-1 mb-10">Get the perfect medical advice online now!</p>

        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8">
          {/* Expert Cards */}
          <ExpertCard
            name="Suguru"
            role="Nurse"
            desc="If you know you know ;)... The best care comes from understanding. Dihman the President Understands everyone and anyone feom Susland to border."
            avatar={Avatar}
          />
          <ExpertCard
            name="Chiyo Shuzenji"
            role="Pediatrician"
            desc="Ability to accelerate the body’s natural healing process in children. Make then fot so that they can run around the Streets of Susland"
            avatar={doc1}
          />
          <ExpertCard
            name="Lady Tsunade"
            role="Orthopedist"
            desc="Possesses the ability to regenerate virtually any wound, including limbs and organs. Make Dihpur make like never before"
            avatar={doc2}
          />
        </div>
      </div>
    </Layout>
  )
}

// Reusable card styled to match the design (offset shadow, border, avatar, blue role)
function ExpertCard({ name, role, desc, avatar }) {
  return (
    <div className="relative w-full md:w-1/3">
      {/* offset shadow */}
      <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-xl bg-[#D96F32] -z-10" />
      <div className="relative bg-[#F9BE7A] border-1 border-black rounded-xl px-6 py-5">
        <p className="font-extrabold text-2xl tracking-wide">{name}</p>
        <div className="mt-3 flex items-start gap-4">
          {avatar ? (
            <img src={avatar} alt={`${name} avatar`} className="w-12 h-12 rounded-full border-2 border-black object-cover" />
          ) : null}
          <div className="min-w-0">
            <p className="font-semibold text-sm text-blue-900 underline underline-offset-2">{role}</p>
            <p className="text-[13px] leading-snug text-black/80 mt-1">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
