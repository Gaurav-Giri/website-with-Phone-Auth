import { useState } from 'react'
import { auth } from '../firebase/config'
import { signInWithPhoneNumber } from 'firebase/auth'

export const PhoneNumberForm = ({ onSuccess }) => {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formattedPhone = `+${phone.replace(/\D/g, '')}`
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      )
      onSuccess(formattedPhone, confirmation)
    } catch (err) {
      setError(err.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <h2>Enter Your Phone Number</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number with country code"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <div id="recaptcha-container"></div>
    </div>
  )
}