import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Button } from '../components/ui/button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleEmailPasswordAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Logged in successfully!');
        router.push('/');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          createdAt: new Date(),
        });
        toast.success('Account created successfully!');
        router.push('/');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email is already in use. Please try logging in instead.');
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      console.log("Starting Google Sign In process");
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
      } else {
        console.log("User document already exists in Firestore");
      }

      toast.success('Signed in with Google successfully!');
      console.log("Redirecting to home page");
      router.push('/');
    } catch (error) {
      console.error('Error during Google Sign In:', error);
      toast.error(`Sign in error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleEmailPasswordAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <Button type="submit" className="w-full mb-4">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <Button onClick={handleGoogleSignIn} className="w-full mb-4">
          Sign in with Google
        </Button>
        <p className="text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}