const gameSettings = {
    player: {
        width: 50,
        height: 100,
        aspectRatio: 0.5, // Ratio largeur/hauteur
        imageUrl: 'https://i.imgur.com/RtdISHR.png' // URL de l'image de la voiture du joueur
    },
    obstacles: {
        car: {
            width: 50,
            height: 100,
            aspectRatio: 0.5, // Ratio 50/100
            imageUrl: 'https://i.imgur.com/CBXxyli.png' // URL de l'image d'une voiture obstacle
        },
        truck: {
            width: 60,
            height: 150,
            aspectRatio: 0.4, // Ratio 60/150
            imageUrl: 'https://i.imgur.com/rH7O2ta.png' // URL de l'image d'un camion obstacle
        },
        hole: {
            width: 30,
            height: 30,
            aspectRatio: 1, // Ratio 1:1 pour un nid de poule
            imageUrl: 'https://i.imgur.com/ZRHqtfS.png' // URL de l'image d'un nid de poule
        }
    },
    road: {
        imageUrl: 'https://i.imgur.com/b0K3pui.jpeg'  // Ajouter cette ligne pour la route
    },
    background: {
        imageUrl: 'https://i.imgur.com/3urQ4cc.jpeg'  // Ajouter cette ligne pour le background
    },
    bonuses: {
        scoreBoost: {
            width: 30,
            height: 30,
            aspectRatio: 1, // Ratio carré
            imageUrl: 'https://i.imgur.com/hZAYLk7.png' // URL pour un bonus d'augmentation de score
        },
        healthPack: {
            width: 30,
            height: 30,
            aspectRatio: 1, // Ratio carré
            imageUrl: 'https://i.imgur.com/xBRd8TR.png' // URL pour un bonus de pack de santé
        },
        speedBoost: {
            width: 30,
            height: 30,
            aspectRatio: 1, // Ratio carré
            imageUrl: 'https://i.imgur.com/FcWwet9.png' // URL pour un bonus de boost de vitesse
        },
        cashBonus: {
            width: 30,
            height: 30,
            aspectRatio: 1, // Ratio carré
            imageUrl: 'https://i.imgur.com/hZAYLk7.png' // URL pour un bonus d'argent ou coupon
        }
    },
    road: {
        width: 800,
        height: 600,
        aspectRatio: 1.33, // Ratio 4:3 pour l'arrière-plan de la route
        imageUrl: 'https://i.imgur.com/b0K3pui.jpeg' // URL de l'image de la route
    },
    effects: {
        smokeEffect: {
            width: 50,
            height: 50,
            aspectRatio: 1, // Ratio 1:1
            imageUrl: 'https://i.imgur.com/d10DfnL.png' // URL pour l'effet de fumée lorsque la voiture est endommagée
        }
    },
    ads: {
        ad1: {
            width: 100,
            height: 50,
            imageUrl: 'https://i.imgur.com/fPzBf4z.png' // Publicité LifeTravel
        },
        ad2: {
            width: 100,
            height: 50,
            imageUrl: 'https://i.imgur.com/kzz29P1.jpeg' // Publicité secondaire (autre publicité)
        }
    },
    sounds: {
        backgroundMusic: 'assets/sounds/background_music.mp3', // Musique de fond du jeu
        crashSound: 'assets/sounds/crash.mp3', // Son d'accident
        gameOverSound: 'assets/sounds/gameover.mp3', // Son lorsque la partie est perdue
        victorySound: 'assets/sounds/victory.mp3', // Son lorsque la partie est gagnée
        holeHitSound: 'assets/sounds/hole_hit.mp3', // Son lorsque la voiture touche un nid de poule
        powerUpSound: 'assets/sounds/powerup.mp3', // Son général pour les bonus
        speedBoostSound: 'assets/sounds/speed_boost.mp3', // Son spécifique pour le boost de vitesse
        cashBonusSound: 'assets/sounds/cash_bonus.mp3' // Son spécifique pour le bonus d'argent/coupon
    },
    totalDistance: 5000, // Distance totale à parcourir
    maxDiscount: 15, // Réduction maximale en pourcentage
    baseReductionTimeFactor: 0.1, // Facteur de réduction du pourcentage par seconde
    defaultLanguage: 'fr', // Langue par défaut
    player: {
        maxHealth: 100, // Santé maximale du joueur
        speed: 5, // Vitesse du joueur
        slowdownFactor: 0.5, // Facteur de ralentissement quand la voiture touche un nid de poule
        slowdownDuration: 1500 // Durée en ms du ralentissement
    },
    obstacles: {
        initialSpawnInterval: 2000, // Intervalle de spawn des obstacles au début
        minSpawnInterval: 500, // Intervalle minimum entre les spawns des obstacles
        initialSpeed: 4, // Vitesse des obstacles au début
        maxSpeed: 10, // Vitesse maximale des obstacles
        difficultyIncreaseRate: 0.95, // Facteur de réduction de l'intervalle de spawn au fur et à mesure
        speedIncreaseRate: 1.05, // Facteur d'augmentation de la vitesse des obstacles
        types: ['car', 'truck', 'hole'] // Types d'obstacles disponibles
    },
    bonuses: {
        spawnInterval: 7000, // Intervalle de spawn des bonus
        speedBoostMultiplier: 2, // Multiplicateur de vitesse du boost de vitesse
        speedBoostDuration: 3000, // Durée en ms du boost de vitesse
        types: ['scoreBoost', 'healthPack', 'speedBoost', 'cashBonus'] // Types de bonus disponibles
    },
    ads: {
        frequency: 10000 // Fréquence d'apparition des publicités
    }
};
