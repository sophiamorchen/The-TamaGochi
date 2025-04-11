/* 
États de notre Tamastudi possibles :
- 🥚 : partie non lancée
- 🐣 : naissance pendant tant qu'il n'a pas fait son 1er caca
Ensuite il devient un "grand" avec une humeur variable
- 😢 : triste 0/5
- 🙁 : pas content 1/5
- 🙂 : normal 2/5
- 😄 : content 3/5
- 🤗 : heureux 4/5
- 🥰 : très heureux 5/5
- 👻 : mort 0/5
Ses envies :
- 😋 : faim, aléatoire minimum 30 sec et max 3 minutes
- 🥱 : jouer, aléatoire minimum 30 sec et max 3 minutes
- 💩 : caca, aléatoire minimum 30 sec et max 1.30 minutes uniquement après avoir mangé
*/

const myTama = {
    name: "",
    alive: false,
    fed: 0,
    playfull: 0,
    cleaned: 0,
    lifeDuration: 0,
    desire: "",
};

/* PHASE 0 : activer le tamaStudi
1) cliquer sur le bouton du milieu
2) Ajouter un comp^teur qui attend d'avoir une valeur de 5
3) alors on fait naitre notre tama
*/
const start = () => {
    // 1) cliquer sur le bouton du milieu
    const buttonCenter = document.querySelector(
        '.js-button[data-direction="center"]'
    );
    // 2) Ajouter un compteur qui attend d'avoir une valeur de 5
    let count = 0;
    buttonCenter.addEventListener("click", () => {
        count++;
        // 3) alors on fait naitre notre tama
        if (count === 5) {
            birth(); //
        }
    });
};

/*
PHASE 1 : naissance de mon tama
1) demander le nom de mon personnage 
2) faire éclore mon oeuf pour passer au poussin
3) affiche mes vitals
4) afficher le mom de mon tama dans les vitals
5) mettre le score des vitals a 5
*/
const birth = () => {
    /* 1) demander le prénom*/
    myTama.name = prompt("Quel nom a votre tamastudi?");
    /* 2) fait éclore mon oeuf pour passer au poussin*/
    // const character = document.querySelector(".js-character");
    // character.textContent = "🐣";
    showInScreen("🐣");
    // 3) affiche mes vitals
    const vitals = document.querySelector(".js-vitals");
    vitals.classList.remove("hidden");
    // 4) affiche le nom de mon tama dans les vitals
    const nameDisplay = document.querySelector(".js-tamaName");
    nameDisplay.textContent = myTama.name;
    // 5) afficher les score des vitals a 5
    const defaultScore = 5;
    myTama.fed = defaultScore;
    myTama.playfull = defaultScore;
    myTama.cleaned = defaultScore;
    updateVitals();
    // 6) afficher les actions
    const actions = document.querySelector(".js-actions");
    actions.classList.remove("hidden");
    // apple de la fonction pour le faire "grandir"
    evolve();
    // 9) Calcul de la durée de vie 
    myTama.alive = true;
    calcLifeDuration();


};

/* PHASE 2 : l'évolution de mon tama
1) Attendre que notre tamaStudi ait une "premiere envie"
2) Et il devient grand
*/
const evolve = () => {
    // 1) Attendre que notre tamaStudi ait une "premiere envie"
    const functionToExecute = () => {
        mood();
        cycleOfAdultLife()
    };
    wantsTo(functionToExecute);
};

/* LES ENVIES 
- 😋 : faim, aléatoire minimum 30 sec et max 3 minutes
- 🥱 : jouer, aléatoire minimum 30 sec et max 3 minutes
- 💩 : caca, aléatoire minimum 30 sec et max 1.30 minutes uniquement après avoir mangé
1) Créer une fonction qu'on va pouvoir appeler dans notre code
2) Stockerles envies de mon tama dans une variable
3) Avec un setTimeout, choisir une envie aléatoire.
4) Durée du setTmeout: dynamique/parametrable (est comprise entre une valeur max et une valeur min)
5) Afficher l'envie de mon tama dans le DOM
6) Envie de faire caca ne peut etre faite que si il a deja mangé
*/

const wantsTo = (callBack) => {
    const minDuration = 1000;
    const maxDuration = 3000;
    const duration = getRandomInt({
        min: minDuration,
        max: maxDuration,
    });
    setTimeout(() => {
        const needs = ["😋", "🥱", "💩"];
        const randomIndexNeeds = getRandomInt({
            max: needs.length,
        });
        const desire = needs[randomIndexNeeds];
        if (callBack) {
            callBack(desire);
        } else {
            showInScreen(desire, true);
        }
    }, duration);
};

/* HUMEUR GENERALE
Une fonction qui calcule la moyenne des 3 indicateurs: faim, jouer, propreté
- Et affiche cette moyenne dans les vitals 
*/
const mood = () => {
    // Partie 1 : affichage numerique
    const sum = myTama.cleaned + myTama.fed + myTama.playfull;
    const average = sum / 3;
    const rounded = Math.round(average);
    const displayMood = document.querySelector('.js-mood');
    displayMood.textContent = rounded;
    /* Partie 2 : affichage visuel
    - 😢 : triste 0/5
    - 🙁 : pas content 1/5
    - 🙂 : normal 2/5
    - 😄 : content 3/5
    - 🤗 : heureux 4/5
    - 🥰 : très heureux 5/5
    - 👻 : mort 0/5 */
    const listOfEmoji = ["😢", "🙁", "🙂", "😄", "🤗", "🥰"]
    showInScreen(listOfEmoji[rounded]);
    // Partie 3 : est ce qu'il est mort 
    if (rounded === 0) {
        myTama.alive = false
    }
}

