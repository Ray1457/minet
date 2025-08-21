import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function ForumCreate() {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const API_BASE = (import.meta?.env?.VITE_API_URL || '').replace(/\/$/, '')
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API_BASE}/api/forums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user?.id, title, body })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to create forum')
      navigate(`/forum/${data.forum.id}`)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout className="min-h-screen pb-20">
      <div className="max-w-3xl mx-auto px-6 py-8 font-blockblueprint">
        <p className="text-sm mb-4"><Link to="/forum" className="underline">← Back to forums</Link></p>
        <h1 className="text-3xl font-bold mb-4">Create New Forum</h1>
        {error && <p className="text-red-600 mb-3">{error}</p>}
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Forum title"
              className="border-2 border-black rounded px-3 py-2 w-full bg-orange-200"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="body">Description</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Describe your topic"
              className="border-2 border-black rounded px-3 py-2 w-full min-h-[140px] bg-orange-200"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="border-2 border-black rounded px-4 py-2 bg-theme-orange text-white disabled:opacity-60"
          >
            {loading ? 'Creating…' : 'Create Forum'}
          </button>
        </form>
      </div>
    </Layout>
  )
}
