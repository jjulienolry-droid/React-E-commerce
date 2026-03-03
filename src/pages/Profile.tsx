import React, { useEffect, useMemo, useState } from "react"
import { Container, Heading, VStack, Box, Text, Button, Card, SimpleGrid, Input, HStack } from "@chakra-ui/react"
import { useAuth } from "../context/AuthContext"
import { User } from "../types/types"
import { userService } from "../services/userService"
import { addressService, MailingAddress } from "../services/addressService"

export const Profile: React.FC = () =>
{
    const { user, token, logout } = useAuth()
    const [profileUser, setProfileUser] = useState<User | null>(user)
    const [loadingProfile, setLoadingProfile] = useState(false)
    const [savingProfile, setSavingProfile] = useState(false)
    const [savingAddress, setSavingAddress] = useState(false)
    const [profileError, setProfileError] = useState<string | null>(null)
    const [addressError, setAddressError] = useState<string | null>(null)
    const [profileSuccess, setProfileSuccess] = useState<string | null>(null)
    const [addressSuccess, setAddressSuccess] = useState<string | null>(null)
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [isEditingAddress, setIsEditingAddress] = useState(false)
    const [mailingAddress, setMailingAddress] = useState<MailingAddress | null>(null)

    const [profileForm, setProfileForm] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
    })

    const [addressForm, setAddressForm] = useState<MailingAddress>({
        address: "",
        label: "home",
    })

    useEffect(() =>
    {
        setProfileUser(user)
    }, [user])

    useEffect(() =>
    {
        setProfileForm({
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            emailAddress: user?.emailAddress ?? user?.email ?? "",
        })
    }, [user])

    useEffect(() =>
    {
        const loadProfile = async () =>
        {
            if (!token || !user?.id) return

            setLoadingProfile(true)
            try
            {
                const dbUser = await userService.getUser(user.id)
                setProfileUser(dbUser)
                setProfileForm({
                    firstName: dbUser.firstName ?? "",
                    lastName: dbUser.lastName ?? "",
                    emailAddress: dbUser.emailAddress ?? dbUser.email ?? "",
                })
            }
            catch
            {
                logout()
            }
            finally
            {
                setLoadingProfile(false)
            }
        }

        loadProfile()
    }, [token, user?.id, logout])

    useEffect(() =>
    {
        const loadAddress = async () =>
        {
            if (!token || !user?.id) return

            try
            {
                const addresses = await addressService.getMailingAddresses(user.id)
                const firstAddress = addresses?.[0] ?? null
                setMailingAddress(firstAddress)
                setAddressForm({
                    address: firstAddress?.address ?? "",
                    label: firstAddress?.label ?? "home",
                    id: firstAddress?.id,
                })
            }
            catch
            {
                setAddressError("Impossible de charger l'adresse de livraison")
            }
        }

        loadAddress()
    }, [token, user?.id])

    const handleSaveProfile = async () =>
    {
        if (!user?.id) return

        setProfileError(null)
        setProfileSuccess(null)
        setSavingProfile(true)
        try
        {
            const updatedUser = await userService.updateUser(user.id, {
                firstName: profileForm.firstName,
                lastName: profileForm.lastName,
                emailAddress: profileForm.emailAddress,
            })
            setProfileUser(updatedUser)
            setProfileForm({
                firstName: updatedUser.firstName ?? "",
                lastName: updatedUser.lastName ?? "",
                emailAddress: updatedUser.emailAddress ?? updatedUser.email ?? "",
            })
            setIsEditingProfile(false)
            setProfileSuccess("Profil mis à jour")
        }
        catch (error)
        {
            setProfileError(error instanceof Error ? error.message : "Erreur lors de la mise à jour du profil")
        }
        finally
        {
            setSavingProfile(false)
        }
    }

    const handleSaveAddress = async () =>
    {
        if (!user?.id || !addressForm.address.trim())
        {
            setAddressError("Veuillez renseigner une adresse")
            return
        }

        setAddressError(null)
        setAddressSuccess(null)
        setSavingAddress(true)

        try
        {
            if (addressForm.id)
            {
                await addressService.updateMailingAddress(user.id, addressForm.id, {
                    address: addressForm.address,
                    label: addressForm.label,
                })
            }
            else
            {
                await addressService.createMailingAddress(user.id, {
                    address: addressForm.address,
                    label: addressForm.label,
                })
            }

            const addresses = await addressService.getMailingAddresses(user.id)
            const firstAddress = addresses?.[0] ?? null
            setMailingAddress(firstAddress)
            setAddressForm({
                id: firstAddress?.id,
                address: firstAddress?.address ?? "",
                label: firstAddress?.label ?? "home",
            })

            setIsEditingAddress(false)
            setAddressSuccess("Adresse mise à jour")
        }
        catch (error)
        {
            setAddressError(error instanceof Error ? error.message : "Erreur lors de la mise à jour de l'adresse")
        }
        finally
        {
            setSavingAddress(false)
        }
    }

    const fullName = useMemo(() =>
    {
        if (!profileUser) return "Non renseigné"
        if (profileUser.firstName || profileUser.lastName) {
            return `${profileUser.firstName ?? ""} ${profileUser.lastName ?? ""}`.trim()
        }
        return profileUser.name ?? "Non renseigné"
    }, [profileUser])

    return (
        <Container maxW="container.lg" py={8}>
            <VStack gap={8} align="stretch">
                <Heading as="h1" size="2xl">
          Mon Profil
                </Heading>

                {loadingProfile && (
                    <Box p={3} bg="blue.50" borderRadius="md">
                        <Text fontSize="sm" color="blue.700">Chargement du profil...</Text>
                    </Box>
                )}

                {profileSuccess && (
                    <Box p={3} bg="green.50" borderRadius="md">
                        <Text fontSize="sm" color="green.700">{profileSuccess}</Text>
                    </Box>
                )}

                {addressSuccess && (
                    <Box p={3} bg="green.50" borderRadius="md">
                        <Text fontSize="sm" color="green.700">{addressSuccess}</Text>
                    </Box>
                )}

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Card.Root>
                        <Card.Body gap={4}>
                            <Heading size="md">Informations Personnelles</Heading>
                            {profileError && (
                                <Box p={2} bg="red.50" borderRadius="md" w="100%">
                                    <Text fontSize="sm" color="red.700">{profileError}</Text>
                                </Box>
                            )}
                            {!isEditingProfile ? (
                                <VStack gap={3} align="start">
                                    <Box>
                                        <Text fontWeight="bold">Nom:</Text>
                                        <Text>{fullName}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="bold">Email:</Text>
                                        <Text>{profileUser?.emailAddress ?? profileUser?.email ?? "Non renseigné"}</Text>
                                    </Box>
                                </VStack>
                            ) : (
                                <VStack gap={3} align="stretch">
                                    <Input
                                        placeholder="Prénom"
                                        value={profileForm.firstName}
                                        onChange={(e) => setProfileForm((prev) => ({ ...prev, firstName: e.target.value }))}
                                    />
                                    <Input
                                        placeholder="Nom"
                                        value={profileForm.lastName}
                                        onChange={(e) => setProfileForm((prev) => ({ ...prev, lastName: e.target.value }))}
                                    />
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        value={profileForm.emailAddress}
                                        onChange={(e) => setProfileForm((prev) => ({ ...prev, emailAddress: e.target.value }))}
                                    />
                                </VStack>
                            )}
                            {!isEditingProfile ? (
                                <Button colorScheme="blue" width="full" onClick={() => setIsEditingProfile(true)}>
                Éditer le profil
                                </Button>
                            ) : (
                                <HStack>
                                    <Button colorScheme="blue" width="full" onClick={handleSaveProfile} loading={savingProfile}>
                    Enregistrer
                                    </Button>
                                    <Button
                                        variant="outline"
                                        width="full"
                                        onClick={() =>
                                        {
                                            setIsEditingProfile(false)
                                            setProfileError(null)
                                            setProfileForm({
                                                firstName: profileUser?.firstName ?? "",
                                                lastName: profileUser?.lastName ?? "",
                                                emailAddress: profileUser?.emailAddress ?? profileUser?.email ?? "",
                                            })
                                        }}
                                    >
                    Annuler
                                    </Button>
                                </HStack>
                            )}
                        </Card.Body>
                    </Card.Root>

                    <Card.Root>
                        <Card.Body gap={4}>
                            <Heading size="md">Adresse de Livraison</Heading>
                            {addressError && (
                                <Box p={2} bg="red.50" borderRadius="md" w="100%">
                                    <Text fontSize="sm" color="red.700">{addressError}</Text>
                                </Box>
                            )}

                            {!isEditingAddress ? (
                                <VStack gap={3} align="start">
                                    <Box>
                                        <Text fontWeight="bold">Adresse:</Text>
                                        <Text>{mailingAddress?.address ?? "Non renseigné"}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="bold">Type:</Text>
                                        <Text>{mailingAddress?.label === "work" ? "Travail" : "Maison"}</Text>
                                    </Box>
                                </VStack>
                            ) : (
                                <VStack gap={3} align="stretch">
                                    <Input
                                        placeholder="Adresse de livraison"
                                        value={addressForm.address}
                                        onChange={(e) => setAddressForm((prev) => ({ ...prev, address: e.target.value }))}
                                    />
                                    <Box>
                                        <Text fontSize="sm" mb={1}>Type d'adresse</Text>
                                        <HStack>
                                            <Button
                                                variant={addressForm.label === "home" ? "solid" : "outline"}
                                                onClick={() => setAddressForm((prev) => ({ ...prev, label: "home" }))}
                                            >
                                                Maison
                                            </Button>
                                            <Button
                                                variant={addressForm.label === "work" ? "solid" : "outline"}
                                                onClick={() => setAddressForm((prev) => ({ ...prev, label: "work" }))}
                                            >
                                                Travail
                                            </Button>
                                        </HStack>
                                    </Box>
                                </VStack>
                            )}

                            {!isEditingAddress ? (
                                <Button colorScheme="blue" width="full" onClick={() => setIsEditingAddress(true)}>
                Modifier l&apos;adresse
                                </Button>
                            ) : (
                                <HStack>
                                    <Button colorScheme="blue" width="full" onClick={handleSaveAddress} loading={savingAddress}>
                    Enregistrer
                                    </Button>
                                    <Button
                                        variant="outline"
                                        width="full"
                                        onClick={() =>
                                        {
                                            setIsEditingAddress(false)
                                            setAddressError(null)
                                            setAddressForm({
                                                id: mailingAddress?.id,
                                                address: mailingAddress?.address ?? "",
                                                label: mailingAddress?.label ?? "home",
                                            })
                                        }}
                                    >
                    Annuler
                                    </Button>
                                </HStack>
                            )}
                        </Card.Body>
                    </Card.Root>
                </SimpleGrid>

                <Card.Root>
                    <Card.Body gap={4}>
                        <Heading size="md">Historique de Commandes</Heading>
                        <VStack gap={3} align="stretch">
                            <Box p={3} bg="gray.50" borderRadius="md">
                                <Text fontWeight="bold">Commande #001</Text>
                                <Text fontSize="sm" color="gray.600">
                  Date: 15/02/2026 - Total: 249.99€
                                </Text>
                            </Box>
                            <Box p={3} bg="gray.50" borderRadius="md">
                                <Text fontWeight="bold">Commande #002</Text>
                                <Text fontSize="sm" color="gray.600">
                  Date: 10/02/2026 - Total: 149.99€
                                </Text>
                            </Box>
                        </VStack>
                    </Card.Body>
                </Card.Root>
            </VStack>
        </Container>
    )
}
