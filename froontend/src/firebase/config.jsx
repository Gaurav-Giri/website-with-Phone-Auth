import { initializeApp } from 'firebase/app'
import { getAuth, RecaptchaVerifier } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBPxzn5od9mi_xWk8P3XiBlmjJASt47AEw",
  authDomain: "school-lunch-booking.firebaseapp.com",
  projectId: "school-lunch-booking",
  storageBucket: "school-lunch-booking.firebasestorage.app",
  messagingSenderId: "164274419208",
  appId: "1:164274419208:web:e9e03e07b9d04ed4c1c3bd",
  measurementId: "G-KYNG5S44S9"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const setUpRecaptcha = (phoneNumber) => {
    const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        { size: 'invisible' }
        
    );
    return recaptchaVerifier;
}