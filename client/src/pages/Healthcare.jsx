import Layout from '../components/Layout'
import left from '../assets/imgs/left.png'
import right from '../assets/imgs/right.png'

export default function ScamWarning() {
  return (
    <Layout className="min-h-screen pb-48 font-['Block-Blueprint'] text-black">

      {/* Title */}
      <div className="flex justify-center items-center gap-4 mt-6 select-none">
        <span className="text-red-600 text-5xl md:text-6xl leading-none">✖</span>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-widest uppercase">Beware of Scammers!</h1>
        <span className="text-green-600 text-5xl md:text-6xl leading-none">✔</span>
      </div>

      {/* Monitors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8 px-6 md:px-10">
        <div className="flex flex-col items-center">
          <img src={left} alt="scam example left" className="w-80 md:w-[340px] drop-shadow-[8px_8px_0_rgba(0,0,0,0.2)]" />
        </div>
        <div className="flex flex-col items-center">
          <img src={right} alt="scam example right" className="w-80 md:w-[340px] drop-shadow-[8px_8px_0_rgba(0,0,0,0.2)]" />
        </div>
      </div>

      {/* Notepad-style Precautions window */}
      <div className="relative mx-4 md:mx-12 mt-10">
        {/* offset shadow */}
        <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#d26a2f] rounded-md" aria-hidden="true" />
        <div className="relative bg-white border-2 border-black rounded-md overflow-hidden">
          {/* Blue title bar */}
          <div className="flex items-center justify-between bg-[#0b5ed7] text-white px-3 py-1 border-b-2 border-black">
            <span className="font-semibold text-sm">Untitled - Notepad</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-white border border-black inline-block"></span>
              <span className="w-3 h-3 bg-white border border-black inline-block"></span>
              <span className="w-3 h-3 bg-white border border-black inline-block"></span>
            </div>
          </div>
          {/* Menu bar */}
          <div className="bg-white text-black px-3 py-1 border-b-2 border-black text-xs tracking-wide">
            File &nbsp; Edit &nbsp; Search &nbsp; Help
          </div>

          {/* Body */}
          <div className="p-4 md:p-6 text-sm leading-relaxed">
            <h2 className="font-extrabold underline mb-2">PRECAUTIONS:</h2>
            <p>
              Don’t share confidential details like banking details, addresses, etc. with anybody.
              Don’t give anybody you don’t know access to your dot-com profile. The Government of UPM does NOT ask
              for any details except your name and telephone no., don’t share any other details. Keep strong passwords
              that are difficult to guess, not things like your birthday or worse, your name.
            </p>
          </div>

          {/* bottom resizer corner */}
          <div className="flex justify-end pr-2 pb-2">
            <div className="w-3 h-3 border-r-2 border-b-2 border-black rotate-45" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-extrabold tracking-wider">Check out more schemes!</h2>
        <p className="text-sm text-gray-700">Get the perfect advice online now!</p>
      </div>

      {/* Schemes Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 px-6 md:px-16">
        {[1, 2, 3].map((num) => (
          <div key={num} className="relative">
            {/* offset */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#d26a2f] rounded-md" aria-hidden="true" />
            <div className="relative bg-white border-2 border-black rounded-md p-5 text-left">
              <h3 className="font-extrabold">Scheme</h3>
              <p className="text-sm text-gray-600">Text</p>
            </div>
          </div>
        ))}
      </div>

    </Layout>
  )
}
