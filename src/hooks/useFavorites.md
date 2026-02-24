# Hook: useFavorites

## Utilité
Le hook `useFavorites` gère les produits favoris de l'utilisateur: ajout/suppression et persistance en localStorage ou base de données.

## Avantages
- Persiste les favoris entre les sessions
- Centralise la logique des favoris
- Synchronisation easy avec le panier
- Réutilisable dans plusieurs composants

## Utilisation

```typescript
import { useFavorites } from './useFavorites';

function ProductCard({ product }) {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <div>
      <h3>{product.title}</h3>
      <p>{product.price}€</p>
      <button 
        onClick={handleToggleFavorite}
        className={isFavorite(product.id) ? 'favorited' : ''}
      >
        ❤️ {isFavorite(product.id) ? 'Supprimé des favoris' : 'Ajouter aux favoris'}
      </button>
    </div>
  );
}

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div>
      <h2>Mes favoris ({favorites.length})</h2>
      {favorites.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
```

## Propriétés et méthodes
- `favorites`: Tableau des produits favoris
- `addFavorite(product)`: Ajouter un produit aux favoris
- `removeFavorite(productId)`: Supprimer un produit des favoris
- `isFavorite(productId)`: Vérifier si un produit est en favoris
- `clearFavorites()`: Vider tous les favoris
