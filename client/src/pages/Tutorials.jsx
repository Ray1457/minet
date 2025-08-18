import React from 'react'
import Layout from '../components/Layout'
import Card4 from '../components/Card4'

export default function Tutorials() {
  return (
    <Layout className="min-h-screen pb-48 font-['Block-Blueprint']">
      {/* Main Tutorials Window */}
      <Card4 title="Tutorials" className='mt-12'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1 */}
          <Card4 title="Welcome to .com for all!" showTab showChromeBar>
            <div className="flex flex-col items-center text-center space-y-3">
              {/* Image Placeholder */}
              <div className="w-32 h-32 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center">
                <span className="text-gray-500">📷</span>
              </div>
              {/* Subtitle */}
              <p className="text-sm text-gray-600">How to operate</p>
              {/* Button */}
              <button className="bg-gray-200 border border-black rounded px-3 py-1 text-sm font-medium hover:bg-gray-300">
                Play
              </button>
            </div>
          </Card4>

          {/* Card 2 */}
          <Card4 title="Sign Up!" showTab showChromeBar>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-32 h-32 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center">
                <span className="text-gray-500">📷</span>
              </div>
              <p className="text-sm text-gray-600">Create your first profile</p>
              <button className="bg-gray-200 border border-black rounded px-3 py-1 text-sm font-medium hover:bg-gray-300">
                Play
              </button>
            </div>
          </Card4>

          {/* Card 3 */}
          <Card4 title="Apply!" showTab showChromeBar>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-32 h-32 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center">
                <span className="text-gray-500">📷</span>
              </div>
              <p className="text-sm text-gray-600">Apply for documents hassle-free</p>
              <button className="bg-gray-200 border border-black rounded px-3 py-1 text-sm font-medium hover:bg-gray-300">
                Play
              </button>
            </div>
          </Card4>

        </div>
      </Card4>
    </Layout>
  )
}
