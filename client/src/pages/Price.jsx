import Layout from '../components/Layout'
import prices from '../assets/imgs/prices.png'
import Icon from '../assets/imgs/icon.png'
import Trending from '../assets/imgs/trending.png'

export default function Price() {
  return (
    <Layout className="min-h-screen pb-48">
      {/* Center the demo window within the page container */}
      <div className="page-container flex flex-col items-center justify-center py-16 space-y-12">
        
        {/* Window Container with Chart */}
        <div className="max-w-3xl w-full border border-black rounded-md">
          {/* Top Bar */}
          <div className="flex items-center space-x-2 px-2 py-1 bg-[#D96F32] rounded-t-md shadow-[0_3px_0_0_#D96F32]">
            <div className="w-3 h-3 bg-[#f9f1e8] border border-black rounded-full" />
            <div className="w-3 h-3 bg-[#ff1b19] border border-black rounded-full" />
            <div className="w-3 h-3 bg-[#fdb563] border border-black rounded-full" />
          </div>

          {/* Content */}
          <div className="p-6 flex justify-center">
            <img 
              src={prices} 
              alt="Price chart" 
              className="w-[700px] h-auto object-contain"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="border border-black rounded-md shadow-[8px_8px_0_0_#D96F32]">
            <thead>
              <tr className="bg-[#D96F32] text-[#f9f1e8]">
                <th className="px-4 py-2 border border-black">S.No</th>
                <th className="px-8 py-2 border border-black">Product</th>
                <th className="px-8 py-2 border border-black">Price in tons (<span className="italic">ℳ</span>)</th>
              </tr>
            </thead>
            <tbody className="bg-[#f9f1e8] text-black font-semibold">
              <tr>
                <td className="px-4 py-2 border border-black text-center">1</td>
                <td className="px-8 py-2 border border-black text-center">Wheat</td>
                <td className="px-8 py-2 border border-black text-center">520<span className="italic">ℳ</span> <span className="">↗</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-black text-center">2</td>
                <td className="px-8 py-2 border border-black text-center">Rice</td>
                <td className="px-8 py-2 border border-black text-center">498<span className="italic">ℳ</span> <span className="text-green-600">↗</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-black text-center">3</td>
                <td className="px-8 py-2 border border-black text-center">Maize</td>
                <td className="px-8 py-2 border border-black text-center">555<span className="italic">ℳ</span> <span className="text-green-600">↗</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-black text-center">4</td>
                <td className="px-8 py-2 border border-black text-center">Cotton</td>
                <td className="px-8 py-2 border border-black text-center">540<span className="italic">ℳ</span> <span className="text-red-600">↘</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-black text-center">5</td>
                <td className="px-8 py-2 border border-black text-center">Arhar</td>
                <td className="px-8 py-2 border border-black text-center">510<span className="italic">ℳ</span> <span className="text-red-600">↘</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-black text-center">6</td>
                <td className="px-8 py-2 border border-black text-center">Moong</td>
                <td className="px-8 py-2 border border-black text-center">490<span className="italic">ℳ</span> <span className="text-green-600">↗</span></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  )
}