/* DUREE DE VIE :
Une focntion qui, toutes les minutes, met a jour la durée de vie du Tama
 */
const calcLifeDuration = () => {
    const duration = 60_000;
    const displayLifeDuration = document.querySelector('.js-life-duration');
    setInterval(() => {
        myTama.lifeDuration++;
        displayLifeDuration.textContent = myTama.lifeDuration;
    }, duration);
};
/* GESTION DE VIE "ADULTE3
- Notre Tama a une humeur général
- Cette humeur est la moyenne de 3 indictauers
=> mood()
- Ces indicateurs évoluent avec le temps
=> A faire
- De temps à autre notre Tama a une "envie"
=> wantsTo()
- Si on ne répond pas à cette envie dans les temps
- L'indictauer associé diminue
- Sinon 
- L'indicateur augmente
=> A faire
- Et ça continue jusqu'a ce que notre Tama meurt
=> A faire
 */
const cycleOfAdultLife = () => {
    if (myTama.alive) {

        // 1)  Ces indicateurs évoluent avec le temps
        // - De temps à autre notre Tama a une "envie"
        const functionToExecute = (desire) => {
            console.log("envie générée", desire);
            showInScreen(desire, true);
            myTama.desire = desire
            waitForAction()
        }
        wantsTo(functionToExecute);
    } else {
        showInScreen('👻')
    }
}
let timeoutWaitForAction = null
const waitForAction = () => {
    console.log('WAIT 5 SEC');
    timeoutWaitForAction = setTimeout(() => {
        manageIndicators(myTama.desire, false)
        showInScreen("", true)
        cycleOfAdultLife()
    }, 5000)
}
const buttonsAction = document.querySelectorAll('.js-button-action')
buttonsAction.forEach(button => {
    button.addEventListener('click', () => {
        const associateDesire = button.getAttribute('data-desire')
        const tamaDesireString = translateEmoji(myTama.desire)
        const isGoodButton = tamaDesireString === associateDesire
        if (isGoodButton) {
            clearTimeout(timeoutWaitForAction)
            manageIndicators(myTama.desire, isGoodButton)
            cycleOfAdultLife()
        }
    });
});
const translateEmoji = (emoji) => {
    let word = ''
    if (emoji === '😋') word = 'eat'
    else if (emoji === '🥱') word = 'play'
    else if (emoji === '💩') word = 'clean'
    return word
}

const manageIndicators = (desire, hasSucceeded) => {
    const numberToAdd = hasSucceeded ? 1 : -1;
    const calculName = hasSucceeded ? 'addition' : 'substraction';
    if (desire === "😋" && verifyIndicatorBeforeCalcul(myTama.fed, calculName)) {
        myTama.fed += numberToAdd;
    }
    else if (desire === "🥱" && verifyIndicatorBeforeCalcul(myTama.playfull, calculName)) {
        myTama.playfull += numberToAdd;
    }
    else if (desire === "💩" && verifyIndicatorBeforeCalcul(myTama.cleaned, calculName)) {
        myTama.cleaned += numberToAdd;
    }
    updateVitals();
    mood();
    if (hasSucceeded) {
        showInScreen('', true);
    }

};
const verifyIndicatorBeforeCalcul = (value, calcul) => {

    if (calcul === 'addition') {
        return value < 5;
    }
    else {
        return value > 0;
    }
}



const updateVitals = () => {
    // Affiche les viatls dans les indicateurs
    const displayIndicatorEat = document.querySelector('.js-score--eat');
    displayIndicatorEat.textContent = myTama.fed;
    const displayIndicatorPlay = document.querySelector('.js-score--play');
    displayIndicatorPlay.textContent = myTama.playfull;
    const displayIndicatorClean = document.querySelector('.js-score--clean');
    displayIndicatorClean.textContent = myTama.cleaned;
}



// Toutes ces modifs sont faites car j'utilise une fonction sur plusieurs autres fonctions.
// Je vais donc la rendre "globale" pour pouvoir l'utiliser dans d'autres fonctions
// Je vais donc lui passer un objet pour pouvoir lui passer plusieurs paramètres
// Dont un cas où je n'aurais pas de valeur minimum
/* Fonction qui retourne un nombe aléatoire compris entre un min et un max*/
const getRandomInt = (props) => {
    // ceci est la facon raccourcie:
    // let { max, min } = props;
    // console.log(min);
    // console.log(max);
    // ceci est la facon longue:
    // on déstructure l'objet props pour en sortir les valeurs max et min
    const max = props.max;
    // Ternaire = condition "raccourcie" = condition ? valeur si oui: valeur si non
    const min = props.min ? props.min : 0;
    return Math.floor(Math.random() * (max - min) + min);
};

// Fonction que gère l'affichage des emoticones dans le DOM
const character = document.querySelector('.js-character');
const desire = document.querySelector('.js-desire');
const showInScreen = (display, isDesire) => {
    if (isDesire) {
        desire.textContent = display;
    }
    else {
        character.textContent = display;
    }
};

// Lance la fonction de "début de mon tama"
start();
