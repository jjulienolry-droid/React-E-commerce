import React, { useState } from "react"
import {
    Box,
    Container,
    Heading,
    Text,
    Input,
    VStack,
    HStack,
    Button,
} from "@chakra-ui/react"
import { useAuth } from "../context/AuthContext"

type AuthMode = "signin" | "signup"

export const AuthPage: React.FC = () =>
{
    const { login, register, loading } = useAuth()
    const [mode, setMode] = useState<AuthMode>("signin")
    const [error, setError] = useState<string | null>(null)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault()
        setError(null)

        try
        {
            if (mode === "signin")
            {
                await login(email, password)
            }
            else
            {
                if (password !== confirmPassword)
                {
                    setError("Les mots de passe ne correspondent pas")
                    return
                }
                await register(firstName, lastName, email, password)
            }
        }
        catch (err)
        {
            setError(err instanceof Error ? err.message : "Une erreur est survenue")
        }
    }

    const toggleMode = () =>
    {
        setMode(mode === "signin" ? "signup" : "signin")
        setError(null)
    }

    return (
        <Box bg="gray.50" minH="calc(100vh - 150px)" py={16}>
            <Container maxW="md">
                <Box bg="white" p={8} borderRadius="xl" boxShadow="lg">
                    <VStack gap={6} as="form" onSubmit={handleSubmit}>
                        <Heading as="h1" size="xl" color="gray.800">
                            {mode === "signin" ? "Connexion" : "Cr\u00e9er un compte"}
                        </Heading>
                        <Text color="gray.500" fontSize="sm">
                            {mode === "signin"
                                ? "Connectez-vous pour acc\u00e9der \u00e0 votre compte"
                                : "Remplissez le formulaire pour vous inscrire"}
                        </Text>

                        {error && (
                            <Box
                                w="100%"
                                p={3}
                                bg="red.50"
                                color="red.600"
                                borderRadius="md"
                                fontSize="sm"
                            >
                                {error}
                            </Box>
                        )}

                        {mode === "signup" && (
                            <HStack w="100%" gap={4}>
                                <Input
                                    placeholder="Prénom"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                                <Input
                                    placeholder="Nom"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </HStack>
                        )}

                        <Input
                            placeholder="Adresse email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            placeholder="Mot de passe"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {mode === "signup" && (
                            <Input
                                placeholder="Confirmer le mot de passe"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        )}

                        <Button
                            type="submit"
                            w="100%"
                            bg="gray.800"
                            color="white"
                            size="lg"
                            disabled={loading}
                            _hover={{ bg: "gray.700" }}
                        >
                            {loading
                                ? "Chargement..."
                                : mode === "signin"
                                    ? "Se connecter"
                                    : "S'inscrire"}
                        </Button>

                        <Text fontSize="sm" color="gray.500">
                            {mode === "signin" ? "Pas encore de compte ? " : "D\u00e9j\u00e0 un compte ? "}
                            <Button
                                background="none"
                                color="gray.800"
                                fontWeight="bold"
                                onClick={toggleMode}
                                _hover={{ textDecoration: "underline" }}
                                cursor="pointer"
                                padding={0}
                            >
                                {mode === "signin" ? "S'inscrire" : "Se connecter"}
                            </Button>
                        </Text>
                    </VStack>
                </Box>
            </Container>
        </Box>
    )
}
