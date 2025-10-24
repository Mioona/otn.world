# 🚀 Déploiement automatique - Guide de configuration

## 📋 Vue d'ensemble

Ce projet utilise **GitHub Actions** pour déployer automatiquement sur Infomaniak à chaque push sur `main`.

## ⚙️ Configuration requise (Une seule fois)

### 1. 🔐 Secrets GitHub à configurer

Allez sur votre repository GitHub → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Ajoutez ces 5 secrets :

| Secret | Valeur | Où trouver |
|--------|--------|------------|
| `FTP_HOSTNAME` | `votre-domaine.ftp.infomaniak.com` | Manager Infomaniak → FTP/SSH |
| `FTP_USERNAME` | Votre nom d'utilisateur FTP | Manager Infomaniak → FTP/SSH |
| `FTP_PASSWORD` | Votre mot de passe FTP | Manager Infomaniak → FTP/SSH |
| `SSH_HOST` | `votre-domaine.ftp.infomaniak.com` | Manager Infomaniak → SSH |
| `SSH_USERNAME` | Votre nom d'utilisateur SSH | Manager Infomaniak → SSH |

### 2. 📍 Trouver vos informations Infomaniak

1. **Manager Infomaniak** → **paul.care** (votre hébergement)
2. **FTP/SSH** dans le menu de gauche
3. Notez les informations de connexion

#### Exemple de valeurs :
```
FTP_HOSTNAME: paul.care.ftp.infomaniak.com
FTP_USERNAME: paul_care_12345
FTP_PASSWORD: VotreMotDePasse
SSH_HOST: paul.care.ftp.infomaniak.com  
SSH_USERNAME: paul_care_12345
```

### 3. 🎯 Répertoire de déploiement

Le workflow déploie vers `/web/` sur votre serveur. Ajustez si nécessaire dans `.github/workflows/deploy.yml` ligne 32 :

```yaml
server-dir: '/web/votre-dossier-nodejs/'
```

## 🚀 Utilisation

### Déploiement automatique
```bash
# Faire vos modifications
git add .
git commit -m "✨ Nouvelle fonctionnalité"
git push origin main

# → Le déploiement se lance automatiquement ! 🎉
```

### Déploiement manuel
1. Allez sur GitHub → **Actions**
2. Cliquez sur **🚀 Deploy to Infomaniak**
3. **Run workflow** → **Run workflow**

## 📊 Monitoring

### Vérifier les déploiements
- **GitHub** → **Actions** : Logs complets de chaque déploiement
- **Infomaniak** → **Node.js** : Statut de l'application
- **Site web** : https://otn.world

### Étapes du déploiement
1. ✅ **Checkout** : Récupération du code
2. ✅ **Setup Node.js** : Installation de Node.js 18
3. ✅ **Install dependencies** : `npm ci`
4. ✅ **Deploy via SFTP** : Upload des fichiers
5. ✅ **Restart Node.js** : Redémarrage de l'application

## 🛠️ Personnalisation

### Modifier le workflow
Éditez `.github/workflows/deploy.yml` pour :
- Changer la version Node.js
- Ajouter des étapes de build
- Modifier les fichiers exclus
- Changer le répertoire de destination

### Fichiers exclus par défaut
- `.git*` (historique Git)
- `node_modules/` (dépendances - réinstallées sur le serveur)
- `.github/` (workflows)
- `README.md` et `.gitignore`

## 🚨 Dépannage

### Erreur FTP
- ✅ Vérifiez `FTP_HOSTNAME`, `FTP_USERNAME`, `FTP_PASSWORD`
- ✅ Testez la connexion FTP manuellement

### Erreur SSH
- ✅ Vérifiez `SSH_HOST`, `SSH_USERNAME`
- ✅ Assurez-vous que SSH est activé chez Infomaniak

### Application ne redémarre pas
- ✅ Vérifiez les logs dans Manager Infomaniak
- ✅ Redémarrez manuellement l'application Node.js

## 📝 Notes importantes

- **Sécurité** : Vos secrets sont chiffrés par GitHub
- **Performance** : Le déploiement prend ~2-3 minutes
- **Rollback** : Utilisez `git revert` puis push pour revenir en arrière
- **Branches** : Seul `main` déclenche le déploiement automatique

## 🎯 Workflow moderne

```bash
# Développement local
npm install
npm start  # Test local sur http://localhost:8080

# Déploiement production
git add .
git commit -m "🎨 Amélioration Three.js"
git push origin main

# → Site mis à jour automatiquement sur https://otn.world ! 🚀
```

---

**🎉 Une fois configuré, vous n'avez plus qu'à coder et pusher !**