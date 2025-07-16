// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  User,
} from 'firebase/auth';

const firebaseConfig = {
  // add your Firebase project configuration here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function createUser(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

async function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

async function logout() {
  return signOut(auth);
}

async function sendConfirmationEmail() {
  const user = getCurrentUser();
  if (user) {
    return sendEmailVerification(user);
  }
}

function getCurrentUser(): User | null {
  return auth.currentUser;
}

function isLoggedIn(): boolean {
  return getCurrentUser()?.emailVerified === true;
}

export {
  createUser,
  login,
  logout,
  sendConfirmationEmail,
  getCurrentUser,
  isLoggedIn,
};
