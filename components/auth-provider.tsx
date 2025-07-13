"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useRef } from "react"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAuth,
  type Auth,
  type UserCredential,
} from "firebase/auth"
import firebaseApp from "@/lib/firebase"

interface UserData {
  uid: string
  email: string | null
  emailVerified: boolean
  displayName: string | null
  photoURL: string | null
  metadata: {
    creationTime: string | null
    lastSignInTime: string | null
  }
}

interface AuthContextType {
  user: UserData | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<UserCredential>
  sendVerificationEmail: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const authRef = useRef<Auth | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false)
      return
    }

    if (!authRef.current) {
      try {
        authRef.current = getAuth(firebaseApp)
      } catch (error) {
        console.error("Failed to get Firebase Auth instance:", error)
        setLoading(false)
        return
      }
    }

    const auth = authRef.current
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          emailVerified: firebaseUser.emailVerified,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          metadata: {
            creationTime: firebaseUser.metadata.creationTime,
            lastSignInTime: firebaseUser.metadata.lastSignInTime,
          },
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const getAuthInstance = (): Auth => {
    if (!authRef.current) {
      console.warn("Firebase Auth instance not available. Attempting to re-initialize.")
      authRef.current = getAuth(firebaseApp)
    }
    return authRef.current!
  }

  const signIn = async (email: string, password: string) => {
    const auth = getAuthInstance()
    await signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    const auth = getAuthInstance()
    await signOut(auth)
  }

  const resetPassword = async (email: string) => {
    const auth = getAuthInstance()
    await sendPasswordResetEmail(auth, email)
  }

  const signUp = async (email: string, password: string): Promise<UserCredential> => {
    const auth = getAuthInstance()
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    if (userCredential.user) {
      await sendEmailVerification(userCredential.user)
    }
    return userCredential
  }

  const sendVerificationEmail = async () => {
    const auth = getAuthInstance()
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser)
    } else {
      throw new Error("No user is currently logged in to send verification email.")
    }
  }

  const value = {
    user,
    loading,
    signIn,
    logout,
    resetPassword,
    signUp,
    sendVerificationEmail,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
