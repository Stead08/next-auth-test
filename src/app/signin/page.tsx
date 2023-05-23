'use client';

import {useState} from 'react';
import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/firebase/client";
import {signIn as signInByNextAuth} from "next-auth/react";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    if (!email || !password) return;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      await signInByNextAuth('credentials', {idToken, callbackUrl: '/'});
    } catch (e) {
      console.error(e);
    }
  };

  return (
      <form onSubmit={(e) => {
        e.preventDefault();
        signIn()}}>
        <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email"
        />
        <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
        />
        <button type="submit">ログイン</button>
      </form>
  )
}

export default SignIn;