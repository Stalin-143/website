import { initializeApp, getApps } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyB0srpcLeNF8nR6DF_fP7_FsemKY4--4wU",
  authDomain: "nexulen-f8790.firebaseapp.com",
  projectId: "nexulen-f8790",
  storageBucket: "nexulen-f8790.firebasestorage.app",
  messagingSenderId: "718749886008",
  appId: "1:718749886008:web:df0563c31aaff0c2e628cd",
}

// Initialize Firebase App once. This instance can be safely imported.
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export default app // Export the app instance
