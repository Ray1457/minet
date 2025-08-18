import React from 'react'

// Card1: Login-style card with offset shadow panel and a dynamic title bar.
// - className: applied to the outermost container (for width/margins, etc.)
// - title: text in the top tab bar
// - offsetClassName: customize the offset panel (color, radius, etc.)
// - titleClassName: customize the title bar (colors/typography)
// - panelClassName: customize the inner white panel
export default function Card1({
    children,
    className = '',
    title = '',
    offsetClassName = 'bg-dark-orange',
    titleClassName = 'text-xl',
    panelClassName = 'h-full w-full',
}) {
    return (
        <div className={`relative font-blockblueprint ${className}`}>
            {/* Offset shadow panel */}
            <div className={`absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-lg ${offsetClassName} z-0`}></div>

            {/* Main panel */}
            <div className={`relative z-10 bg-white rounded-md border-[3px] border-black shadow-[0_0.375rem_0_rgba(0,0,0,0.06)] overflow-visible ${panelClassName}`}>
                {/* Top title tab */}
                <div className={` bg-gold h-9 ${titleClassName} rounded-t-md border-b-[3px] border-black flex items-center px-4 w-full font-bold tracking-wider text-[#2b1200]`}>
                    {title}
                </div>

                {/* Body (children render here) */}
                <div className="p-5">
                    {children}
                </div>
            </div>
        </div>
    )
}
