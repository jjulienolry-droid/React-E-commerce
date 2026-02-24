# Hook: useProducts

## Utilité
Le hook `useProducts` permet de récupérer et gérer la liste des produits depuis l'API. Il gère le chargement, les erreurs et la mise en cache des données.

## Avantages
- Centralise la logique de récupération des produits
- Gère automatiquement le chargement (`loading`), les erreurs et le cache
- Réduit les appels API répétés
- Réutilisable dans plusieurs composants

## Utilisation

```typescript
import { useProducts } from './useProducts';

function ProductList() {
  const { products, loading, error, refetch } = useProducts();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
      <button onClick={refetch}>Rafraîchir</button>
    </div>
  );
}
```

## Propriétés retournées
- `products`: Liste des produits
- `loading`: Booléen indiquant si les données se chargent
- `error`: Message d'erreur s'il y a un problème
- `refetch()`: Fonction pour rafraîchir les données
