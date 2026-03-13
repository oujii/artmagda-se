'use client'

import Link from 'next/link'
import {useEffect, useState} from 'react'
import {usePathname} from 'next/navigation'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navItems = [
    {href: '/portfolio', label: 'Portfolio'},
    {href: '/butik', label: 'Butik'},
    {href: '/om-magda', label: 'Om Magda'},
    {href: '/kontakt', label: 'Kontakt'},
  ]

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl tracking-wide text-stone-900 font-serif font-bold hover:text-accent transition-colors"
          >
            Magda Korotynska
          </Link>

          {/* Desktop */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-stone-600 text-sm tracking-wide">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`hover:text-accent transition-colors ${
                      pathname?.startsWith(item.href) ? 'text-accent' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="relative z-[60] md:hidden text-stone-900"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Stäng meny' : 'Öppna meny'}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden absolute left-0 right-0 top-full border-t border-stone-100 bg-white/95 backdrop-blur-md transition-all duration-200 ${
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : '-translate-y-2 opacity-0 pointer-events-none'
          }`}
        >
          <nav className="container mx-auto px-6 py-4">
            <ul className="flex flex-col gap-1 text-stone-700 text-sm tracking-wide">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-3 hover:text-accent transition-colors ${
                      pathname?.startsWith(item.href) ? 'text-accent' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <button
        type="button"
        aria-label="Stäng meny"
        className={`md:hidden fixed inset-0 top-20 z-40 bg-black/20 transition-opacity duration-200 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
