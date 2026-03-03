import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { User } from "../types/types"
import { authService } from "../services/authService"

interface AuthContextType {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const parseTokenUser = (jwtToken: string): User | null =>
{
    try
    {
        const payload = jwtToken.split(".")[1]
        if (!payload) return null
        const normalized = payload.replace(/-/g, "+").replace(/_/g, "/")
        const decoded = JSON.parse(window.atob(normalized))
        return decoded as User
    }
    catch
    {
        return null
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
{
    const initialToken = localStorage.getItem("token")
    const [token, setToken] = useState<string | null>(initialToken)
    const [user, setUser] = useState<User | null>(initialToken ? parseTokenUser(initialToken) : null)
    const [loading, setLoading] = useState(false)

    const isAuthenticated = !!token && !!user

    const login = useCallback(async (email: string, password: string) =>
    {
        console.log(" [AUTH] Tentative de connexion...", { email })
        setLoading(true)
        try
        {
            const data = await authService.signIn({ emailAddress: email, password })
            console.log(" [AUTH] Connexion réussie", { user: data.user?.emailAddress, hasToken: !!data.token })
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
        console.log(" [AUTH] Tentative d'inscription...", { firstName, lastName, email })
        setLoading(true)
        try
        {
            const data = await authService.signUp({ firstName, lastName, emailAddress: email, password })
            console.log(" [AUTH] Inscription réussie", { user: data.user?.emailAddress, hasToken: !!data.token })
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
        console.log(" [AUTH] Déconnexion...")
        setUser(null)
        setToken(null)
        localStorage.removeItem("token")
        console.log(" [AUTH] Déconnexion réussie")
    }, [])

    useEffect(() =>
    {
        const syncUserFromDb = async () =>
        {
            if (!token)
            {
                setUser(null)
                return
            }

            const tokenUser = parseTokenUser(token)
            if (!tokenUser?.id)
            {
                logout()
                return
            }

            try
            {
                const dbUser = await authService.syncUserFromDb(tokenUser.id, token)
                setUser(dbUser)
            }
            catch
            {
                logout()
            }
        }

        syncUserFromDb()
    }, [token, logout])

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
