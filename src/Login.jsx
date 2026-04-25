import React from 'react'

function Login() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0e0e0d',
      padding: '2rem',
    }}>
      <div style={{
          backgroundColor: '#2c2a2a',
          padding: '2.5rem 2rem',
          borderRadius: '16px',
          border: '0.5px solid rgba(0,0,0,0.12)',
          width: '100%',
          maxWidth: '380px',
          boxSizing: 'border-box',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#185FA5',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="3" rx="1.5" fill="white"/>
              <rect x="3" y="11" width="12" height="3" rx="1.5" fill="white"/>
              <rect x="3" y="16" width="15" height="3" rx="1.5" fill="white"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '18px', fontWeight: 500, margin: 0, color: '#111' }}>
            Job Task Tracker
          </h1>
        </div>

        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 2rem', lineHeight: 1.5 }}>
          Never miss an interview or coding test again.
        </p>

        <hr style={{ border: 'none', borderTop: '0.5px solid rgba(0,0,0,0.1)', marginBottom: '1.5rem' }} />

        {/* Google Sign-In Button */}
        <a
          href="https://job-prep-tracker-backend.onrender.com/oauth2/authorization/google"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            padding: '0.65rem 1rem',
            backgroundColor: '#ffffff',
            border: '0.5px solid rgba(0,0,0,0.25)',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#111',
            textDecoration: 'none',
            cursor: 'pointer',
            boxSizing: 'border-box',
          }}
        >  
          Sign in with Google
        </a>
        

        {/* Footer */}
        <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', margin: '1.25rem 0 0', lineHeight: 1.6 }}>
          By signing in, you agree to our{' '}
          <span style={{ color: '#6b7280', textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</span>
          {' '}and{' '}
          <span style={{ color: '#6b7280', textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>.
        </p>

      </div>
    </div>
  )
}

export default Login