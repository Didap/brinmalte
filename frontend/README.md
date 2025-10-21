# Brinmalte Frontend

Frontend Vue.js per la piattaforma ecommerce Brinmalte.

## 🚀 Setup

```bash
# Installa le dipendenze
npm install

# Avvia il dev server
npm run dev

# Build per produzione
npm run build

# Preview build di produzione
npm run preview
```

## 🔧 Configurazione

Crea un file `.env` nella root del progetto frontend:

```env
VITE_API_URL=http://localhost:1337/api
```

## 📱 Features

- **Home Page**: Landing page con prodotti in evidenza
- **Catalogo Prodotti**: Lista completa dei prodotti con paginazione
- **Dettaglio Prodotto**: Pagina dettagliata per ogni prodotto
- **Carrello**: Gestione carrello con localStorage
- **Responsive Design**: Ottimizzato per mobile e desktop

## 🛠️ Stack Tecnologico

- Vue.js 3 con Composition API
- TypeScript
- Vue Router per il routing
- Pinia per lo state management
- Axios per le chiamate HTTP
- CSS vanilla con scoped styles

## 📁 Struttura

```
src/
├── components/      # Componenti riutilizzabili
│   ├── NavBar.vue
│   └── ProductCard.vue
├── views/          # Pagine/Views
│   ├── HomeView.vue
│   ├── ProductsView.vue
│   ├── ProductDetailView.vue
│   └── CartView.vue
├── stores/         # Pinia stores
│   ├── products.ts
│   ├── cart.ts
│   └── auth.ts
├── services/       # Servizi API
│   ├── api.ts
│   └── strapi.ts
└── router/         # Configurazione routing
    └── index.ts
```

## 🔌 Connessione al Backend

Il frontend si connette al backend Strapi tramite l'API URL configurato nelle variabili d'ambiente.

Assicurati che:
1. Il backend Strapi sia in esecuzione su `http://localhost:1337`
2. I Content Types (Product, Category) siano creati in Strapi
3. I permessi pubblici siano configurati per le API Products e Categories

## 📝 Note

- Il carrello è salvato in localStorage e persiste tra le sessioni
- L'autenticazione JWT è supportata ma non implementata nell'UI
- Le immagini prodotto vengono caricate dal backend Strapi
