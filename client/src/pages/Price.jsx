import Layout from '../components/Layout'
import prices from '../assets/imgs/prices.png'
import Icon from '../assets/imgs/Icon.png'
import Trending from '../assets/imgs/Trending.png'

export default function Price() {
  return (
    <Layout className="min-h-screen pb-48 font-['Block-Blueprint']">
      {/* Price Rates page-content */}
      <div className="page-container flex flex-col items-center justify-center py-12 ">
        {/* Title tab */}
        <div className="inline-flex px-12 py-4 bg-[#D96F32] text-white border-2 border-black  font-blockblueprint font-bold text-2xl tracking-wider border-b-0 rounded-b-none rounded-md">
          PRICE RATES
        </div>

        {/* Chart Window with offset panel */}
        <div className="relative w-full max-w-5xl mb-10">
          <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#D96F32] rounded-md" aria-hidden="true" />
          <div className="relative bg-white border-2 border-black rounded-md overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center space-x-2 px-2 py-1 bg-[#D96F32] rounded-t-md shadow-[0_3px_0_0_#D96F32]">
              <div className="w-3 h-3 bg-[#f9f1e8] border border-black rounded-full" />
              <div className="w-3 h-3 bg-[#ff1b19] border border-black rounded-full" />
              <div className="w-3 h-3 bg-[#fdb563] border border-black rounded-full" />
            </div>
            {/* Content */}
            <div className="p-4 md:p-6 flex justify-center bg-white">
              <img src={prices} alt="Price chart" className="w-full max-w-[900px] h-auto object-contain" />
            </div>
          </div>
        </div>

        {/* Table with offset shadow */}
        <div className="relative w-full max-w-5xl">
          <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#D96F32] rounded-md" aria-hidden="true" />
          <div className="relative bg-white border-2 border-black rounded-md overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-[#D96F32] text-[#f9f1e8]">
                  <th className="w-16 px-3 py-2 border-r-2 border-black text-center">S.No</th>
                  <th className="px-4 py-2 border-r-2 border-black text-left">Product</th>
                  <th className="w-56 px-4 py-2 border-r-2 border-black text-center">Price in tons (<span className="italic">ℳ</span>)</th>
                  <th className="w-16 px-2 py-2 text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="bg-[#f9f1e8] text-black font-semibold text-center">
                {[
                  { id: 1, name: 'Orange', price: 520, icon: Trending },
                  { id: 2, name: 'Rice', price: 498, icon: Trending },
                  { id: 3, name: 'Sugarcane', price: 555, icon: Trending },
                  { id: 4, name: 'Lime', price: 540, icon: Icon },
                  { id: 5, name: 'Wheat', price: 510, icon: Icon },
                  { id: 6, name: 'Moong', price: 490, icon: Trending },
                ].map((row) => (
                  <tr key={row.id} className="border-t-2 border-black">
                    <td className="px-3 py-2 border-r-2 border-black">{row.id}</td>
                    <td className="px-4 py-2 border-r-2 border-black">{row.name}</td>
                    <td className="px-4 py-2 border-r-2 border-black">
                      {row.price}
                      <span className="italic">ℳ</span>
                    </td>
                    <td className="px-2 py-2">
                      <img src={row.icon} alt="trend" className="inline-block w-6 h-6" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Layout>
  )
}
