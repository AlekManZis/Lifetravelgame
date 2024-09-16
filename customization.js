
const gameSettings = {
    player: {
        width: 50,
        height: 100,
        aspectRatio: 0.5,
        imageUrl: 'https://i.imgur.com/RtdISHR.png' 
    },
    obstacles: {
        car: {
            width: 50,
            height: 100,
            aspectRatio: 0.5,
            imageUrl: 'https://i.imgur.com/CBXxyli.png'
        },
        truck: {
            width: 60,
            height: 150,
            aspectRatio: 0.4,
            imageUrl: 'https://i.imgur.com/rH7O2ta.png'
        },
        hole: {
            width: 30,
            height: 30,
            aspectRatio: 1,
            imageUrl: 'https://i.imgur.com/ZRHqtfS.png'
        }
    },
    road: {
        imageUrl: 'https://i.imgur.com/b0K3pui.jpeg'
    },
    background: {
        imageUrl: 'https://i.imgur.com/3urQ4cc.jpeg'
    },
    bonuses: {
        scoreBoost: {
            width: 30,
            height: 30,
            aspectRatio: 1,
            imageUrl: 'https://i.imgur.com/hZAYLk7.png'
        },
        healthPack: {
            width: 30,
            height: 30,
            aspectRatio: 1,
            imageUrl: 'https://i.imgur.com/xBRd8TR.png'
        },
        speedBoost: {
            width: 30,
            height: 30,
            aspectRatio: 1,
            imageUrl: 'https://i.imgur.com/FcWwet9.png'
        },
        cashBonus: {
            width: 30,
            height: 30,
            aspectRatio: 1,
            imageUrl: 'https://i.imgur.com/hZAYLk7.png'
        }
    },
    effects: {
        smokeEffect: {
            width: 50,
            height: 50,
            aspectRatio: 1,
            imageUrl: 'https://i.imgur.com/d10DfnL.png'
        }
    },
    ads: {
        ad1: {
            width: 100,
            height: 50,
            imageUrl: 'https://i.imgur.com/fPzBf4z.png'
        },
        ad2: {
            width: 100,
            height: 50,
            imageUrl: 'https://i.imgur.com/kzz29P1.jpeg'
        }
    },
    sounds: {
        backgroundMusic: 'assets/sounds/background_music.mp3',
        crashSound: 'assets/sounds/crash.mp3',
        gameOverSound: 'assets/sounds/gameover.mp3',
        victorySound: 'assets/sounds/victory.mp3',
        holeHitSound: 'assets/sounds/hole_hit.mp3',
        powerUpSound: 'assets/sounds/powerup.mp3',
        speedBoostSound: 'assets/sounds/speed_boost.mp3',
        cashBonusSound: 'assets/sounds/cash_bonus.mp3'
    },
    totalDistance: 5000,
    maxDiscount: 15,
    baseReductionTimeFactor: 0.1,
    defaultLanguage: 'fr',
    player: {
        maxHealth: 100,
        speed: 5,
        slowdownFactor: 0.5,
        slowdownDuration: 1500
    },
    obstacles: {
        initialSpawnInterval: 2000,
        minSpawnInterval: 500,
        initialSpeed: 4,
        maxSpeed: 10,
        difficultyIncreaseRate: 0.95,
        speedIncreaseRate: 1.05,
        types: ['car', 'truck', 'hole']
    },
    bonuses: {
        spawnInterval: 7000,
        speedBoostMultiplier: 2,
        speedBoostDuration: 3000,
        types: ['scoreBoost', 'healthPack', 'speedBoost', 'cashBonus']
    },
    ads: {
        frequency: 10000
    }
};
