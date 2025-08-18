import React from 'react'


export default function Card4({
  children,
  className = '',
  title = '',
  offsetClassName = 'bg-orange-200',
  chromeClassName = '',
  contentWrapperClassName = '',
  titleClassName = 'text-2xl font-bold mb-4',
  contentClassName = 'p-6',
  showTab = true,
  showChromeBar = true,
}) {
  return (
    <div className={`relative font-blockblueprint ${className}`}>
      {/* Offset shadow panel */}
      <div className={`absolute inset-0 translate-x-2 translate-y-2 rounded-lg ${offsetClassName} z-[-1]`}></div>

      <div className="flex flex-col relative z-10">
        {/* Floating tab with window controls */}
        {showTab && (
          <div className="w-[6%] z-30 mb-[-2px]" style={{ top: '-18px' }} aria-hidden="true">
            <div
              className="bg-theme-orange border-2 border-black h-[22px] box-border flex items-center"
              style={{ padding: 0 }}
              title="window controls"
            >
              <div className="flex items-center justify-center gap-2 w-[48px] h-full px-1">
                <span
                  className="w-[10px] h-[10px] rounded-full"
                  style={{
                    background: '#fff',
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.95)'
                  }}
                ></span>
                <span
                  className="w-[10px] h-[10px] rounded-full"
                  style={{
                    background: '#ff2d2d',
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.95)'
                  }}
                ></span>
                <span
                  className="w-[10px] h-[10px] rounded-full"
                  style={{
                    background: '#fdb563',
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.95)'
                  }}
                ></span>
              </div>
            </div>
          </div>
        )}

        <div className='h-12 flex items-center justify-between px-3 border-b-2 border-black bg-theme-orange border-2 w-full text-3xl font-bold tracking-wide'>
          {title}
        </div>

        {/* Chrome bar */}
        {showChromeBar && (
          <div
            className={`bg-white border-2 border-black border-b-0 border-t-0  w-full h-12 flex items-center gap-3 py-1.5 px-3 box-border whitespace-nowrap ${chromeClassName}`}
            role="banner"
            aria-label="browser chrome"
          >
            {/* Navigation icons */}
            <div className="flex items-center gap-3 flex-shrink-0 ml-[6px]">
              {/* Back chevron */}
              <svg className="w-[14px] h-[14px] stroke-black text-black" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18L9 12l6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* Forward chevron */}
              <svg className="w-[14px] h-[14px] stroke-black text-black" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M10 18L4 12l6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* Home icon */}
              <svg className="w-[14px] h-[14px] stroke-black text-black" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Address bar */}
            <div className="flex-1 min-w-0 flex items-center justify-center">
              <div
                className="w-full max-w-full h-[28px] rounded-full border border-black flex items-center gap-2 px-3 box-border justify-end"
                style={{
                  background: '#f7b771',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)'
                }}
                role="search"
                aria-label="address bar"
              >
                <span className="flex-shrink-0 w-4 h-4 text-sm text-black/90">✕</span>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-4 flex-shrink-0 mr-[6px]">
              {/* Refresh icon */}
              <svg className="w-4 h-4 stroke-black" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-9-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* Three dots menu */}
              <div className="flex flex-col gap-1.5 items-center justify-center pr-1">
                <span className="w-[3px] h-[3px] bg-black rounded-full block"></span>
                <span className="w-[3px] h-[3px] bg-black rounded-full block"></span>
                <span className="w-[3px] h-[3px] bg-black rounded-full block"></span>
              </div>
            </div>
          </div>
        )}

        {/* Content panel */}
        <div className={`mt-[-4px] bg-white rounded-md rounded-t-none border-2 border-t-0 border-black overflow-hidden ${contentWrapperClassName}`}>
          <div className={`${contentClassName}`}>
            {title ? <h1 className={titleClassName}>{title}</h1> : null}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
