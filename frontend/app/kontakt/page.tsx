'use client'

import {useState} from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function KontaktPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      category: 'Kontakt',
      website: String(formData.get('website') || '').trim(),
    }

    // Honeypot
    if (payload.website) {
      setStatus('error')
      setErrorMessage('Något gick fel. Försök igen.')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {error?: string} | null
        throw new Error(data?.error || 'Kunde inte skicka meddelandet.')
      }

      setStatus('success')
      form.reset()
      window.scrollTo({top: 0, behavior: 'smooth'})
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Kunde inte skicka meddelandet.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-2xl text-center space-y-6">
          <h1 className="text-3xl font-serif text-stone-900">Tack för ditt meddelande!</h1>
          <p className="text-stone-600">Jag återkommer så snart jag kan.</p>
          <button
            onClick={() => setStatus('idle')}
            className="text-accent font-medium underline underline-offset-4"
          >
            Skicka ett till
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Kontakt</h1>
        <p className="text-stone-600 mb-8">
          Vill du beställa ett konstverk, boka illustration eller bara säga hej? Skriv gärna!
        </p>

        <div className="mb-10 text-stone-600 text-sm space-y-1">
          <p>Magda Korotynska</p>
          <p>Telefonplan Studios, LM Ericssons väg 14, 126 37 Stockholm</p>
          <p>
            <a href="mailto:magda@artmagda.se" className="text-accent hover:text-accent-hover">
              magda@artmagda.se
            </a>
          </p>
          <p>
            <a href="tel:+46733325586" className="text-accent hover:text-accent-hover">
              +46 7333 255 86
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest font-medium text-stone-500">
                Namn
              </label>
              <input
                required
                name="name"
                type="text"
                className="w-full border-b-2 border-stone-200 py-2 focus:border-accent outline-none transition-colors bg-transparent"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest font-medium text-stone-500">
                E-post
              </label>
              <input
                required
                name="email"
                type="email"
                className="w-full border-b-2 border-stone-200 py-2 focus:border-accent outline-none transition-colors bg-transparent"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest font-medium text-stone-500">
              Meddelande
            </label>
            <textarea
              required
              name="message"
              rows={5}
              className="w-full border-2 border-stone-200 p-4 focus:border-accent outline-none transition-colors bg-transparent"
            />
          </div>

          {/* Honeypot */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

          {status === 'error' && (
            <div className="text-sm text-red-600 font-medium">{errorMessage}</div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-3 bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Skickar...' : 'Skicka'}
          </button>
        </form>
      </div>
    </div>
  )
}
