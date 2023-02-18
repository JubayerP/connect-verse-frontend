import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';

export const AUTH_CONTEXT = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider()


    const providerLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUsersProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => unsubscribe();
    },[])

    const authInfo = {user, providerLogin, signIn, signUp, loading, setLoading, updateUsersProfile}
    return (
        <AUTH_CONTEXT.Provider value={authInfo}>
            {children}
        </AUTH_CONTEXT.Provider>
    );
};

export default AuthProvider;