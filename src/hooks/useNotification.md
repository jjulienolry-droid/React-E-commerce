# Hook: useNotification

## Utilité
Le hook `useNotification` gère les notifications/toasts pour afficher les messages d'erreur, de succès, d'avertissement à l'utilisateur.

## Avantages
- Affichage centralisé des notifications
- Fermeture automatique des notifications
- Évite la prop drilling
- Peut être utilisé globalement dans l'app

## Utilisation

```typescript
import { useNotification } from './useNotification';

function CheckoutPage() {
  const { notify, notifications } = useNotification();

  const handlePayment = async () => {
    try {
      // Simuler un paiement
      await paymentAPI.process();
      notify({
        type: 'success',
        message: 'Paiement effectué avec succès!'
      });
    } catch (error) {
      notify({
        type: 'error',
        message: 'Erreur lors du paiement: ' + error.message
      });
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Payer</button>
      
      {notifications.map(notif => (
        <div key={notif.id} className={`notification notification-${notif.type}`}>
          {notif.message}
        </div>
      ))}
    </div>
  );
}
```

## Propriétés et méthodes
- `notify(config)`: Afficher une notification
  - `type`: 'success', 'error', 'warning', 'info'
  - `message`: Texte de la notification
  - `duration`: Durée avant fermeture (ms)
- `notifications`: Tableau des notifications actuelles
- `clearNotifications()`: Effacer toutes les notifications
- `removeNotification(id)`: Supprimer une notification spécifique
