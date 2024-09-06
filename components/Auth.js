import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { Button } from './ui/button';
import { useRouter } from 'next/router';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export function Auth() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleAuth = async () => {
    if (user) {
      try {
        await signOut(auth);
        toast.success('Logged out successfully');
      } catch (error) {
        console.error('Error signing out', error);
        toast.error('Error signing out');
      }
    } else {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Google Sign In successful", result.user);

        const userRef = doc(db, 'users', result.user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          console.log("Creating new user document in Firestore");
          await setDoc(userRef, {
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            createdAt: new Date(),
          });
        }

        toast.success('Signed in with Google successfully!');
        router.push('/');
      } catch (error) {
        console.error('Error during Google Sign In:', error);
        toast.error(`Sign in error: ${error.message}`);
      }
    }
  };

  return (
    <Button onClick={handleAuth} variant="ghost">
      {user ? 'Log Out' : 'Login/Sign Up'}
    </Button>
  );
}