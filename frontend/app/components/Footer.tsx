import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'

export default async function Footer() {
  const {data: settings} = await sanityFetch({query: settingsQuery, stega: false})

  const contactInfo = settings?.contactInfo
  const social = settings?.socialMedia

  return (
    <footer className="bg-stone-900 text-white/80 py-12 md:py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Col 1: Brand */}
        <div>
          <p className="text-white font-serif font-bold text-lg mb-3">Magda Korotynska</p>
          <p className="text-sm leading-relaxed max-w-xs mb-4">
            {settings?.footerText || 'Illustratör & konstnär, Stockholm'}
          </p>
          <div className="flex gap-3">
            {social?.instagram && (
              <a
                href={social.instagram}
                aria-label="Instagram"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 16 16" className="w-4 h-4 text-white" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                </svg>
              </a>
            )}
            {social?.facebook && (
              <a
                href={social.facebook}
                aria-label="Facebook"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor" aria-hidden="true">
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.41c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Col 2: Links */}
        <div>
          <h4 className="text-white font-medium text-sm mb-4 tracking-wide">Sidor</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
            <li><Link href="/butik" className="hover:text-white transition-colors">Butik</Link></li>
            <li><Link href="/om-magda" className="hover:text-white transition-colors">Om Magda</Link></li>
            <li><Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>
          </ul>
        </div>

        {/* Col 3: Contact */}
        <div>
          <h4 className="text-white font-medium text-sm mb-4 tracking-wide">Kontakt</h4>
          <ul className="space-y-2 text-sm">
            {contactInfo?.email && <li><a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">{contactInfo.email}</a></li>}
            {contactInfo?.phone && <li><a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{contactInfo.phone}</a></li>}
            {contactInfo?.address && <li>{contactInfo.address}</li>}
          </ul>
          <p className="pt-6 text-xs text-white/40">
            &copy; {new Date().getFullYear()} Magda Korotynska
          </p>
        </div>
      </div>
    </footer>
  )
}
