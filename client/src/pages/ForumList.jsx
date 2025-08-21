import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function ForumList() {
  const { isAuthenticated, user } = useAuth()
  const API_BASE = (import.meta?.env?.VITE_API_URL || '').replace(/\/$/, '')
  const [q, setQ] = useState("")
  const [forums, setForums] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const fetchForums = async (query = "") => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API_BASE}/api/forums${query ? `?q=${encodeURIComponent(query)}` : ''}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to load forums')
      setForums(data.forums || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchForums("") }, [])


  return (
    <Layout className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 py-8 font-blockblueprint">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Forums</h1>
          {isAuthenticated && (
            <Link to="/forum/new" className="border-2 border-black rounded px-3 py-2 bg-theme-orange text-white">Create Forum</Link>
          )}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title"
            className="border-2 border-black rounded px-3 py-2 w-full bg-orange-200"
          />
          <button onClick={() => fetchForums(q)} className="border-2 border-black rounded px-3 py-2 bg-cream">Search</button>
        </div>

        {loading && <p>Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}

        <ul className="space-y-3">
          {forums.map((f) => (
            <li key={f.id} className="border-2 border-black rounded p-4 bg-white">
              <a href={`/forum/${f.id}`} className="text-xl font-bold hover:underline">{f.title}</a>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                {f.author_avatar && (
                  <img
                    src={`${API_BASE}${f.author_avatar}`}
                    alt={f.author ? `${f.author}'s avatar` : 'Author avatar'}
                    className="w-6 h-6 rounded-full border-2 border-black object-cover"
                    loading="lazy"
                  />
                )}
                <span>{f.author} • {f.created_at}</span>
              </div>
              <p className="mt-2 line-clamp-2">{f.body}</p>
            </li>
          ))}
          {forums.length === 0 && !loading && <p>No forums found.</p>}
        </ul>
      </div>
    </Layout>
  )
}
