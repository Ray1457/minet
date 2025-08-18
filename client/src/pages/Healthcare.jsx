import Layout from "../components/Layout"

export default function Electricity() {
  return (
    <Layout className="min-h-screen pb-20 font-['Block-Blueprint'] bg-[#fef6f0] text-black">

      {/* Page Title */}
      <h1 className="text-center text-2xl font-bold mt-6 tracking-wide">
        ELECTRICITY DEPARTMENT
      </h1>

      <div className="flex flex-col md:flex-row gap-10 justify-center mt-10 px-6 md:px-20">

        {/* Notice Board */}
        <div className="border-2 border-black shadow-[6px_6px_0px_black] bg-[#fff] w-full md:w-1/3 rounded-md overflow-hidden font-['Block-Blueprint']">
          {/* Fake Browser Header */}
          <div className="bg-[#d9722e] flex items-center justify-start px-3 py-1 border-b-2 border-black">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* Notice Content */}
          <div className="p-4 text-sm leading-relaxed">
            <h2 className="font-bold text-lg flex items-center gap-2">
              Notice Board
            </h2>

            <p className="mt-2">
              Welcome to UPM Electric, the official power supplier of United
              Pingdom of Minet. For details about your connection click here
              To get a new connection click here To get a summary of your last
              consumption click here To change details of your connection click here
            </p>
            <button className="mt-3 bg-gradient-to-b from-[#4a5bd8] to-[#3a44b5] text-white px-3 py-1 rounded shadow">
              Know more
            </button>

            {/* Divider */}
            <div className="border-t border-dotted border-gray-500 my-4"></div>

            <p>
              A power outage will happen today during the night hours between
              3AM and 4AM around the Board Game Industry due to maintenance work.
              We apologise for the inconvenience.
            </p>
            <button className="mt-3 bg-gradient-to-b from-[#4a5bd8] to-[#3a44b5] text-white px-3 py-1 rounded shadow">
              Know more
            </button>
          </div>
        </div>

        {/* User Details + Bills */}
        <div className="border-2 border-black shadow-[6px_6px_0px_black] bg-white flex-1 rounded-md overflow-hidden">
          {/* Header Bar */}
          <div className="bg-[#d9722e] h-8 border-b-2 border-black"></div>

          {/* Profile Info */}
          <div className="flex items-center gap-4 p-6">
            <img
              src="https://placehold.co/120x120"
              alt="avatar"
              className="w-28 h-28 border-2 border-black shadow-md"
            />
            <div>
              <h2 className="font-bold text-lg mb-1">About</h2>
              <p>Full Name: atmkbfjg</p>
              <p>Email: atmkbftjsg@gmail.com</p>
              <p>Age: 69</p>
              <p>Phone Number: XXXXXXXXXX</p>
              <p>Address: Dihpur, UPM</p>
            </div>
          </div>

          {/* Bills Section */}
          <div className="px-6 pb-8">
            <h2 className="font-bold text-lg mb-4">Bills Pending</h2>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Bill 1 */}
              <div className="bg-[#f8b259] border-2 border-black p-4 flex-1 rounded-md shadow-[4px_4px_0px_black]">
                <h3 className="font-bold">BILL - MAY 2000</h3>
                <p className="text-green-700">received</p>
                <button className="mt-2 bg-gradient-to-b from-[#f59e0b] to-[#d97706] text-white px-3 py-1 rounded shadow">
                  Download receipt
                </button>
              </div>

              {/* Bill 2 */}
              <div className="bg-[#f8b259] border-2 border-black p-4 flex-1 rounded-md shadow-[4px_4px_0px_black]">
                <h3 className="font-bold">BILL - JUNE 2000</h3>
                <p className="text-red-600">pending</p>
                <button className="mt-2 bg-red-600 text-white px-3 py-1 rounded shadow">
                  Pay Online!
                </button>
              </div>

              {/* Bill 3 */}
              <div className="bg-[#f8b259] border-2 border-black p-4 flex-1 rounded-md shadow-[4px_4px_0px_black]">
                <h3 className="font-bold">BILL - JULY 2000</h3>
                <p className="text-green-700">received</p>
                <button className="mt-2 bg-gradient-to-b from-[#f59e0b] to-[#d97706] text-white px-3 py-1 rounded shadow">
                  Download receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
