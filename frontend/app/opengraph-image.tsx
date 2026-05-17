import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'HighStreetExpress — 10-Minute Food Delivery UK'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    <div style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '60px',
      position: 'relative',
    }}>
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
        background: 'linear-gradient(90deg, #e63946, #ff6b6b, #e63946)',
      }} />
      {/* Brand name */}
      <div style={{
        color: '#ffffff',
        fontSize: 72,
        fontWeight: 900,
        letterSpacing: '-2px',
        marginBottom: '16px',
        textShadow: '0 2px 20px rgba(230,57,70,0.4)',
      }}>
        HighStreetExpress
      </div>
      {/* Tagline */}
      <div style={{
        color: '#e63946',
        fontSize: 28,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '8px',
        fontWeight: 700,
      }}>
        10-Minute Food Delivery
      </div>
      {/* Sub-line */}
      <div style={{
        color: '#aaaaaa',
        fontSize: 20,
        marginTop: '12px',
      }}>
        Fresh Food · Fast Delivery · Free above £20
      </div>
      {/* Bottom accent bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px',
        background: 'linear-gradient(90deg, #e63946, #ff6b6b, #e63946)',
      }} />
    </div>,
    size
  )
}
