export default function CheckEmailPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
      }}
    >
      <div style={{ maxWidth: '400px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>
          Check your email
        </h1>
        <p style={{ fontSize: '15px', color: '#666' }}>
          We sent you a confirmation link. Click it to activate your account, then come back and log in.
        </p>
      </div>
    </div>
  )
}