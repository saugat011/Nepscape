"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Something went wrong!</h2>
      <pre style={{ color: 'red', margin: '20px 0' }}>{error.message}</pre>
      <button onClick={reset} style={{ padding: '8px 24px', borderRadius: 4, background: '#2563eb', color: 'white', border: 'none' }}>
        Try again
      </button>
    </div>
  );
}
