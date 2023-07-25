# Bookshelf Fullstack App
Questo repository contiene il codice sorgente per l'applicazione "Bookshelf Fullstack", un'applicazione web per la gestione di una libreria di libri.
Il Frontend si compone solamente di tre schermate:
● login (contenente la lista degli utenti salvati nel database);
● la lista dei libri in possesso dell’utente loggato;
● la pagina di dettaglio del libro, in cui è possibile visualizzare tutte le informazioni. 
L'applicazione è stata sviluppata utilizzando le seguenti tecnologie e stack:

# Stack Tecnologico
# Frontend:
React (con TypeScript)
React Router Dom
Axios (per le chiamate API)

# Backend:
Node.js (con TypeScript)
Express.js
MySQL (con Sequelize ORM)

# Containerization:
Docker
Docker Compose

# Chiamate API disponibili
Le chiamate API sono prefissate con i seguenti router:

/book: Contiene le chiamate API relative alla gestione dei libri.
/user: Contiene le chiamate API relative alla gestione degli utenti.

# Chiamate API relative ai Libri
GET /book: Restituisce l'elenco di tutti i libri presenti nella collezione.
GET /book/:id: Restituisce i dettagli di un libro specificato dall'ID.
POST /book: Aggiunge un nuovo libro alla collezione.
PUT /book/:id: Aggiorna i dettagli di un libro specificato dall'ID.
DELETE /book/:id: Rimuove un libro specificato dall'ID.
# Chiamate API relative agli Utenti
GET /user: Restituisce l'elenco di tutti gli utenti registrati.
GET /user/:id: Restituisce i dettagli di un utente specificato dall'ID.
POST /user: Registra un nuovo utente.
PUT /user/:id: Aggiorna i dettagli di un utente specificato dall'ID.
DELETE /user/:id: Rimuove un utente specificato dall'ID.

# Istruzioni per l'avvio del progetto
Clonare questo repository sul proprio computer utilizzando il comando git clone.

Assicurarsi di avere Docker installato sul proprio sistema.

Creare un file .env nella cartella backend contenente le seguenti variabili d'ambiente:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=PassWord123-
DB_NAME=bookshelf
DB_PORT=3306
NODE_DOCKER_PORT=8081
MYSQLDB_LOCAL_PORT=3308
NODE_LOCAL_PORT=8081

Nella radice del progetto, eseguire il comando docker-compose up per avviare il backend, il frontend e il database MySQL in container separati.
Una volta che i container sono avviati, l'applicazione sarà accessibile all'indirizzo http://localhost:8081
