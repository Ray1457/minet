import bgPattern from '../assets/imgs/bg_pattern.png'

export default function Layout({ children, className = '' }) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      <div className="relative z-10">{children}</div>
      <img
        src={bgPattern}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 bottom-0 w-full z-[-10]"
      />
    </div>
  )
}
