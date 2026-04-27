import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app, db;
try {
  // Only initialize if we have a real config to prevent runtime errors
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY') {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } else {
    console.warn("Firebase not initialized: Missing or placeholder API keys. Operating in mock mode.");
  }
} catch (error) {
  console.warn("Firebase initialization failed:", error);
}

/**
 * Logs the user session progress to Firebase if available.
 * 
 * @param {string} sessionId - The local unique session ID
 * @param {object} userData - The user's collected state (age, state, etc)
 * @returns {Promise<void>}
 */
export const logUserSession = async (sessionId, userData) => {
  if (!db) {
    // Structured mock behavior for development
    console.log("[Mock Firebase] User Session Saved:", { sessionId, userData });
    return;
  }
  
  try {
    await addDoc(collection(db, "sessions"), {
      sessionId,
      ...userData,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Error writing document to Firebase: ", error);
  }
};
