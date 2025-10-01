import { useState } from 'react'

export const OtpForm = ({ phone, confirmation, onSuccess }) => {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await confirmation.confirm(otp)
      const idToken = await result.user.getIdToken()
      onSuccess(idToken)
    } catch (err) {
      setError('Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <h2>Verify OTP</h2>
      <p>Enter the OTP sent to {phone}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}