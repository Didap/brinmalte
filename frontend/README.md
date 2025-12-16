# Brinmalte Frontend

Frontend Vue.js 3 per la piattaforma ecommerce Brinmalte, costruito con PrimeVue.

## 🚀 Tecnologie

- **Vue.js 3** - Framework JavaScript progressivo
- **TypeScript** - Type safety
- **PrimeVue** - UI Component Library
- **Pinia** - State Management
- **Vue Router** - Routing
- **Axios** - HTTP Client

## 🎨 Design

- Colori personalizzati:
  - **Primary**: #e67f20 (arancione)
  - **Secondary**: #423e3d (marrone scuro)
  - **Background**: cream (#faf8f5)
- Tema PrimeVue personalizzato (Brinmalte Preset)
- Design responsive mobile-first

## 📋 Prerequisiti

- Node.js 18.x - 22.x
- npm o yarn

## 🛠️ Installazione

```bash
# Installa le dipendenze
npm install

# Configura le variabili d'ambiente
# Crea un file .env con:
VITE_API_URL=http://localhost:1337/api

# Avvia il dev server
npm run dev
```

## 📦 Comandi

```bash
# Sviluppo con hot-reload
npm run dev

# Build per produzione
npm run build

# Preview build di produzione
npm run preview

# Type-check
npm run type-check

# Lint
npm run lint
```

## 📁 Struttura

```
src/
├── components/          # Componenti riutilizzabili
│   ├── NavBar.vue      # Barra di navigazione
│   └── ProductCard.vue # Card prodotto
├── views/              # Pagine
│   ├── HomeView.vue    # Homepage
│   ├── ProductsView.vue    # Catalogo prodotti
│   ├── ProductDetailView.vue # Dettaglio prodotto
│   └── CartView.vue    # Carrello
├── stores/             # Pinia stores
│   ├── products.ts     # Gestione prodotti
│   └── cart.ts         # Gestione carrello
├── services/           # Servizi API
│   ├── api.ts          # Configurazione Axios
│   └── strapi.ts       # Servizi Strapi
├── presets/            # Temi PrimeVue
│   └── brinmalte.ts    # Tema personalizzato
└── router/             # Routing
    └── index.ts
```

## 🎯 Features

- ✅ Catalogo prodotti con paginazione
- ✅ Dettaglio prodotto con immagini
- ✅ Carrello con persistenza localStorage
- ✅ Gestione quantità e stock
- ✅ Toast notifications
- ✅ Confirm dialogs
- ✅ Design responsive
- ✅ Tema personalizzato con i colori del brand

## 🔌 Connessione al Backend

Assicurati che:
1. Il backend Strapi sia in esecuzione su `http://localhost:1337`
2. I Content Types (Product, Category) siano creati
3. I permessi pubblici siano configurati per le API

## 🎨 Componenti PrimeVue Utilizzati

- **Menubar** - Navigazione
- **Button** - Pulsanti
- **Card** - Card prodotti
- **Badge** - Badge carrello e stock
- **Tag** - Etichette stato
- **DataTable** - Tabella carrello
- **InputNumber** - Selettore quantità
- **Panel** - Pannello riepilogo
- **Paginator** - Paginazione prodotti
- **Image** - Viewer immagini con preview
- **Toast** - Notifiche
- **ConfirmDialog** - Dialog di conferma
- **ProgressSpinner** - Loading states
- **Message** - Messaggi informativi
- **Divider** - Separatori

## 📝 Note

- Il carrello è salvato in localStorage e persiste tra le sessioni
- Le immagini prodotto vengono caricate dal backend Strapi
- Il tema usa il preset personalizzato Brinmalte con i colori del brand
- Tutte le notifiche utente utilizzano il sistema Toast di PrimeVue

## 🌐 URLs

- **Development**: http://localhost:5173
- **Backend API**: http://localhost:1337/api
- **Strapi Admin**: http://localhost:1337/admin
