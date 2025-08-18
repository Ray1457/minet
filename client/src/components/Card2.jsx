import React from 'react'

// Card2: Window-style card with a top bar (three dots) and optional title.
// Similar structure to Card1: root className, dynamic title, and children body.
// Props:
// - className: applied to the outer container
// - title: optional heading rendered above children in the body
// - panelClassName: extra classes for the main bordered panel
// - topBarClassName: classes for the top bar background (default theme-orange)
// - topBarShadowClassName: classes for the top bar bottom shadow
// - titleClassName: classes for the title element
// - contentClassName: classes for the body wrapper (padding, etc.)
// - showControls: whether to show the three round controls in the top bar
export default function Card2({
  children,
  className = '',
  title = '',
  offsetClassName = 'bg-orange-200',
  panelClassName = '',
  topBarClassName = 'bg-theme-orange',
  topBarShadowClassName = 'shadow-[0_3px_0_0_#D96F32]',
  titleClassName = 'text-lg font-bold mt-4',
  contentClassName = 'p-4',
  showControls = true,
}) {
  return (
    <div className={`relative font-blockblueprint ${className}`}>
      {/* Offset shadow panel */}
      <div className={`absolute inset-0 translate-x-2 translate-y-2 rounded-lg ${offsetClassName} z-[-1]`}></div>

      {/* Main panel */}
      <div className={`relative z-10 w-full border border-black rounded-md bg-white ${panelClassName}`}>
        {/* Top Bar */}
        <div className={`flex items-center space-x-2 px-2 py-1 rounded-t-md ${topBarClassName} ${topBarShadowClassName}`}>
          {showControls && (
            <>
              <div className="w-3 h-3 bg-[#f9f1e8] border border-black rounded-full"></div>
              <div className="w-3 h-3 bg-[#ff1b19] border border-black rounded-full"></div>
              <div className="w-3 h-3 bg-[#fdb563] border border-black rounded-full"></div>
            </>
          )}
        </div>

        {/* Content */}
        <div className={`${contentClassName}`}>
          {title ? <h2 className={titleClassName}>{title}</h2> : null}
          {children}
        </div>
      </div>
    </div>
  )
}
