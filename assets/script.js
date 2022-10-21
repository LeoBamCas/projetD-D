
//variables

const api = 'https://www.dnd5eapi.co/api/monsters'
let randomMonster;
const monsterName = document.querySelector("#monsterName");
const danger = document.querySelector('#danger');
const xp = document.querySelector('#xp');
const encore = document.querySelector('#encore');
const teamCrowd = document.querySelector('#teamCrowd');
const teamCrowdCheck = document.querySelector('#teamCrowdCheck');
const pjLevel = document.querySelector('#pjLevel');
const encounterLevel = document.querySelector('#encounterLevel');
const boutonPC = document.querySelectorAll('.boutonPC');
const result = document.querySelector('#result');
let PC = [
    [15,25,32,45,70,90,105,130,135,140,160,180,200,210,225,240,285,300,330,370],
    [25,40,60,80,120,140,160,180,200,210,240,270,310,330,360,400,480,510,600,700],
    [33,55,80,100,160,185,210,240,265,280,350,395,465,515,565,610,695,730,800,900],
    [40,70,100,120,200,230,260,300,330,350,460,520,620,700,770,820,910,950,1000,11000]
]

//création des différents champs d'input afin de receuillir les données pour filtrer les rencontres

//premier champ : le nombre de joueur, avec la génération d'un nombre d'input de niveaux corrélés au nombre de PJ

teamCrowdCheck.addEventListener('click', function(e){
    e.preventDefault()
    let newForm;
    for(let i = 0; i< parseInt(teamCrowd.value); i++){
        newForm =  document.createElement('form');
        pjLevel.appendChild(newForm);
        let newInput = document.createElement('input');
        newInput.id = `pjLevelCheck${i}`;
        newForm.appendChild(newInput)
    }
    let newButton = document.createElement('button')
    newButton.id = `pjLevelCheckButton`;
    newButton.textContent = 'on y est presque !'
    newForm.appendChild(newButton)
    pjLevel.classList.remove('hidden')

//on a fait apparaître la section pjLevel, maintenant on utilise le bouton pjLevelButton afin de faire apparaître l'avant dernière section

    newButton.addEventListener('click', function(e){
        e.preventDefault()
        encounterLevel.classList.remove('hidden');
    })


})

//crée une fonction qui va chercher dans l'API un monstre aléatoire et en traite les données
const start =  function(){
    randomMonster = Math.floor(Math.random()*333);
    //on va chercher aléatoirement un monstre
    
    fetch(api).then(handleFetch);
    
    function handleFetch(responseText){
        if (responseText.ok){
            responseText.json()
                        .then(displayMonsterInfo)
                        .catch(error=>console.log(error));
        }else{
            console.log(responseText.statusText);
        }
    }
    
    //on en affiche le nom
    
    const displayMonsterInfo = (data)=>{
    
        monsterName.textContent = data.results[randomMonster].name;
        const monsterIndex = data.results[randomMonster].index;
        const monsterInfos = `https://www.dnd5eapi.co/api/monsters/${monsterIndex}`
    
        //on récupére son index puis on va chercher son challenge_rating
    
        fetch(monsterInfos).then(travailFetch);
    
        function travailFetch(responseText){
            if (responseText.ok){
                responseText.json()
                            .then(displayChallengInfo)
                            .catch(error=>console.log(error));
            }else{
                console.log(responseText.statusText);
            }
    
        }
    
        const displayChallengInfo = (data)=>{
            danger.textContent = data.challenge_rating;
            xp.textContent = data.xp;
    
        }
    }

}
start()

//bouton de redémarrage

encore.addEventListener('click', function(e){
    e.preventDefault();
    start();
})


// affichage du résultat

for (const bouton of boutonPC){
    bouton.addEventListener('click', function(e){
        e.preventDefault();
        result.classList.remove('hidden')

    })
}