import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export default function ForumDetail() {
  const { user, isAuthenticated } = useAuth()
  const API_BASE = (import.meta?.env?.VITE_API_URL || '').replace(/\/$/, '')
  const { id } = useParams()
  const [forum, setForum] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [content, setContent] = useState("")
  const fmtIST = (d) => {
    try {
      return new Date(d).toLocaleString('en-IN')
    } catch {
      return String(d)
    }
  }

  const fetchForum = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API_BASE}/api/forums/${id}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to load forum')
      setForum(data.forum)
      setComments(data.comments || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchForum() }, [id])

  const addComment = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) return
    try {
      const res = await fetch(`${API_BASE}/api/forums/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user?.id, content })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to add comment')
      setContent("")
      setComments((prev) => [...prev, data.comment])
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <Layout><div className="p-6">Loading…</div></Layout>
  if (error) return <Layout><div className="p-6 text-red-600">{error}</div></Layout>
  if (!forum) return <Layout><div className="p-6">Not found</div></Layout>

  return (
    <Layout className="min-h-screen pb-20">
      <div className="max-w-3xl mx-auto px-6 py-8 font-blockblueprint">
        <p className="text-sm mb-4"><Link className="underline" to="/forum">← Back to forums</Link></p>
  <h1 className="text-3xl font-bold mb-2">{forum.title}</h1>
  <div className="text-sm text-gray-600 mb-4 flex items-center gap-2">
    {forum.author_avatar && (
      <img
        src={`${API_BASE}${forum.author_avatar}`}
        alt={forum.author ? `${forum.author}'s avatar` : 'Author avatar'}
        className="w-7 h-7 rounded-full border-2 border-black object-cover"
        loading="lazy"
      />
    )}
    <span>{forum.author} • {fmtIST(forum.created_at)}</span>
  </div>
        <div className="border-2 border-black rounded p-4 bg-white mb-6 whitespace-pre-wrap">{forum.body}</div>

        <h2 className="text-2xl font-bold mb-2">Comments</h2>
        <ul className="space-y-3 mb-6">
      {comments.map((c) => (
            <li key={c.id} className="border-2 border-black rounded p-3 bg-white">
              <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                {c.author_avatar && (
                  <img
                    src={`${API_BASE}${c.author_avatar}`}
                    alt={c.author ? `${c.author}'s avatar` : 'Author avatar'}
                    className="w-6 h-6 rounded-full border-2 border-black object-cover"
                    loading="lazy"
                  />
                )}
                <span>{c.author} • {fmtIST(c.created_at)}</span>
              </div>
              <p className="whitespace-pre-wrap">{c.content}</p>
            </li>
          ))}
          {comments.length === 0 && <p>No comments yet.</p>}
        </ul>

        {isAuthenticated ? (
          <form onSubmit={addComment} className="space-y-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment…"
              className="border-2 border-black rounded px-3 py-2 w-full min-h-[100px] bg-orange-200 "
              required
            />
            <button type="submit" className="border-2 border-black rounded px-4 py-2 bg-theme-orange text-white">Post comment</button>
          </form>
        ) : (
          <p className="text-sm">You must <Link className="underline" to="/login">sign in</Link> to comment.</p>
        )}
      </div>
    </Layout>
  )
}
