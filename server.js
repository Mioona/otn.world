const express = require('express');
const path = require('path');
const app = express();

// Port fourni par Infomaniak (important !)
const PORT = process.env.PORT || 8080;

// Servir les fichiers statiques
app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));

// NOTE: COOP/COEP désactivés pour compatibilité CDN/charges externes
// app.use((req, res, next) => {
//   res.header('Cross-Origin-Embedder-Policy', 'require-corp');
//   res.header('Cross-Origin-Opener-Policy', 'same-origin');
//   next();
// });

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route API exemple
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'running',
    timestamp: new Date().toISOString(),
    project: 'OTN.World Three.js'
  });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 OTN.World Three.js server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Gestion des erreurs
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});