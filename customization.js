const gameSettings = {
    player: {
        width: 50,
        height: 100,
        aspectRatio: 0.5,
        imageUrl: 'https://i.imgur.com/RtdISHR.png', // Voiture du joueur
        maxHealth: 100, // Santé maximale
        speed: 5,       // Vitesse initiale du joueur
        slowdownFactor: 0.5,  // Facteur de ralentissement en cas d'impact
        slowdownDuration: 1500 // Durée du ralentissement
    },
    obstacles: {
        car: {
            width: 50,
            height: 100,
            aspectRatio: 0.5,
            imageUrl: 'https://i.imgur.com/CBXxyli.png' // Obstacles - voiture
        },
        truck: {
            width: 60,
            height: 150,
            aspectRatio: 0.4,
            imageUrl: 'https://i.imgur.com/rH7O2ta.png' // Obstacles - camion
        },
        hole: {
            width: 30,
            height: 30,
            aspectRatio: 1,
            imageUrl: 'https://i.imgur.com/ZRHqtfS.png' // Obstacles - nid-de-poule
        },
        initialSpawnInterval: 2000, // Intervalle initial de génération des obstacles (ms)
        minSpawnInterval: 500,      // Intervalle minimum entre les obstacles (ms)
        initialSpeed: 4,            // Vitesse initiale des obstacles
        maxSpeed: 10,               // Vitesse maximale des obstacles
        difficultyIncreaseRate: 0.95,  // Taux d'augmentation de la difficulté
        speedIncreaseRate: 1.05,    // Taux d'augmentation de la vitesse des obstacles
        types: ['car', 'truck', 'hole'] // Types d'obstacles disponibles
    },
    road: {
        imageUrl: 'https://i.imgur.com/b0K3pui.jpeg' // Image de la route
    },
    background: {
        imageUrl: 'https://i.imgur.com/3urQ4cc.jpeg' // Image de fond
    },
    bonuses: {
        scoreBoost: {
            width: 30,
            height: 30,
            aspectRatio: 1,
            imageUrl: 'https://i.imgur.com/hZAYLk7.png' // Bonus de score
        },
        healthPack: {
            width: 30,
            height: 30,
            aspectRatio: 1,
            imageUrl: 'https://i.imgur.com/xBRd8TR.png' // Pack de santé
        },
        speedBoost: {
            width: 30,
            height: 30,
            aspectRatio: 1,
            imageUrl: 'https://i.imgur.com/FcWwet9.png' // Bonus de vitesse
        },
        cashBonus: {
            width: 30,
            height: 30,
            aspectRatio: 1,
            imageUrl: 'https://i.imgur.com/hZAYLk7.png' // Bonus d'argent
        },
        spawnInterval: 7000, // Intervalle d'apparition des bonus
        speedBoostMultiplier: 2,  // Multiplicateur de vitesse pour le boost
        speedBoostDuration: 3000, // Durée du boost de vitesse
        types: ['scoreBoost', 'healthPack', 'speedBoost', 'cashBonus'] // Types de bonus
    },
    effects: {
        smokeEffect: {
            width: 50,
            height: 50,
            aspectRatio: 1,
            imageUrl: 'https://i.imgur.com/d10DfnL.png' // Effet de fumée
        }
    },
    ads: {
        ad1: {
            width: 100,
            height: 50,
            imageUrl: 'https://i.imgur.com/fPzBf4z.png' // Première publicité
        },
        ad2: {
            width: 100,
            height: 50,
            imageUrl: 'https://i.imgur.com/kzz29P1.jpeg' // Deuxième publicité
        },
        frequency: 10000 // Fréquence des publicités (ms)
    },
    sounds: {
        backgroundMusic: 'assets/sounds/background_music.mp3', // Musique de fond
        crashSound: 'assets/sounds/crash.mp3',                 // Son d'accident
        gameOverSound: 'assets/sounds/gameover.mp3',           // Son de fin de partie
        victorySound: 'assets/sounds/victory.mp3',             // Son de victoire
        holeHitSound: 'assets/sounds/hole_hit.mp3',            // Son lorsqu'un trou est touché
        powerUpSound: 'assets/sounds/powerup.mp3',             // Son de bonus
        speedBoostSound: 'assets/sounds/speed_boost.mp3',      // Son du boost de vitesse
        cashBonusSound: 'assets/sounds/cash_bonus.mp3'         // Son du bonus d'argent
    },
    totalDistance: 5000,      // Distance totale du jeu
    maxDiscount: 15,          // Réduction maximale à offrir
    baseReductionTimeFactor: 0.1,  // Facteur de réduction basé sur le temps
    defaultLanguage: 'fr'     // Langue par défaut
};
