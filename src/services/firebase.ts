import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc, setDoc, Firestore } from 'firebase/firestore';
import { UserSessionData, ChatMessage } from '../types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app: FirebaseApp | undefined;
let db: Firestore | undefined;

try {
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
 */
export const logUserSession = async (sessionId: string, userData: UserSessionData, messages: ChatMessage[]): Promise<void> => {
  if (!db) {
    console.log("[Mock Firebase] User Session Saved:", { sessionId, userData, messageCount: messages.length });
    return;
  }
  
  try {
    // We use setDoc with merge to overwrite the specific session document continually
    await setDoc(doc(db, "sessions", sessionId), {
      sessionId,
      ...userData,
      messages,
      lastUpdated: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error("Error writing document to Firebase: ", error);
  }
};

/**
 * Fetches an existing session from Firebase
 */
export const getExistingSession = async (sessionId: string): Promise<{ userData: UserSessionData, messages: ChatMessage[] } | null> => {
  if (!db) return null;

  try {
    const sessionDoc = await getDoc(doc(db, "sessions", sessionId));
    if (sessionDoc.exists()) {
      const data = sessionDoc.data();
      return {
        userData: data as UserSessionData,
        messages: data.messages as ChatMessage[]
      };
    }
  } catch (error) {
    console.error("Error reading document from Firebase: ", error);
  }
  return null;
};
