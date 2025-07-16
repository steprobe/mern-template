/* eslint-disable @typescript-eslint/no-var-requires, no-underscore-dangle */
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);

// Initialize Firebase Auth based on environment
const firebaseAuth: admin.auth.Auth = (() => {
  // Skip Firebase initialization during tests
  if (process.env.NODE_ENV === 'test') {
    // Create a mock Firebase auth for testing
    return {
      verifyIdToken: async () => ({ email: 'test@example.com' }),
      getUserByEmail: async (email: string) => ({ uid: 'test-uid', email }),
    } as unknown as admin.auth.Auth;
  }

  // TODO: Env-var
  const serviceAccount = JSON.parse(
    readFileSync(join(dir, './firebase-service-account.json'), 'utf-8')
  );

  const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });

  return getAuth(firebase);
})();

export { firebaseAuth };
