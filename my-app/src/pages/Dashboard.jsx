import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Card2 from '../components/Card2'
import Card3 from '../components/Card3'

export default function Home() {
  return (
    <Layout className="min-h-screen pb-48">
      
        <main className='flex h-auto w-full px-12 gap-12 font-blockblueprint mt-12 text-gray-900'>
            <div className='flex flex-col w-1/3 gap-16'>
                <Card2>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                        About
                    </h1>
                    <p className='text-lg text-gray-600'>
                        Full Name: John Doe <br />
                        Email: john.doe@example.com <br />
                        Age : 69 <br />
                        Phone Number : 123-456-7890 <br />
                        Address : Dihpur , UPM
                    </p>

                </Card2>

                 <Card2>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                        Certificates
                    </h1>
                    
                    <div className='space-y-4'>
                        {/* Matriculation Certificate */}
                        <div className='flex items-start gap-3'>
                            <div className='flex-shrink-0 mt-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-700">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-lg font-bold text-gray-900 mb-2'>Matriculation</h3>
                                <p className='text-sm text-gray-600 mb-2'>
                                    Issuing Authority: NBE
                                </p>
                                <button className='text-blue-600 text-sm font-semibold hover:underline'>download</button>
                            </div>
                        </div>

                        {/* Aadhar Card */}
                        <div className='flex items-start gap-3'>
                            <div className='flex-shrink-0 mt-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-700">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-lg font-bold text-gray-900 mb-2'>Aadhar Card</h3>
                                <p className='text-sm text-gray-600 mb-2'>
                                    Issuing Authority: AAOM
                                </p>
                                <button className='text-blue-600 text-sm font-semibold hover:underline'>download</button>
                            </div>
                        </div>

                        {/* PAN Card */}
                        <div className='flex items-start gap-3'>
                            <div className='flex-shrink-0 mt-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-700">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-lg font-bold text-gray-900 mb-2'>PAN Card</h3>
                                <p className='text-sm text-gray-600 mb-2'>
                                    Issuing Authority: IT Dept.
                                </p>
                                <button className='text-blue-600 text-sm font-semibold hover:underline'>download</button>
                            </div>
                        </div>

                        {/* Voter ID */}
                        <div className='flex items-start gap-3'>
                            <div className='flex-shrink-0 mt-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-700">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-lg font-bold text-gray-900 mb-2'>Voter ID</h3>
                                <p className='text-sm text-gray-600 mb-2'>
                                    Issuing Authority: EC
                                </p>
                                <button className='text-blue-600 text-sm font-semibold hover:underline'>download</button>
                            </div>
                        </div>
                    </div>

                </Card2>
            </div>
            <div className='flex flex-col w-2/3 mt-6'>
                <p className='text-5xl font-bold text-gray-900 mb-4'>
                    DASHBOARD
                </p>

                <Card2 className='' contentClassName='px-12 py-8'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                        Profile
                    </h1>
                    <p className='text-lg text-gray-600'>
                        Full Name: John Doe <br />
                        Email: john.doe@example.com <br />
                        Age : 69 <br />
                        Phone Number : 123-456-7890 <br />
                        Address : Dihpur , UPM
                    </p>

                    <h2 className='text-3xl font-bold text-gray-900 mt-6 mb-2'>
                        Details
                    </h2>
                    <p className='text-md text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   

                    </p>
                </Card2>
                <Card3 className='mt-12' contentClassName='px-12 py-8'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                        Important Forms
                    </h1>
                    
                    <div className='grid grid-cols-2 gap-6 mt-6'>
                        {/* Police Verification Application */}
                        <div className='flex items-start gap-4'>
                            <div className='w-10 h-10 rounded-full border-2 border-black bg-cream flex items-center justify-center flex-shrink-0 mt-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-lg font-bold text-gray-900 mb-2'>Police Verification Application</h3>
                                <button className='text-blue-600 text-sm font-semibold hover:underline'>Download Now</button>
                            </div>
                        </div>

                        {/* Caste Certificate Application */}
                        <div className='flex items-start gap-4'>
                            <div className='w-10 h-10 rounded-full border-2 border-black bg-cream flex items-center justify-center flex-shrink-0 mt-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-lg font-bold text-gray-900 mb-2'>Caste Certificate Application</h3>
                                <button className='text-blue-600 text-sm font-semibold hover:underline'>Download Now</button>
                            </div>
                        </div>

                        {/* Asset Declaration Application for EWS */}
                        <div className='flex items-start gap-4'>
                            <div className='w-10 h-10 rounded-full border-2 border-black bg-cream flex items-center justify-center flex-shrink-0 mt-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-lg font-bold text-gray-900 mb-2'>Asset Declaration Application for EWS</h3>
                                <button className='text-blue-600 text-sm font-semibold hover:underline'>Download Now</button>
                            </div>
                        </div>

                        {/* Income Tax Certificate Application */}
                        <div className='flex items-start gap-4'>
                            <div className='w-10 h-10 rounded-full border-2 border-black bg-cream flex items-center justify-center flex-shrink-0 mt-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-lg font-bold text-gray-900 mb-2'>Income Tax Certificate Application</h3>
                                <button className='text-blue-600 text-sm font-semibold hover:underline'>Download Now</button>
                            </div>
                        </div>

                        {/* Application for Voter I-Cards */}
                        <div className='flex items-start gap-4'>
                            <div className='w-10 h-10 rounded-full border-2 border-black bg-cream flex items-center justify-center flex-shrink-0 mt-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-lg font-bold text-gray-900 mb-2'>Application for Voter I-Cards</h3>
                                <button className='text-blue-600 text-sm font-semibold hover:underline'>Download Now</button>
                            </div>
                        </div>

                        {/* Application for Driving Licence */}
                        <div className='flex items-start gap-4'>
                            <div className='w-10 h-10 rounded-full border-2 border-black bg-cream flex items-center justify-center flex-shrink-0 mt-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-lg font-bold text-gray-900 mb-2'>Application for Driving Licence</h3>
                                <button className='text-blue-600 text-sm font-semibold hover:underline'>Download Now</button>
                            </div>
                        </div>
                    </div>
                </Card3>
            </div>

        </main>


    </Layout>
  )
}
