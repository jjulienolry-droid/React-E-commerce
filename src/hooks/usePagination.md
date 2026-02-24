# Hook: usePagination

## Utilité
Le hook `usePagination` gère la pagination des produits: calcule les pages, naviguer entre les pages et affiche les éléments par page.

## Avantages
- Améliore les performances avec des listes longues
- Gère automatiquement la navigation entre pages
- Configurable (nombre d'éléments par page)
- Évite que la page se charge lentement

## Utilisation

```typescript
import { usePagination } from './usePagination';

function ProductGrid({ products }) {
  const { 
    currentPage, 
    paginatedItems, 
    totalPages, 
    goToPage, 
    nextPage, 
    prevPage 
  } = usePagination(products, { itemsPerPage: 12 });

  return (
    <div>
      <div className="product-grid">
        {paginatedItems.map(product => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>← Précédent</button>
        
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        
        <button onClick={nextPage} disabled={currentPage === totalPages}>Suivant →</button>
      </div>
    </div>
  );
}
```

## Propriétés et méthodes
- `currentPage`: Numéro de la page actuelle
- `paginatedItems`: Éléments de la page actuelle
- `totalPages`: Nombre total de pages
- `goToPage(pageNumber)`: Aller à une page spécifique
- `nextPage()`: Page suivante
- `prevPage()`: Page précédente
