# Hook: useFetch

## Utilité
Le hook `useFetch` est un hook générique pour récupérer des données d'une API. Il gère le chargement, les erreurs et le cache.

## Avantages
- Réutilisable pour n'importe quelle requête API
- Gère automatiquement le cycle de vie
- Cache les données pour éviter les appels répétés
- Notions de retry et timeout

## Utilisation

```typescript
import { useFetch } from './useFetch';

function ProductDetails({ productId }) {
  const { data, loading, error, refetch } = useFetch(
    `/products/${productId}`,
    { retry: 3, timeout: 5000 }
  );

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      <p>{data?.price}€</p>
      <button onClick={refetch}>Rafraîchir</button>
    </div>
  );
}

// Utilisation avec POST
function CreateProduct() {
  const { data, loading, error } = useFetch(
    '/products',
    {
      method: 'POST',
      body: { title: 'Nouveau produit', price: 99 }
    }
  );

  return <div>{loading ? 'Création...' : 'Produit créé!'}</div>;
}
```

## Propriétés et méthodes
- `data`: Données récupérées de l'API
- `loading`: Booléen indiquant si le chargement est en cours
- `error`: Message d'erreur s'il y a un problème
- `refetch()`: Rafraîchir les données
- Options:
  - `method`: 'GET', 'POST', etc.
  - `body`: Données à envoyer
  - `retry`: Nombre de tentatives
  - `timeout`: Délai avant timeout (ms)
