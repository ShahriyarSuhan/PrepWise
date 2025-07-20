"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { use } from "react";
import { ca } from "zod/v4/locales";

export async function singUp(params: SignUpParams){
    const { uid, name, email, } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get()

        if (userRecord.exists) {
            return {
                success: false,
                message: "User already exists."
            };
        }

        await db.collection('users').doc(uid).set({
            name, email
        });

        return {
            success: true, 
            message: "User created successfully."
        };
    } catch (e: unknown) {
    console.error("Error signing up:", e);

    if (typeof e === "object" && e !== null && "code" in e) {
        const error = e as { code: string };
        
        if (error.code === "auth/email-already-in-use") {
            return {
                success: false,
                message: "Email already in use. Please try another email."
            };
        }
    }

    return {
        success: false,
        message: "An error occurred while signing up. Please try again later."
    };
}

};

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;
   
    try{
        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return {
                success: false,
                message: "User not found. Please sign up first."
            };
        }
        await setSessionCookie(idToken);
    } catch (e: unknown){
        console.error("Error signing in:", e);
        return {
            success: false,
            message: "An error occurred while signing in. Please try again later."
        };
    }
}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies()
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: 60 * 60 * 24 * 7 * 1000 }); // 7 days

    cookieStore.set('session', sessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if (!userRecord.exists) {
            return null;
        }

        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;

    } catch (e: unknown) {
        console.error("Error getting current user:", e);
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}