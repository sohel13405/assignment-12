import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext(null)

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () =>{
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) =>{
        return updateProfile(auth.currentUser , {
            displayName: name,
            photoURL: photo,
        } )

    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)
            setLoading(false)

            if (currentUser?.email){
                const userData = {email: currentUser.email}
                await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, userData, {
                    withCredentials: true
                })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err =>{
                    console.log(err);
                })
            }
        })

        return () => unsubscribe()

    }, [])

    const authInfo = {
        createUser,
        signIn,
        user,
        loading,
        logOut,
        signInWithGoogle,
        updateUserProfile,
        setUser,
        setLoading
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;