import { User } from "../types/types"
import { API, fetchAuth } from "./api"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080"

export interface SignInCredentials {
    emailAddress: string
    password: string
}

export interface SignUpCredentials {
    firstName: string
    lastName: string
    emailAddress: string
    password: string
}

export interface AuthResponse {
    token: string
    user: User
}

export const authService = {
    async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
        console.log(" [AUTH SERVICE] Attempting sign in...", { email: credentials.emailAddress })
        
        const response = await fetch(`${API_BASE}/api/users/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        })

        console.log(" [AUTH SERVICE] Response received", { status: response.status, ok: response.ok })

        if (!response.ok) {
            const errorData = await response.json()
            console.error(" [AUTH SERVICE] Sign in failed", errorData)
            throw new Error(errorData.message || "Identifiants incorrects")
        }

        const data: AuthResponse = await response.json()
        console.log(" [AUTH SERVICE] Sign in successful", { user: data.user?.emailAddress, hasToken: !!data.token })
        
        return data
    },

    async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
        console.log(" [AUTH SERVICE] Attempting sign up...", { 
            firstName: credentials.firstName, 
            lastName: credentials.lastName, 
            email: credentials.emailAddress 
        })
        
        const response = await fetch(`${API_BASE}/api/users/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        })

        console.log(" [AUTH SERVICE] Response received", { status: response.status, ok: response.ok })

        if (!response.ok) {
            const errorData = await response.json()
            console.error(" [AUTH SERVICE] Sign up failed", errorData)
            throw new Error(errorData.message || "Erreur lors de l'inscription")
        }

        const data: AuthResponse = await response.json()
        console.log(" [AUTH SERVICE] Sign up successful", { user: data.user?.emailAddress, hasToken: !!data.token })
        
        return data
    },

    async syncUserFromDb(userId: number, token: string): Promise<User> {
        console.log(" [AUTH SERVICE] Syncing user from database...", { userId })
        
        const response = await fetchAuth(`${API_BASE}/api/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error("Impossible de récupérer l'utilisateur")
        }

        const dbUser: User = await response.json()
        console.log(" [AUTH SERVICE] User synced successfully", { id: dbUser.id })
        
        return dbUser
    },
}
