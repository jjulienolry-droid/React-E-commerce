

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080"

export const API = {
    signUp: `${API_BASE}/api/users/signup`,
    signIn: `${API_BASE}/api/users/signin`,

    users: `${API_BASE}/api/users`,
    user: (id: number) => `${API_BASE}/api/users/${id}`,
    userRoles: (id: number) => `${API_BASE}/api/users/${id}/roles`,
    assignRole: (userId: number, roleId: number) => `${API_BASE}/api/users/${userId}/roles/${roleId}`,

    products: `${API_BASE}/api/products`,
    product: (id: number) => `${API_BASE}/api/products/${id}`,

    categories: `${API_BASE}/api/categories`,
    category: (id: number) => `${API_BASE}/api/categories/${id}`,
    categoryProducts: (id: number) => `${API_BASE}/api/categories/${id}/products`,

    cart: (userId: number) => `${API_BASE}/api/carts/user/${userId}`,
    cartCount: (userId: number) => `${API_BASE}/api/carts/user/${userId}/count`,
    cartProduct: (cartId: number, productId: number) => `${API_BASE}/api/carts/${cartId}/products/${productId}`,

    mailAddresses: (userId: number) => `${API_BASE}/api/users/${userId}/mailAddress`,
    mailAddress: (userId: number, addressId: number) => `${API_BASE}/api/users/${userId}/mailAddress/${addressId}`,

    paymentMethods: (userId: number) => `${API_BASE}/api/users/${userId}/payment_methods`,
    paymentMethod: (userId: number, method: string) => `${API_BASE}/api/users/${userId}/payment_methods/${method}`,

    phones: (userId: number) => `${API_BASE}/api/users/${userId}/phones`,
    phone: (userId: number, phoneId: number) => `${API_BASE}/api/users/${userId}/phones/${phoneId}`,

    roles: `${API_BASE}/api/roles`,
    role: (id: number) => `${API_BASE}/api/roles/${id}`,
    roleUsers: (id: number) => `${API_BASE}/api/roles/${id}/users`,

    adminCarts: `${API_BASE}/api/admin/carts`,
    adminMailAddresses: `${API_BASE}/api/admin/mailAddress`,
    adminPhones: `${API_BASE}/api/admin/phones`,
    adminPaymentMethods: `${API_BASE}/api/admin/payment_methods`,
} as const

export const fetchAuth = async (url: string, options: RequestInit = {}): Promise<Response> =>
{
    const token = localStorage.getItem("token")
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    return fetch(url, { ...options, headers })
}
