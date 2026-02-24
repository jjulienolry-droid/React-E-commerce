# Hook: useSearch

## Utilité
Le hook `useSearch` permet de rechercher des produits par mot-clé en temps réel dans le titre, la description ou d'autres champs.

## Avantages
- Recherche en temps réel avec débounce
- Évite les appels API inutiles
- Améliore l'expérience utilisateur
- Peut être persisté dans l'URL (optional)

## Utilisation

```typescript
import { useSearch } from './useSearch';

function SearchBar({ products }) {
  const { searchTerm, results, setSearchTerm } = useSearch(products, {
    debounceDelay: 300,
    searchFields: ['title', 'description', 'category']
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <div className="search-results">
          <p>{results.length} résultat(s) trouvé(s)</p>
          {results.map(product => (
            <div key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.price}€</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Propriétés et méthodes
- `searchTerm`: Terme de recherche actuel
- `results`: Produits correspondant à la recherche
- `setSearchTerm(term)`: Mettre à jour le terme de recherche
- `clearSearch()`: Effacer la recherche
- `isSearching`: Booléen indiquant si une recherche est en cours
