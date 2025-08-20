import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"

export default function Electricity() {
  const { user, isAuthenticated } = useAuth()
  const name = user?.name || '—'
  const email = user?.email || '—'
  const age = (user?.age ?? user?.age === 0) ? user.age : '—'
  const phone = user?.phone || '—'
  const address = user?.address || '—'
  const avatar = user?.profile_picture_url || ''
  const API_BASE = (import.meta?.env?.VITE_API_URL || '').replace(/\/$/, '')
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  useEffect(() => {
    if (!user?.id) return
    const fetchBills = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/bills?user_id=${user.id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || 'Failed to load bills')
        setBills(data.bills || [])
      } catch (e) {
        setError(e.message)
      }
    }
    fetchBills()
  }, [user?.id])

  // Helper: order bills as May/June/July 2000
  const monthsOrder = ["May 2000", "June 2000", "July 2000"]
  const displayBills = monthsOrder.map((m) => bills.find((b) => b.month === m))

  // If redirected back with a Stripe session_id, poll to update status
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')
    if (!sessionId) return
    let attempts = 0
    const maxAttempts = 10
    const interval = setInterval(async () => {
      attempts += 1
      try {
        const res = await fetch(`${API_BASE}/api/bills/checkout-status?session_id=${encodeURIComponent(sessionId)}`)
        const data = await res.json()
        if (data.payment_status === 'paid') {
          clearInterval(interval)
          if (user?.id) {
            const r = await fetch(`${API_BASE}/api/bills?user_id=${user.id}`)
            const d = await r.json()
            if (r.ok) setBills(d.bills || [])
          }
        }
      } catch {
        // ignore and retry
      }
      if (attempts >= maxAttempts) clearInterval(interval)
    }, 1500)
    return () => clearInterval(interval)
  }, [user?.id])

  const formatAmount = (cents, currency = 'usd') => {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format((cents || 0) / 100)
    } catch {
      return `$${((cents || 0) / 100).toFixed(2)}`
    }
  }

  const payBill = async (bill) => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API_BASE}/api/bills/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bill_id: bill.id,
          success_url: `${window.location.origin}/electricity?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/electricity`
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to start checkout')
      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout className="min-h-screen pb-20 font-blockblueprint text-black">
      {/* Page Title */}
      <h1 className="text-center text-4xl font-bold mt-6 tracking-wide">
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
          <div className="p-4 text-sm leading-relaxed font-blockblueprint">
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
            {avatar ? (
              <img src={avatar} alt="avatar" className="w-28 h-28 border-2 border-black shadow-md object-cover rounded" />
            ) : (
              <div className="w-28 h-28 border-2 border-black shadow-md bg-cream rounded flex items-center justify-center text-2xl">
                {typeof name === 'string' && name.trim() ? name.trim().slice(0,1).toUpperCase() : '?'}
              </div>
            )}
            <div>
              <h2 className="font-bold text-3xl mb-1">About</h2>
              <p>Full Name: {name}</p>
              <p>Email: {email}</p>
              <p>Age: {age}</p>
              <p>Phone Number: {phone}</p>
              <p>Address: {address}</p>
            </div>
          </div>

          {/* Bills Section */}
          <div className="px-6 pb-8">
            <h2 className="font-bold text-lg mb-4">Your Bills</h2>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <div className="flex flex-col md:flex-row gap-6">
              {displayBills.map((b, i) => (
                <div key={monthsOrder[i]} className="bg-[#f8b259] border-2 border-black p-4 flex-1 rounded-md shadow-[4px_4px_0px_black]">
                  <h3 className="font-bold">BILL - {monthsOrder[i].toUpperCase()}</h3>
                  <span className="text-black ml-2">
                    {b ? ` ${formatAmount(b.amount_cents ?? (typeof b.amount === 'number' ? Math.round(b.amount * 100) : 0), b.currency || 'usd')}` : ''}
                  </span>
                  <p className={b?.status === 'paid' ? 'text-green-700' : 'text-red-600'}>
                    {b?.status === 'paid' ? 'received' : 'pending'}
                  </p>
                  {b?.status === 'paid' ? (
                    <button className="mt-2 bg-gradient-to-b from-[#f59e0b] to-[#d97706] text-white px-3 py-1 rounded shadow">
                      Download receipt
                    </button>
                  ) : (
                    <button
                      className="mt-2 bg-red-600 text-white px-3 py-1 rounded shadow disabled:opacity-60"
                      onClick={() => b && payBill(b)}
                      disabled={!b || loading}
                    >
                      {loading ? 'Starting checkout…' : 'Pay Online!'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}