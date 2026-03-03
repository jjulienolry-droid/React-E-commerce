import { createContext, useContext, useState, useCallback } from "react"
import { User } from "../types/types"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080"

interface AuthContextType {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
{
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
    const [loading, setLoading] = useState(false)

    const isAuthenticated = !!token && !!user

    const login = useCallback(async (email: string, password: string) =>
    {
        setLoading(true)
        try
        {
            const response = await fetch(`${API_BASE}/api/users/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailAddress: email, password }),
            })

            if (!response.ok)
            {
                const errorData = await response.json()
                throw new Error(errorData.message || "Identifiants incorrects")
            }

            const data = await response.json()
            setToken(data.token)
            setUser(data.user)
            localStorage.setItem("token", data.token)
        }
        finally
        {
            setLoading(false)
        }
    }, [])

    const register = useCallback(async (firstName: string, lastName: string, email: string, password: string) =>
    {
        setLoading(true)
        try
        {
            const response = await fetch(`${API_BASE}/api/users/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, emailAddress: email, password }),
            })

            if (!response.ok)
            {
                const errorData = await response.json()
                throw new Error(errorData.message || "Erreur lors de l'inscription")
            }

            const data = await response.json()
            setToken(data.token)
            setUser(data.user)
            localStorage.setItem("token", data.token)
        }
        finally
        {
            setLoading(false)
        }
    }, [])

    const logout = useCallback(() =>
    {
        setUser(null)
        setToken(null)
        localStorage.removeItem("token")
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType =>
{
    const context = useContext(AuthContext)
    if (!context)
    {
        throw new Error("useAuth doit être utilisé dans un AuthProvider")
    }
    return context
}
