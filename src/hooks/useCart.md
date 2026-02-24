# Hook: useCart

## Utilité
Le hook `useCart` gère le panier d'achat: ajout/suppression de produits, modification des quantités, calcul du total et persistance en localStorage.

## Avantages
- Centralise la logique du panier
- Synchronise les données avec localStorage
- Calcule automatiquement les totaux
- Évite la prop drilling

## Utilisation

```typescript
import { useCart } from './useCart';

function CartPage() {
  const { items, addItem, removeItem, updateQuantity, getTotal, clearCart } = useCart();

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <input 
            type="number" 
            value={item.quantity} 
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          />
          <button onClick={() => removeItem(item.id)}>Supprimer</button>
        </div>
      ))}
      <h2>Total: {getTotal()}€</h2>
      <button onClick={clearCart}>Vider le panier</button>
    </div>
  );
}
```

## Propriétés et méthodes
- `items`: Tableau des articles du panier
- `addItem(product)`: Ajouter un produit au panier
- `removeItem(productId)`: Supprimer un produit
- `updateQuantity(productId, quantity)`: Modifier la quantité
- `getTotal()`: Calculer le montant total
- `clearCart()`: Vider complètement le panier
