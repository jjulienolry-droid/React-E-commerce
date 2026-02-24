# Hook: useLocalStorage

## Utilité
Le hook `useLocalStorage` persiste les données dans le localStorage du navigateur et les synchronise automatiquement.

## Avantages
- Persiste les préférences utilisateur
- Synchronisation automatique avec le stockage
- Évite d'écrire du code localStorage manuellement
- Fallback localStorage = undefined si non disponible

## Utilisation

```typescript
import { useLocalStorage } from './useLocalStorage';

function UserPreferences() {
  const [theme, setTheme] = useLocalStorage('user-theme', 'light');
  const [currency, setCurrency] = useLocalStorage('user-currency', 'EUR');

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Clair</option>
        <option value="dark">Sombre</option>
      </select>

      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="EUR">EUR €</option>
        <option value="USD">USD $</option>
        <option value="GBP">GBP £</option>
      </select>

      <p>Thème actuel: {theme}</p>
      <p>Devise actuelle: {currency}</p>
    </div>
  );
}
```

## Propriétés et méthodes
- Utilise le pattern `[value, setValue]` comme `useState`
- Paramètres:
  - `key`: Clé du localStorage
  - `initialValue`: Valeur par défaut si la clé n'existe pas
- Retourne:
  - `value`: Valeur stockée
  - `setValue()`: Fonction pour mettre à jour la valeur
