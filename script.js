let canvas, ctx;
let gameInterval, obstacleInterval, bonusInterval, adInterval, timerInterval;
let startTime, elapsedTime = 0;
let score = 0, distanceRemaining = gameSettings.totalDistance;
let player, obstacles = [], bonuses = [], ads = [];
let isGameOver = false, isSlowedDown = false;
let speedMultiplier = 1;
let languageData = {};
let currentLanguage = gameSettings.defaultLanguage;

// Chargement des ressources (images, sons, etc.)
const assets = {
    images: {},
    sounds: {},
};

// Charger les images du jeu
Object.keys(gameSettings).forEach(category => {
    if (gameSettings[category].imageUrl) {
        assets.images[category] = new Image();
        assets.images[category].src = gameSettings[category].imageUrl;
    }
});

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
    document.getElementById('close-tutorial').addEventListener('click', closeTutorial);
    document.getElementById('share-button').addEventListener('click', shareOnFacebook);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
}

// Démarrage du jeu
function startGame() {
    document.getElementById('start-button').disabled = true;
    startTime = Date.now();
    assets.sounds.backgroundMusic.loop = true;
    assets.sounds.backgroundMusic.play();
    gameInterval = requestAnimationFrame(updateGame);
    obstacleInterval = setInterval(spawnObstacle, gameSettings.obstacles.initialSpawnInterval);
    bonusInterval = setInterval(spawnBonus, gameSettings.bonuses.spawnInterval);
    adInterval = setInterval(spawnAd, gameSettings.ads.frequency);
    timerInterval = setInterval(updateTimer, 1000);
}

