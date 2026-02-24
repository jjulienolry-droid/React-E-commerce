# Hook: useAuth

## Utilité
Le hook `useAuth` gère l'authentification des utilisateurs: connexion, déconnexion, inscription et persistance de la session.

## Avantages
- Centralise la logique d'authentification
- Gère automatiquement les tokens d'authentification
- Persiste la session utilisateur
- Fournit l'état d'authentification globalement

## Utilisation

```typescript
import { useAuth } from './useAuth';

function LoginPage() {
  const { user, isAuthenticated, login, logout, loading } = useAuth();

  const handleLogin = async (email, password) => {
    await login(email, password);
  };

  if (loading) return <div>Vérification de la session...</div>;

  if (isAuthenticated) {
    return (
      <div>
        <p>Bienvenue, {user?.email}</p>
        <button onClick={logout}>Déconnexion</button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleLogin('user@example.com', 'password');
    }}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mot de passe" />
      <button type="submit">Connexion</button>
    </form>
  );
}
```

## Propriétés et méthodes
- `user`: Objet utilisateur connecté
- `isAuthenticated`: Booléen indiquant si l'utilisateur est connecté
- `loading`: Booléen indiquant le statut de chargement
- `login(email, password)`: Connexion utilisateur
- `logout()`: Déconnexion
- `register(email, password)`: Inscription
