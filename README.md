# Brinmalte - Backend Ecommerce

Backend per piattaforma ecommerce costruito con Strapi CMS e PostgreSQL.

## 🚀 Tecnologie

- **Strapi v5.28.0** - Headless CMS
- **PostgreSQL 16** - Database
- **Docker** - Containerizzazione del database
- **Node.js 22** - Runtime

## 📋 Prerequisiti

- Node.js 18.x - 22.x
- npm o yarn
- Docker e Docker Compose

## 🛠️ Installazione

### 1. Clona il repository

```bash
git clone https://github.com/Didap/brinmalte.git
cd brinmalte
```

### 2. Avvia il database PostgreSQL con Docker

```bash
docker-compose up -d
```

Questo comando avvierà un container PostgreSQL con le seguenti credenziali:
- **Host**: localhost
- **Port**: 5432
- **Database**: brinmalte
- **Username**: strapi
- **Password**: strapi

### 3. Installa le dipendenze di Strapi

```bash
cd backend
npm install
```

### 4. Configura le variabili d'ambiente

Il file `.env` è già configurato con le credenziali del database locale. Per produzione, modifica i seguenti valori:

```env
APP_KEYS=genera_chiavi_sicure
API_TOKEN_SALT=genera_salt_sicuro
ADMIN_JWT_SECRET=genera_secret_sicuro
TRANSFER_TOKEN_SALT=genera_salt_sicuro
JWT_SECRET=genera_secret_sicuro
```

### 5. Avvia Strapi in modalità sviluppo

```bash
npm run develop
```

Strapi sarà disponibile su `http://localhost:1337`

## 📦 Comandi Disponibili

### Backend (Strapi)

```bash
# Sviluppo con hot-reload
npm run develop

# Avvio in modalità produzione
npm run start

# Build dell'admin panel
npm run build

# Deploy
npm run deploy
```

### Database (Docker)

```bash
# Avvia il database
docker-compose up -d

# Ferma il database
docker-compose down

# Ferma il database e rimuovi i volumi (ATTENZIONE: elimina tutti i dati)
docker-compose down -v

# Visualizza i logs del database
docker-compose logs -f postgres
```

## 🏗️ Struttura del Progetto

```
brinmalte/
├── backend/              # Strapi CMS
│   ├── config/          # Configurazioni
│   ├── src/             # Codice sorgente
│   │   ├── api/        # API endpoints
│   │   └── admin/      # Personalizzazioni admin
│   └── .env            # Variabili d'ambiente
├── docker-compose.yml   # Configurazione Docker per PostgreSQL
└── README.md           # Documentazione
```

## 🔐 Primo Accesso

1. Avvia il database: `docker-compose up -d`
2. Avvia Strapi: `cd backend && npm run develop`
3. Apri il browser su `http://localhost:1337/admin`
4. Crea il tuo primo utente amministratore

## 📝 Note per Ecommerce

Strapi include diversi plugin utili per un ecommerce:

- **Content Types**: Crea modelli per Prodotti, Categorie, Ordini, ecc.
- **Media Library**: Gestione immagini prodotti
- **User & Permissions**: Gestione utenti e ruoli
- **Internationalization**: Supporto multilingua
- **Email**: Invio email transazionali

## 🤝 Contribuire

1. Fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è distribuito sotto licenza MIT.

## 🐛 Troubleshooting

### Il database non si connette

Verifica che il container Docker sia in esecuzione:
```bash
docker-compose ps
```

### Errori di permessi npm

Se riscontri problemi con npm cache, esegui:
```bash
sudo chown -R $(whoami) ~/.npm
```

### Porta 5432 già in uso

Se hai già PostgreSQL installato localmente, modifica la porta nel `docker-compose.yml`:
```yaml
ports:
  - '5433:5432'  # Usa 5433 invece di 5432
```

E aggiorna anche il file `.env` nel backend:
```env
DATABASE_PORT=5433
```

