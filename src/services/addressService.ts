import { API, fetchAuth } from "./api"

export interface MailingAddress {
    id?: number
    address: string
    label: "home" | "work"
    city?: string
    zipCode?: string
    country?: string
}

export const addressService = {
    async getMailingAddresses(userId: number): Promise<MailingAddress[]> {
        console.log(" [ADDRESS SERVICE] Fetching mailing addresses...", { userId })
        
        const response = await fetchAuth(API.mailAddresses(userId), { method: "GET" })
        
        if (response.status === 404) {
            console.log(" [ADDRESS SERVICE] No addresses found")
            return []
        }

        if (!response.ok) {
            throw new Error("Impossible de charger les adresses de livraison")
        }

        const addresses: MailingAddress[] = await response.json()
        console.log(" [ADDRESS SERVICE] Addresses fetched successfully", { count: addresses.length })
        
        return addresses
    },

    async createMailingAddress(userId: number, address: MailingAddress): Promise<MailingAddress> {
        console.log(" [ADDRESS SERVICE] Creating mailing address...", { userId })
        
        const response = await fetchAuth(API.mailAddresses(userId), {
            method: "POST",
            body: JSON.stringify(address),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData?.message || errorData?.error || "Impossible de créer l'adresse")
        }

        const createdAddress: MailingAddress = await response.json()
        console.log(" [ADDRESS SERVICE] Address created successfully", { id: createdAddress.id })
        
        return createdAddress
    },

    async updateMailingAddress(userId: number, addressId: number, address: MailingAddress): Promise<MailingAddress> {
        console.log(" [ADDRESS SERVICE] Updating mailing address...", { userId, addressId })
        
        const response = await fetchAuth(API.mailAddress(userId, addressId), {
            method: "PUT",
            body: JSON.stringify(address),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData?.message || errorData?.error || "Impossible de mettre à jour l'adresse")
        }

        const updatedAddress: MailingAddress = await response.json()
        console.log(" [ADDRESS SERVICE] Address updated successfully", { id: updatedAddress.id })
        
        return updatedAddress
    },

    async deleteMailingAddress(userId: number, addressId: number): Promise<void> {
        console.log(" [ADDRESS SERVICE] Deleting mailing address...", { userId, addressId })
        
        const response = await fetchAuth(API.mailAddress(userId, addressId), {
            method: "DELETE",
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData?.message || errorData?.error || "Impossible de supprimer l'adresse")
        }

        console.log(" [ADDRESS SERVICE] Address deleted successfully")
    },
}
