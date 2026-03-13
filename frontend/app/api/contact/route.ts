import {NextResponse} from 'next/server'
import {Resend} from 'resend'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    const name = (payload?.name || '').trim()
    const email = (payload?.email || '').trim()
    const message = (payload?.message || '').trim()

    // Honeypot
    if (payload?.website) {
      return NextResponse.json({ok: true})
    }

    if (!name || !email || !message) {
      return NextResponse.json({error: 'Fyll i alla fält'}, {status: 400})
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({error: 'Ogiltig e-postadress'}, {status: 400})
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL || 'magda@artmagda.se'
    const from = process.env.CONTACT_FROM_EMAIL || 'noreply@artmagda.se'

    if (!apiKey) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json({error: 'E-post ej konfigurerad'}, {status: 500})
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Kontaktformulär: ${name}`,
      text: `Namn: ${name}\nE-post: ${email}\n\nMeddelande:\n${message}`,
    })

    return NextResponse.json({ok: true})
  } catch (error) {
    console.error('Contact form error', error)
    return NextResponse.json({error: 'Kunde inte skicka'}, {status: 500})
  }
}
