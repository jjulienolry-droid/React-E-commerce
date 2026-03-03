import { User } from "../types/types"
import { API, fetchAuth } from "./api"

export interface UpdateUserPayload {
    firstName?: string
    lastName?: string
    emailAddress?: string
    phone?: string
    name?: string
    email?: string
}

export const userService = {
    async getUser(userId: number): Promise<User> {
        console.log(" [USER SERVICE] Fetching user...", { userId })
        
        const response = await fetchAuth(API.user(userId), { method: "GET" })
        
        if (!response.ok) {
            throw new Error("Impossible de charger le profil utilisateur")
        }

        const user: User = await response.json()
        console.log(" [USER SERVICE] User fetched successfully", { id: user.id })
        
        return user
    },

    async updateUser(userId: number, data: UpdateUserPayload): Promise<User> {
        console.log(" [USER SERVICE] Updating user...", { userId })
        
        const response = await fetchAuth(API.user(userId), {
            method: "PUT",
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData?.message || errorData?.error || "Impossible de mettre à jour le profil")
        }

        const updatedUser: User = await response.json()
        console.log(" [USER SERVICE] User updated successfully", { id: updatedUser.id })
        
        return updatedUser
    },
}
