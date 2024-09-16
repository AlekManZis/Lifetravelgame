
let canvas, ctx;
let gameInterval, obstacleInterval, bonusInterval, adInterval, timerInterval;
let startTime, elapsedTime = 0;
let score = 0, distanceRemaining = gameSettings.totalDistance;
let player, obstacles = [], bonuses = [], ads = [];
let isGameOver = false, isSlowedDown = false;
let speedMultiplier = 1;

// Préchargement des ressources (images, sons, etc.)
const assets = {
    images: {},
    sounds: {}
};

// Fonction pour précharger les images
function preloadImages(imageUrls, callback) {
    let loadedImages = 0;
    const totalImages = imageUrls.length;

    imageUrls.forEach((url, index) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
                callback();
            }
        };
        assets.images[Object.keys(gameSettings)[index]] = img;
    });
}

// Liste des images à précharger
const imageUrls = Object.keys(gameSettings).map(category => gameSettings[category].imageUrl);

// Fonction principale de démarrage après le préchargement des images
function startAfterPreload() {
    init();
}

// Préchargement des images
preloadImages(imageUrls, startAfterPreload);

// Charger les sons
Object.keys(gameSettings.sounds).forEach(key => {
    assets.sounds[key] = new Audio(gameSettings.sounds[key]);
});

// Initialisation du jeu
function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    player = {
        width: gameSettings.player.width,
        height: gameSettings.player.height,
        x: canvas.width / 2 - gameSettings.player.width / 2,
        y: canvas.height - gameSettings.player.height - 10,
        speed: gameSettings.player.speed,
        health: gameSettings.player.maxHealth,
        dx: 0,
    };
    bindEvents();
    showTutorial();
}

// Liaison des événements (touches et boutons)
function bindEvents() {
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('left-button').addEventListener('touchstart', moveLeft);
    document.getElementById('right-button').addEventListener('touchstart', moveRight);
    document.getElementById('left-button').addEventListener('touchend', resetZoom);
    document.getElementById('right-button').addEventListener('touchend', resetZoom);
    document.getElementById('close-tutorial').addEventListener('click', closeTutorial);
    document.getElementById('share-button').addEventListener('click', shareOnFacebook);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
}

// Fonction pour réinitialiser le zoom après avoir appuyé sur les boutons de direction
function resetZoom() {
    setTimeout(function() {
        document.getElementById('left-button').style.transform = "scale(1)";
        document.getElementById('right-button').style.transform = "scale(1)";
    }, 500); // Retour à la taille initiale après 0.5 seconde
}

// Fonction de démarrage du jeu
function startGame() {
    document.getElementById('start-button').style.display = 'none'; // Cache le bouton "Démarrer"
    startTime = Date.now();
    gameInterval = requestAnimationFrame(updateGame);
    obstacleInterval = setInterval(spawnObstacle, gameSettings.obstacles.initialSpawnInterval);
    bonusInterval = setInterval(spawnBonus, gameSettings.bonuses.spawnInterval);
    adInterval = setInterval(spawnAd, gameSettings.ads.frequency);
    timerInterval = setInterval(updateTimer, 1000);
}

// Mise à jour du jeu
function updateGame() {
    if (isGameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le background
    drawBackground();

    // Dessiner la route avec un défilement en fonction de la vitesse du joueur
    drawRoad();

    // Mettre à jour les éléments du jeu (joueur, obstacles, bonus)
    updatePlayer();
    updateObstacles();
    updateBonuses();
    updateScore();

    requestAnimationFrame(updateGame);
}

// Dessiner le background
function drawBackground() {
    ctx.drawImage(assets.images.background, 0, 0, canvas.width, canvas.height);
}

// Dessiner la route avec un défilement
let roadY = 0;
function drawRoad() {
    let roadWidth = canvas.width * 0.8;
    let roadX = (canvas.width - roadWidth) / 2;
    roadY += player.speed * speedMultiplier;
    if (roadY >= canvas.height) roadY = 0;
    ctx.drawImage(assets.images.road, roadX, roadY, roadWidth, canvas.height);
    ctx.drawImage(assets.images.road, roadX, roadY - canvas.height, roadWidth, canvas.height);
}

// Gestion des obstacles et bonus
function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += gameSettings.obstacles.initialSpeed;
        if (obstacle.y > canvas.height) {
            obstacles.shift(); // Retirer les obstacles hors de l'écran
        } else {
            ctx.drawImage(assets.images[obstacle.type], obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
    });
}

function updateBonuses() {
    bonuses.forEach(bonus => {
        bonus.y += gameSettings.obstacles.initialSpeed;
        if (bonus.y > canvas.height) {
            bonuses.shift(); // Retirer les bonus hors de l'écran
        } else {
            ctx.drawImage(assets.images[bonus.type], bonus.x, bonus.y, bonus.width, bonus.height);
        }
    });
}

// Mise à jour du joueur
function updatePlayer() {
    player.x += player.dx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    ctx.drawImage(assets.images.player, player.x, player.y, player.width, player.height);
}

// Initialisation du jeu
