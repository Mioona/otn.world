# 🌐 OTN.World - Three.js Experience

Projet Three.js interactif hébergé sur Infomaniak avec déploiement Git automatique.

## 🚀 Fonctionnalités

- **Three.js** : Scène 3D interactive avec Torus Knot animé
- **Node.js** : Serveur Express optimisé pour Infomaniak
- **Design responsive** : Interface adaptative mobile/desktop
- **Contrôles interactifs** : Animation, wireframe, couleurs
- **Performance monitoring** : FPS et compteur de triangles
- **Particules d'arrière-plan** : Effet visuel immersif
- **Déploiement Git** : Mise à jour automatique via Infomaniak

## 🛠️ Technologies

- **Frontend** : Three.js r158, HTML5, CSS3, JavaScript ES6
- **Backend** : Node.js, Express.js
- **Hosting** : Infomaniak avec support Node.js natif
- **Déploiement** : Git integration

## 📁 Structure

```
otn.world/
├── server.js          # Serveur Express
├── package.json       # Configuration Node.js
├── public/
│   ├── index.html     # Interface principale
│   ├── style.css      # Styles responsifs
│   └── main.js        # Application Three.js
└── README.md
```

## 🎯 Installation locale

```bash
# Cloner le repository
git clone https://github.com/Mioona/otn.world.git
cd otn.world

# Installer les dépendances
npm install

# Lancer en mode développement
npm start
```

Accès : `http://localhost:8080`

## 🌐 Déploiement Infomaniak

### Configuration Git
1. Dans le Manager Infomaniak
2. Ajouter un site → Node.js → Git
3. URL du dépôt : `https://github.com/Mioona/otn.world.git`
4. Installation automatique des dépendances
5. Démarrage automatique sur le port attribué

### Mise à jour automatique
```bash
# Push des modifications
git add .
git commit -m "✨ Nouvelle fonctionnalité"
git push origin main

# Synchronisation dans le Manager Infomaniak
# Node.js → Synchroniser Git
```

## 🎮 Contrôles

- **⏸️ Pause/Play** : Arrêter/reprendre l'animation
- **🔲 Wireframe** : Basculer entre mode solid/wireframe
- **🎨 Couleur** : Changer la couleur de l'objet 3D
- **📷 Reset** : Remettre la caméra en position initiale
- **Souris** : Interaction avec l'objet 3D

## 📊 Performance

- **FPS monitoring** : Affichage temps réel
- **Triangle count** : Comptage des polygones
- **Responsive design** : Adaptation mobile/desktop
- **Loading screen** : Interface de chargement

## 🎨 Personnalisation

### Changer l'objet 3D
```javascript
// Dans public/main.js - ligne ~75
const geometry = new THREE.BoxGeometry(2, 2, 2); // Cube
// ou
const geometry = new THREE.SphereGeometry(1, 32, 32); // Sphère
```

### Modifier les couleurs
```javascript
// Dans public/main.js - ligne ~12
const config = {
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#votre-couleur'],
    currentColorIndex: 0
};
```

## 🔧 Configuration serveur

Le serveur Express est optimisé pour Infomaniak :
- Port dynamique (`process.env.PORT`)
- Headers CORS pour Three.js
- API de statut : `/api/status`
- Gestion d'erreurs intégrée
- Serving de fichiers statiques

## 📱 Support mobile

- Interface tactile optimisée
- Contrôles adaptés mobile
- Performance optimisée
- Design responsive

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajouter fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🚀 Roadmap

- [ ] Chargement de modèles 3D externes (GLTF/GLB)
- [ ] Physics avec Cannon.js
- [ ] VR/AR support avec WebXR
- [ ] Mode multijoueur avec WebSockets
- [ ] Éditeur de scène en ligne
- [ ] Export d'animations

---

**Développé avec ❤️ pour l'écosystème Infomaniak**