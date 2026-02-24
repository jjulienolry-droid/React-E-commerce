# Hook: useFilter

## Utilité
Le hook `useFilter` permet de filtrer les produits selon différents critères (catégorie, prix, etc.) et met à jour la liste en temps réel.

## Avantages
- Simplifie la logique de filtrage
- Optimise les performances avec la mémorisation
- Peut combiner plusieurs filtres
- Synchronise les filtres avec l'URL (optionnel)

## Utilisation

```typescript
import { useFilter } from './useFilter';

function ProductFilter({ products }) {
  const { 
    filteredProducts, 
    filters, 
    setFilter, 
    clearFilters 
  } = useFilter(products);

  return (
    <div>
      <div>
        <label>
          Catégorie:
          <select 
            value={filters.category || ''} 
            onChange={(e) => setFilter('category', e.target.value)}
          >
            <option value="">Tous</option>
            <option value="electronics">Électronique</option>
            <option value="clothing">Vêtements</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Prix max:
          <input 
            type="number" 
            value={filters.maxPrice || ''} 
            onChange={(e) => setFilter('maxPrice', parseFloat(e.target.value))}
          />
        </label>
      </div>

      <button onClick={clearFilters}>Réinitialiser</button>

      <div>
        {filteredProducts.map(product => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
    </div>
  );
}
```

## Propriétés et méthodes
- `filteredProducts`: Liste filtrée des produits
- `filters`: Objet contenant les filtres actifs
- `setFilter(key, value)`: Appliquer un filtre
- `clearFilters()`: Réinitialiser tous les filtres
