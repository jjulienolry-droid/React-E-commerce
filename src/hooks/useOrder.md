# Hook: useOrder

## Utilité
Le hook `useOrder` gère les commandes: création, récupération, suivi de l'état et historique des commandes.

## Avantages
- Centralise la logique des commandes
- Gère le statut de la commande
- Permet de tracker les commandes en temps réel
- Historique des commandes persisté

## Utilisation

```typescript
import { useOrder } from './useOrder';

function OrderHistory() {
  const { 
    orders, 
    createOrder, 
    getOrderDetails, 
    cancelOrder, 
    loading 
  } = useOrder();

  const handleCreateOrder = async (cartItems) => {
    try {
      const newOrder = await createOrder({
        items: cartItems,
        shippingAddress: '...'
      });
      console.log('Commande créée:', newOrder);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Mes commandes</h2>
      {orders.map(order => (
        <div key={order.id}>
          <h4>Commande #{order.id}</h4>
          <p>Statut: {order.status}</p>
          <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Total: {order.total}€</p>
          <button onClick={() => getOrderDetails(order.id)}>Détails</button>
          {order.status === 'pending' && (
            <button onClick={() => cancelOrder(order.id)}>Annuler</button>
          )}
        </div>
      ))}
    </div>
  );
}
```

## Propriétés et méthodes
- `orders`: Tableau des commandes
- `createOrder(orderData)`: Créer une nouvelle commande
- `getOrderDetails(orderId)`: Récupérer les détails d'une commande
- `cancelOrder(orderId)`: Annuler une commande
- `updateOrderStatus(orderId, status)`: Mettre à jour le statut
- `loading`: Booléen indiquant si les données se chargent
