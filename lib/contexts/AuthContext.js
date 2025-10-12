'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const signIn = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);

            // Get the ID token and send it to the server to set as cookie
            const idToken = await result.user.getIdToken();

            // Call API route to set the cookie
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to set session cookie. Status:', response.status);
                console.error('Error response:', errorText);
                return { success: false, error: 'Failed to establish session: ' + errorText };
            }

            console.log('Session cookie set successfully');
            // Note: setUser will be called by onAuthStateChanged listener
            return { success: true, user: result.user };
        } catch (error) {
            let errorMessage = 'Login failed';
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'No user found with this email';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Invalid password';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many attempts. Please try again later';
                    break;
                case 'auth/invalid-credential':
                    errorMessage = 'Invalid email or password';
                    break;
                default:
                    errorMessage = error.message;
            }

            return { success: false, error: errorMessage };
        }
    };

    const signOut = async () => {
        try {
            // Call API route to clear the cookie
            await fetch('/api/auth/logout', {
                method: 'POST',
            });

            await firebaseSignOut(auth);
            // Note: setUser will be called by onAuthStateChanged listener
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        loading,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

