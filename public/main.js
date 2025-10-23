// Variables globales
let scene, camera, renderer, mesh;
let animationId;
let isAnimating = true;
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;
let stats = { fps: 60, triangles: 0 };

// Configuration
const config = {
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'],
    currentColorIndex: 0
};

// Loading Manager
const loadingManager = new THREE.LoadingManager();
const loadingScreen = document.getElementById('loading-screen');
const loadingProgress = document.getElementById('loading-progress');
const loadingText = document.getElementById('loading-text');
const app = document.getElementById('app');

loadingManager.onStart = () => {
    loadingText.textContent = 'Chargement des ressources...';
};

loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    const progress = (itemsLoaded / itemsTotal) * 100;
    loadingProgress.style.width = progress + '%';
    loadingText.textContent = `Chargement... ${Math.round(progress)}%`;
};

loadingManager.onLoad = () => {
    loadingText.textContent = 'Initialisation terminée';
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            app.style.display = 'block';
            app.classList.add('fade-in');
        }, 500);
    }, 500);
};

// Initialisation
function init() {
    // Scène
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1e3c72, 10, 50);

    // Caméra
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Renderer
    const canvas = document.getElementById('three-canvas');
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x1e3c72, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Géométrie principale - Tore Knot
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(config.colors[0]),
        shininess: 100,
        specular: 0x444444
    });
    
    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    // Éclairage
    setupLighting();

    // Particules d'arrière-plan
    createParticles();

    // Event listeners
    setupEventListeners();

    // Stats
    stats.triangles = geometry.attributes.position.count / 3;
    updateStats();

    // Animation loop
    animate();
}

function setupLighting() {
    // Lumière ambiante
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    // Lumière directionnelle
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Lumière colorée
    const pointLight = new THREE.PointLight(0x4ecdc4, 0.5, 50);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);
}

function createParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 50;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
}

function setupEventListeners() {
    // Redimensionnement
    window.addEventListener('resize', onWindowResize, false);

    // Mouvement de la souris
    document.addEventListener('mousemove', onMouseMove, false);

    // Contrôles
    document.getElementById('toggle-animation').addEventListener('click', toggleAnimation);
    document.getElementById('toggle-wireframe').addEventListener('click', toggleWireframe);
    document.getElementById('change-color').addEventListener('click', changeColor);
    document.getElementById('reset-camera').addEventListener('click', resetCamera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    targetRotationX = mouseY * 0.5;
    targetRotationY = mouseX * 0.5;
}

function toggleAnimation() {
    isAnimating = !isAnimating;
    const btn = document.getElementById('toggle-animation');
    btn.textContent = isAnimating ? '⏸️ Pause' : '▶️ Play';
}

function toggleWireframe() {
    mesh.material.wireframe = !mesh.material.wireframe;
    const btn = document.getElementById('toggle-wireframe');
    btn.textContent = mesh.material.wireframe ? '🔲 Solid' : '🔲 Wireframe';
}

function changeColor() {
    config.currentColorIndex = (config.currentColorIndex + 1) % config.colors.length;
    const newColor = new THREE.Color(config.colors[config.currentColorIndex]);
    
    // Animation de transition de couleur
    const startColor = mesh.material.color.clone();
    let progress = 0;
    
    function animateColor() {
        progress += 0.05;
        if (progress <= 1) {
            mesh.material.color.lerpColors(startColor, newColor, progress);
            requestAnimationFrame(animateColor);
        }
    }
    animateColor();
}

function resetCamera() {
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    targetRotationX = 0;
    targetRotationY = 0;
}

// FPS Counter
let lastTime = performance.now();
let frameCount = 0;

function updateStats() {
    const now = performance.now();
    frameCount++;
    
    if (now >= lastTime + 1000) {
        stats.fps = Math.round((frameCount * 1000) / (now - lastTime));
        document.getElementById('fps-counter').textContent = stats.fps;
        document.getElementById('triangle-count').textContent = Math.round(stats.triangles);
        
        frameCount = 0;
        lastTime = now;
    }
}

// Animation loop
function animate() {
    animationId = requestAnimationFrame(animate);
    
    updateStats();
    
    if (isAnimating) {
        // Rotation automatique
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        
        // Interaction souris (lissée)
        mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.05;
        mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.05;
        
        // Pulsation subtile
        const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
        mesh.scale.setScalar(scale);
    }
    
    renderer.render(scene, camera);
}

// Démarrage
init();

// Gestion des erreurs
window.addEventListener('error', (event) => {
    console.error('Erreur Three.js:', event.error);
});

console.log('🚀 OTN.World Three.js initialized!');
console.log('🎯 Repository: https://github.com/Mioona/otn.world');