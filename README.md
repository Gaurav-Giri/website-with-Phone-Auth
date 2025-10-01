the config folder will include service_account_key.json obtained from the firebase service accounts.
this file will have contents like this
{
  "type": "service_account",
  "project_id": "project_id",
  "private_key_id": "private_key",
  "private_key": "-----BEGIN PRIVATE KEY-----\some string==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-some string.gserviceaccount.com",
  "client_id": "some integer",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/some string gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
 
and also an env file for backend  . the env file will look like this


MONGO_URI=mongodb://localhost:27017/name
PORT=5000
FIREBASE_SERVICE_ACCOUNT="../Backend/config/service_key.json"


the env file for frontend will be like this
you can find these credentials in the firebase too . do some google search if still not getting these credentials.



VITE_FIREBASE_API_KEY=some string
VITE_FIREBASE_AUTH_DOMAIN=some string.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=some string
VITE_FIREBASE_STORAGE_BUCKET=some string.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=some integer
VITE_FIREBASE_APP_ID=some string
VITE_FIREBASE_MEASUREMENT_ID = some string
const firebaseConfig = {
  apiKey: "some string",
  authDomain: "your project id.firebaseapp.com",
  projectId: "your project id",
  // ✅ storage bucket must be *.appspot.com (not firebasestorage.app)
  storageBucket: "name of your firebase app.appspot.com",
  messagingSenderId: "some integer",
  appId: "1:some integer:web:some string",
  measurementId: "some string "
};

after putting .env in both frontend and backend you will be able to start 
the website by entering the command "npm run dev" in both frontend 
and backend terminals.



