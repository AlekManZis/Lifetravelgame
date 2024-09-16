let canvas, ctx;
let gameInterval, obstacleInterval, bonusInterval, adInterval, timerInterval;
let startTime, elapsedTime = 0;
let score = 0, distanceRemaining = gameSettings.totalDistance;
let player, obstacles = [], bonuses = [], ads = [];
let isGameOver = false, isSlowedDown = false;
let speedMultiplier = 1;

const assets = {
    images: {},
    sounds: {}
};

// Charger les images du jeu
function loadAssets() {
    let totalImages = Object.keys(gameSettings).length;
    let loadedImages = 0;

    Object.keys(gameSettings).forEach(category => {
        if (gameSettings[category].imageUrl) {
            let img = new Image();
            img.src = gameSettings[category].imageUrl;
            img.onload = () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                    init(); // Toutes les images sont chargées, démarrer le jeu
                }
            };
            assets.images[category] = img;
        }
    });
}

// Initialiser le jeu
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
        dx: 0,  // Mouvement horizontal (gauche/droite)
    };
    bindEvents();
    showTutorial();  // Afficher le tutoriel au démarrage
}

// Liaison des événements (touches et boutons)
function bindEvents() {
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('left-button').addEventListener('touchstart', moveLeft);
    document.getElementById('right-button').addEventListener('touchstart', moveRight);
    document.getElementById('left-button').addEventListener('touchend', resetMovement);
    document.getElementById('right-button').addEventListener('touchend', resetMovement);
    document.getElementById('close-tutorial').addEventListener('click', closeTutorial);
    document.getElementById('share-button').addEventListener('click', shareOnFacebook);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
}

// Réinitialiser le mouvement après avoir relâché les boutons de direction
function resetMovement() {
    player.dx = 0;
}

// Démarrer le jeu
function startGame() {
    document.getElementById('start-button').style.display = 'none';  // Masquer le bouton "Démarrer"
    document.getElementById('tutorial').style.display = 'none';      // Masquer le tutoriel
    startTime = Date.now();
    gameInterval = requestAnimationFrame(updateGame);
    obstacleInterval = setInterval(spawnObstacle, gameSettings.obstacles.initialSpawnInterval);
    bonusInterval = setInterval(spawnBonus, gameSettings.bonuses.spawnInterval);
    adInterval = setInterval(spawnAd, gameSettings.ads.frequency);
    timerInterval = setInterval(updateTimer, 1000);  // Met à jour le timer chaque seconde
}

// Mise à jour du jeu à chaque image
function updateGame() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Effacer le canvas

    drawBackground();
    drawRoad();

    // Mettre à jour et dessiner les éléments du jeu
    updatePlayer();
    updateObstacles();
    updateBonuses();
    updateScore();

    requestAnimationFrame(updateGame);
}

// Mise à jour du joueur
function updatePlayer() {
    player.x += player.dx;  // Mouvement horizontal
    if (player.x < 0) player.x = 0;  // Limite à gauche
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;  // Limite à droite

    ctx.drawImage(assets.images.player, player.x, player.y, player.width, player.height);  // Dessiner le joueur
}

// Mise à jour des obstacles
function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += gameSettings.obstacles.initialSpeed;
        if (obstacle.y > canvas.height) {
            obstacles.shift();  // Supprimer l'obstacle s'il sort de l'écran
        } else {
            ctx.drawImage(assets.images[obstacle.type], obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
    });
}

// Mise à jour des bonus
function updateBonuses() {
    bonuses.forEach(bonus => {
        bonus.y += gameSettings.obstacles.initialSpeed;
        if (bonus.y > canvas.height) {
            bonuses.shift();  // Supprimer le bonus s'il sort de l'écran
        } else {
            ctx.drawImage(assets.images[bonus.type], bonus.x, bonus.y, bonus.width, bonus.height);
        }
    });
}

// Affichage du score et des informations
function updateScore() {
    score += 1;  // Incrémentation du score
    document.getElementById('score').innerText = score;
    distanceRemaining -= player.speed * speedMultiplier;
    document.getElementById('distance').innerText = Math.max(0, distanceRemaining);
}

// Timer du jeu
function updateTimer() {
    let currentTime = Date.now();
    elapsedTime = (currentTime - startTime) / 1000;  // Temps écoulé en secondes
    document.getElementById('timer').innerText = formatTime(elapsedTime);
}

// Formater le temps (en minutes et secondes)
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return minutes + ":" + (secs < 10 ? "0" : "") + secs;
}

// Dessiner le fond
function drawBackground() {
    ctx.drawImage(assets.images.background, 0, 0, canvas.width, canvas.height);
}

// Dessiner la route
let roadY = 0;
function drawRoad() {
    let roadWidth = canvas.width * 0.8;
    let roadX = (canvas.width - roadWidth) / 2;
    roadY += player.speed * speedMultiplier;
    if (roadY >= canvas.height) roadY = 0;
    ctx.drawImage(assets.images.road, roadX, roadY, roadWidth, canvas.height);
    ctx.drawImage(assets.images.road, roadX, roadY - canvas.height, roadWidth, canvas.height);
}

// Générer un obstacle
function spawnObstacle() {
    let obstacleType = gameSettings.obstacles.types[Math.floor(Math.random() * gameSettings.obstacles.types.length)];
    let obstacle = {
        type: obstacleType,
        x: Math.random() * (canvas.width - gameSettings.obstacles[obstacleType].width),
        y: -gameSettings.obstacles[obstacleType].height,
        width: gameSettings.obstacles[obstacleType].width,
        height: gameSettings.obstacles[obstacleType].height,
    };
    obstacles.push(obstacle);
}

// Générer un bonus
function spawnBonus() {
    let bonusType = gameSettings.bonuses.types[Math.floor(Math.random() * gameSettings.bonuses.types.length)];
    let bonus = {
        type: bonusType,
        x: Math.random() * (canvas.width - gameSettings.bonuses[bonusType].width),
        y: -gameSettings.bonuses[bonusType].height,
        width: gameSettings.bonuses[bonusType].width,
        height: gameSettings.bonuses[bonusType].height,
    };
    bonuses.push(bonus);
}

// Générer une publicité (optionnel, peut être désactivé)
function spawnAd() {
    let ad = {
        x: Math.random() * (canvas.width - 100),
        y: -50,
        width: 100,
        height: 50,
        imageUrl: gameSettings.ads.ad1.imageUrl
    };
    ads.push(ad);
    setTimeout(() => { ads.shift(); }, 10000);  // Supprimer la pub après 10 secondes
}

// Gestion des touches de direction (clavier)
function keyDown(e) {
    if (e.key === 'ArrowLeft') {
        moveLeft();
    } else if (e.key === 'ArrowRight') {
        moveRight();
    }
}

// Réinitialiser le mouvement lors du relâchement des touches
function keyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        resetMovement();
    }
}

// Déplacer à gauche
function moveLeft() {
    player.dx = -player.speed;
}

// Déplacer à droite
function moveRight() {
    player.dx = player.speed;
}

// Afficher le tutoriel au début du jeu
function showTutorial() {
    document.getElementById('tutorial').classList.remove('hidden');
}

// Fermer le tutoriel
function closeTutorial() {
    document.getElementById('tutorial').classList.add('hidden');
}

// Partager sur Facebook (implémentation optionnelle)
function shareOnFacebook() {
    // Logique de partage à implémenter
    alert("Partage sur Facebook");
}

// Charger les ressources et initialiser le jeu
loadAssets();
