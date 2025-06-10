
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuKHqn3006anzpBrvbUsBvExBx9cm0wDg",
  authDomain: "agos-dd4ed.firebaseapp.com",
  projectId: "agos-dd4ed",
  storageBucket: "agos-dd4ed.firebasestorage.app",
  messagingSenderId: "182412643511",
  appId: "1:182412643511:web:17eb81c4a1901f90801132",
  measurementId: "G-NCHLXJMP3B"
};

// Impede múltiplas inicializações (útil se você chamar esse arquivo em vários lugares)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Inicializa o Firestore
const firestore = getFirestore(app);

export { firestore };
