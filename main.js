// Rules of the "Dragon Game", it's you vs the dragon
// Beginning of the game you equip a weapon
// weapons are magical, and can be either ice, fire or lightning

// Beginning of the game a random dragon will show up
// The dragon will have a type: ice, fire, or lightning 

// the hero and the dragon will take turns attacking each other (via attack button)
// Attack damage depends on the type of weapon and the type of dragon

// The hero and the dragon both have health points, 100 and 120 respectively

// BONUS GOAL: implement critical hits

var types = ["fire", "ice","lightning"];

var state = {
    player: {
        hp:100,
        weaponType: null
    }, 
    dragon: {
        hp: 120,
        dragonType: types[ Math.floor( Math.random() * 3 ) ]
    },
    playerNeedsToPickWeapon: true,
    isGameOver: false
}

function renderGame() {
    var gameHTML = `
        <h1>This is the game for now...
        </h1>
    `
    if (state.playerNeedsToPickWeapon) {
        gameHTML = renderPickWeaponScreen();
    } else if (!state.isGameOver) {
        gameHTML = renderAttackScreen();
    } else {
        gameHTML = renderGameOverScreen();
    }

    document.getElementById('game').innerHTML = gameHTML;
}

renderGame();

function pickWeapon() {
    console.log('picking a weapon')

    state.player.weaponType = type;
    state.playerNeedsToPickWeapon = false;

    renderGame();
}



function renderPickWeaponScreen() {
    var weaponScreenHTML = `
        <p>Choose Your Weapon</p>
        <button onclick="pickWeapon('ice')">ice</button>
        <button onclick="pickWeapon('fire')">fire</button>
        <button onclick="pickWeapon('lightning')">lightning</button>
    `;
    return weaponScreenHTML;
}

function attack() {


    if (state.player.weaponType == "fire") {
        if (state.dragon.dragonType == "fire") {
            state.player.hp -= 20;
            state.dragon.hp -= 20;

        } else if (state.dragon.dragonType == "ice") {
            state.player.hp -= 10;
            state.dragon.hp -= 30;

        } else if (state.dragon.dragonType == "lightning") {
            state.player.hp -= 30;
            state.dragon.hp -= 10;
        }

    } else if (state.player.weaponType == "ice") {
        if (state.dragon.dragonType == "fire") {
            state.player.hp -= 30;
            state.dragon.hp -= 10;

        } else if (state.dragon.dragonType == "ice") {
            state.player.hp -= 20;
            state.dragon.hp -= 20;

        } else if (state.dragon.dragonType == "lightning") {
            state.player.hp -= 10;
            state.dragon.hp -= 30;
        }
    } else if (state.player.weaponType == "lightning") {
        if (state.dragon.dragonType == "fire") {
            state.player.hp -= 10;
            state.dragon.hp -= 30;

        } else if (state.dragon.dragonType == "ice") {
            state.player.hp -= 30;
            state.dragon.hp -= 10;

        } else if (state.dragon.dragonType == "lightning") {
            state.player.hp -= 20;
            state.dragon.hp -= 10;
        }
    }

    state.player.hp -= 20;
    state.dragon.hp -= 20;

    if (state.player.hp <= 0 || state.dragon.hp <= 0) {
        state.isGameOver = true;
    }

    renderGame();
}

function renderAttackScreen() {
    var attackScreenHTML = `
    <h1>Player</h1>
    <p>Weapon Type: ${state.player.weaponType}</p>
    <p>Health: ${state.player.hp} </p>
    <h1>Dragon </h1>
    <p>Type: ${state.dragon.dragonType}</p>
    <p>Health: ${state.dragon.hp}</p>
    <button onclick="attack()"> Attack </button>
    `
    return attackScreenHTML;
}

function renderGameOverScreen() {

    if (state.dragon.hp <= 0) {
        gameOverScreenHTML = `<p>game over you win!!</p>`
    } else if (state.player.hp <= 0) {
        gameOverScreenHTML = `<p>game over you lose!!</p>`

    }
    var gameOverScreenHTML = `<p>Game Over</p>`;
    return gameOverScreenHTML;
}



