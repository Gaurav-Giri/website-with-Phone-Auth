import { useState, useEffect } from 'react'
import { auth } from './firebase/config'
import { setUpRecaptcha } from './firebase/config'
import { verifyToken } from './services/api'
import { PhoneNumberForm } from './components/PhoneNumberForm'
import { OtpForm } from './components/OTPForm'
import { UserDetailsForm } from './components/UserDetailsForm'
import { WelcomePage } from './components/WelcomePage'

export const App = () => {
  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    window.recaptchaVerifier = setUpRecaptcha()
  }, [])

  const handlePhoneSuccess = (phoneNumber, confirmationResult) => {
    setPhone(phoneNumber)
    setConfirmation(confirmationResult)
    setStep('otp')
  }

  const handleOtpSuccess = async (idToken) => {
    try {
      const { data } = await verifyToken(idToken, phone)
      
      if (data.user) {
        setUser(data.user)
        setStep('welcome')
      } else {
        setStep('details')
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      setStep('phone')
    }
  }

  const handleRegistrationSuccess = (userData) => {
    setUser(userData)
    setStep('welcome')
  }

  return (
    <div className="app-container">
      {step === 'phone' && <PhoneNumberForm onSuccess={handlePhoneSuccess} />}
      {step === 'otp' && (
        <OtpForm 
          phone={phone} 
          confirmation={confirmation} 
          onSuccess={handleOtpSuccess} 
        />
      )}
      {step === 'details' && (
        <UserDetailsForm 
          phone={phone} 
          onSuccess={handleRegistrationSuccess} 
        />
      )}
      {step === 'welcome' && <WelcomePage user={user} />}
    </div>
  )
}