// Mise à jour continue du jeu
function updateGame() {
    if (isGameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    movePlayer();
    drawPlayer();
    updateObstacles();
    updateBonuses();
    updateAds();
    checkCollisions();
    updateDistance();
    updateScore();
    updateHealthBar();
    checkGameOver();
    increaseDifficulty();
    gameInterval = requestAnimationFrame(updateGame);
}

// Dessiner l'arrière-plan
function drawBackground() {
    ctx.drawImage(assets.images.road, 0, 0, canvas.width, canvas.height);
}

// Déplacer le joueur
function movePlayer() {
    player.x += player.dx * speedMultiplier;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// Dessiner la voiture du joueur
function drawPlayer() {
    ctx.drawImage(assets.images.playerCar, player.x, player.y, player.width, player.height);
    if (player.health <= gameSettings.effects.smokeThreshold) {
        drawSmokeEffect();
    }
}

// Effet de fumée si la voiture est endommagée
function drawSmokeEffect() {
    ctx.drawImage(assets.images.smokeEffect, player.x, player.y - 20, 50, 50);
}

// Générer un obstacle
function spawnObstacle() {
    const lanePositions = [canvas.width * 0.25 - 25, canvas.width * 0.5 - 25, canvas.width * 0.75 - 25];
    const laneIndex = Math.floor(Math.random() * lanePositions.length);
    const obstacleType = gameSettings.obstacles.types[Math.floor(Math.random() * gameSettings.obstacles.types.length)];
    const obstacle = {
        x: lanePositions[laneIndex],
        y: -100,
        width: 50,
        height: obstacleType === 'hole' ? 30 : 100,
        speed: gameSettings.obstacles.initialSpeed * speedMultiplier,
        type: obstacleType,
    };
    obstacles.push(obstacle);
}

// Mettre à jour les obstacles
function updateObstacles() {
    obstacles.forEach((obs, index) => {
        obs.y += obs.speed;
        let image = (obs.type === 'car') ? assets.images.obstacleCar : (obs.type === 'truck') ? assets.images.obstacleTruck : assets.images.hole;
        ctx.drawImage(image, obs.x, obs.y, obs.width, obs.height);
        if (obs.y > canvas.height) {
            obstacles.splice(index, 1);
        }
    });
}

// Générer un bonus
function spawnBonus() {
    const lanePositions = [canvas.width * 0.25 - 15, canvas.width * 0.5 - 15, canvas.width * 0.75 - 15];
    const laneIndex = Math.floor(Math.random() * lanePositions.length);
    const bonusType = gameSettings.bonuses.types[Math.floor(Math.random() * gameSettings.bonuses.types.length)];
    const bonus = {
        x: lanePositions[laneIndex],
        y: -50,
        width: 30,
        height: 30,
        speed: 4,
        type: bonusType,
    };
    bonuses.push(bonus);
}

// Mettre à jour les bonus
function updateBonuses() {
    bonuses.forEach((bonus, index) => {
        bonus.y += bonus.speed;
        let image = assets.images[`bonus${capitalize(bonus.type)}`];
        ctx.drawImage(image, bonus.x, bonus.y, bonus.width, bonus.height);
        if (bonus.y > canvas.height) {
            bonuses.splice(index, 1);
        }
    });
}

// Générer des panneaux publicitaires
function spawnAd() {
    const ad = {
        x: Math.random() > 0.5 ? 10 : canvas.width - 110,
        y: Math.random() * (canvas.height - 100),
        width: 100,
        height: 50,
    };
    ads.push(ad);
    setTimeout(() => {
        ads.shift();
    }, 5000);
}

// Mettre à jour les panneaux publicitaires
function updateAds() {
    ads.forEach(ad => {
        // Choisir aléatoirement entre différentes bannières publicitaires
        const adClass = Math.random() > 0.5 ? 'ad1' : 'ad2';
        ctx.drawImage(document.querySelector(`.${adClass}`).style.backgroundImage, ad.x, ad.y, ad.width, ad.height);
    });
}

// Vérifier les collisions avec les bonus et jouer les sons
function checkCollisions() {
    bonuses.forEach((bonus, index) => {
        if (isColliding(player, bonus)) {
            if (bonus.type === 'speedBoost') {
                assets.sounds.speedBoostSound.play(); // Jouer le son du boost de vitesse
                applySpeedBoost();
            } else if (bonus.type === 'cashBonus') {
                assets.sounds.cashBonusSound.play(); // Jouer le son du bonus d'argent/coupon
                score += 100; // Exemple d'augmentation du score avec le bonus cash
            } else {
                assets.sounds.powerUpSound.play(); // Son générique pour les autres bonus
            }
            bonuses.splice(index, 1);
        }
    });
}

// Appliquer le boost de vitesse
function applySpeedBoost() {
    speedMultiplier = gameSettings.bonuses.speedBoostMultiplier;
    setTimeout(() => {
        speedMultiplier = 1;
    }, gameSettings.bonuses.speedBoostDuration);
}

// Vérifier si le jeu est terminé
function checkGameOver() {
    if (player.health <= 0) {
        gameOver(false);
    } else if (distanceRemaining <= 0) {
        gameOver(true);
    }
}

// Fin du jeu
function gameOver(won) {
    isGameOver = true;
    cancelAnimationFrame(gameInterval);
    clearInterval(obstacleInterval);
    clearInterval(bonusInterval);
    clearInterval(adInterval);
    clearInterval(timerInterval);
    assets.sounds.backgroundMusic.pause();
    
    if (won) {
        assets.sounds.victorySound.play();
        showEndModal(won);
    } else {
        assets.sounds.gameOverSound.play();
        alert(languageData['game_over']);
        location.reload(); // Recharger la page pour recommencer
    }
}

// Affichage du modal de fin de partie avec le bouton de partage
function showEndModal(won) {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');

    if (won) {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        const baseReduction = Math.min(gameSettings.maxDiscount, (gameSettings.maxDiscount - timeTaken * gameSettings.baseReductionTimeFactor));
        const finalDiscount = Math.max(0, baseReduction);

        document.getElementById('discount-message').textContent = `Réduction obtenue : ${finalDiscount}%`;
        document.getElementById('share-button').setAttribute('data-discount', finalDiscount);
    }
}

// Fonction de partage sur Facebook
function shareOnFacebook() {
    const discount = document.getElementById('share-button').getAttribute('data-discount');
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`J'ai obtenu un score de ${score} et une réduction de ${discount}% dans le jeu de course vers les Chutes d'Ekom Nkam !`)}`;
    window.open(fbShareUrl, '_blank');

    document.getElementById('success-modal').classList.remove('hidden');
    document.getElementById('final-discount-message').textContent = `Merci pour le partage ! Vous avez une réduction de ${discount}%.`;
}

// Mettre à jour la distance restante
function updateDistance() {
    distanceRemaining -= (player.speed * speedMultiplier) / 60; // Distance parcourue à chaque frame
    document.getElementById('distance').textContent = Math.max(0, Math.floor(distanceRemaining));
    if (distanceRemaining <= 0) {
        gameOver(true);
    }
}

// Mettre à jour le score
function updateScore() {
    score += 1; // Le score augmente à chaque mise à jour du jeu
    document.getElementById('score').textContent = score;
}

// Mise à jour de la barre de santé
function updateHealthBar() {
    const healthPercentage = (player.health / gameSettings.player.maxHealth) * 100;
    document.getElementById('health-bar').style.width = healthPercentage + '%';
    if (healthPercentage > 50) {
        document.getElementById('health-bar').style.backgroundColor = '#4CAF50';
    } else if (healthPercentage > 20) {
        document.getElementById('health-bar').style.backgroundColor = '#FFA500';
    } else {
        document.getElementById('health-bar').style.backgroundColor = '#FF0000';
    }
}

// Augmenter la difficulté au fur et à mesure du jeu
function increaseDifficulty() {
    if (gameSettings.obstacles.initialSpawnInterval > gameSettings.obstacles.minSpawnInterval) {
        gameSettings.obstacles.initialSpawnInterval *= gameSettings.obstacles.difficultyIncreaseRate;
    }
    if (gameSettings.obstacles.initialSpeed < gameSettings.obstacles.maxSpeed) {
        gameSettings.obstacles.initialSpeed *= gameSettings.obstacles.speedIncreaseRate;
    }
}

// Mise à jour du timer
function updateTimer() {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Gestion des collisions
function isColliding(a, b) {
    return !(
        a.x > b.x + b.width ||
        a.x + a.width < b.x ||
        a.y > b.y + b.height ||
        a.y + a.height < b.y
    );
}

// Gestion du déplacement vers la gauche
function moveLeft() {
    player.dx = -player.speed;
}

// Gestion du déplacement vers la droite
function moveRight() {
    player.dx = player.speed;
}

// Gestion des événements clavier pour déplacer le joueur
function keyDown(e) {
    if (e.key === 'ArrowLeft') {
        moveLeft();
    } else if (e.key === 'ArrowRight') {
        moveRight();
    }
}

function keyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        player.dx = 0;
    }
}

// Afficher le tutoriel au début du jeu
function showTutorial() {
    document.getElementById('tutorial').classList.remove('hidden');
}

// Fermer le tutoriel
function closeTutorial() {
    document.getElementById('tutorial').classList.add('hidden');
}

// Appliquer les traductions en fonction de la langue
function applyTranslations() {
    document.querySelectorAll('[data-lang]').forEach(elem => {
        const key = elem.getAttribute('data-lang');
        if (languageData[key]) {
            elem.textContent = languageData[key];
        }
    });
}

// Initialisation du jeu
init();
