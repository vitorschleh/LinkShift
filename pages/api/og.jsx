/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '-.02em',
          fontWeight: 700,
          backgroundImage:
            'radial-gradient(circle at top, rgba(197,155,106,0.35), transparent 35%), linear-gradient(to bottom, #fbf6ee, #f3ecdf)',
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 20,
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(214,190,164,0.82) 100%)',
              border: '1px solid rgba(255,255,255,0.72)',
              boxShadow: '0 18px 40px rgba(23,20,17,0.14)',
            }}
          />
          <span
            style={{
              marginLeft: 8,
              fontSize: 20,
              color: '#171411',
            }}
          >
            LinkShift
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '20px 50px',
            margin: '0 42px',
            fontSize: 40,
            width: 'auto',
            maxWidth: 550,
            textAlign: 'center',
            color: '#171411',
            lineHeight: 1.4,
          }}
        >
          <span>A quiet luxury link in bio studio for elegant mobile pages.</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
