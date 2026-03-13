import {ImageResponse} from 'next/og'

export const alt = 'Magda Korotynska — Illustratör & Konstnär'
export const size = {width: 1200, height: 630}
export const contentType = 'image/png'

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff8f6',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: '#212529',
            marginBottom: '16px',
          }}
        >
          Magda Korotynska
        </div>
        <div
          style={{
            fontSize: '28px',
            fontWeight: 300,
            color: '#f36421',
            letterSpacing: '0.1em',
          }}
        >
          Illustratör & Konstnär
        </div>
      </div>
    ),
    {...size},
  )
}
