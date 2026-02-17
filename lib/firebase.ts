
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Nota: Estas credenciales deben ser reemplazadas por las de tu proyecto en Firebase Console
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "focusia-app.firebaseapp.com",
  projectId: "focusia-app",
  storageBucket: "focusia-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
