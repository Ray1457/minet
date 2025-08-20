import React, { useRef, useState } from 'react'
import Layout from '../components/Layout'
import Card4 from '../components/Card4'
import Card1 from '../components/Card1'
import Card2 from '../components/Card2'
import tut1 from '../assets/imgs/tut1.png'
import tut2 from '../assets/imgs/tut2.png'
import tut3 from '../assets/imgs/tut3.png'

// Tutorial videos (ensure these files exist at client/src/assets/tuts/)
import video1 from '../assets/tuts/1.mp4'
import video2 from '../assets/tuts/2.mp4'
import video3 from '../assets/tuts/3.mp4'

function TutorialVideo({ src, subtitle, thumbnail }) {
  const [started, setStarted] = useState(false)
  const videoRef = useRef(null)

  const onPlayClick = () => {
    setStarted(true)
    // Ensure the video element exists before calling play; user gesture triggers playback
    requestAnimationFrame(() => {
      videoRef.current?.play?.()
    })
  }

  return (
    <div className="flex flex-col items-center text-center space-y-3 w-full">
      {/* Media area: thumbnail before start, video after */}
      <div className="w-64 max-w-full">
        {!started ? (
          <div className="relative aspect-video rounded-md border border-black overflow-hidden">
            {thumbnail ? (
              <img 
                src={thumbnail} 
                alt="Video thumbnail" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="aspect-video bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center">
                <span className="text-gray-600 text-2xl">▶</span>
              </div>
            )}
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <span className="text-white text-4xl drop-shadow-lg">▶</span>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={src}
            controls
            playsInline
            className="w-full aspect-video rounded-md border border-black bg-black"
          />
        )}
      </div>
      {/* Subtitle */}
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      {/* Play button (visible until started) */}
      {!started && (
        <button
          type="button"
          onClick={onPlayClick}
          className="bg-theme-orange border border-black rounded px-3 py-1 text-sm font-medium hover:brightness-95 active:brightness-90 shadow-sm"
        >
          Play
        </button>
      )}
    </div>
  )
}

export default function Tutorials() {
  return (
    <Layout className="min-h-screen pb-48 font-blockblueprint">
      {/* Main Tutorials Window */}
      <Card4 title="Tutorials" className='mt-12 w-3/4 mx-auto'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1 */}
          <Card2 title="Welcome to .com for all!" showTab showChromeBar>
            <TutorialVideo src={video1} subtitle="How to operate" thumbnail={tut1} />
          </Card2>

          {/* Card 2 */}
          <Card2 title="Sign Up!" showTab showChromeBar>
            <TutorialVideo src={video2} subtitle="Create your first profile" thumbnail={tut2} />
          </Card2>

          {/* Card 3 */}
          <Card2 title="Apply!" showTab showChromeBar>
            <TutorialVideo src={video3} subtitle="Apply for documents hassle-free" thumbnail={tut3} />
          </Card2>

        </div>
      </Card4>
    </Layout>
  )
}
