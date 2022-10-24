
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
const randomMonsterSection = document.querySelector('#randomMonsterSection');
const pjNumber = document.querySelector('#pjNumber');
const difCheck = document.querySelector('#difCheck');
const easy = document.querySelector('#easy');
const average = document.querySelector('#average');
const hard = document.querySelector('#hard');
const veryHard = document.querySelector('#veryHard');
const selectedMonsterName = document.querySelector('#selectedMonsterName');
const selectedMonsterDanger = document.querySelector('#selectedMonsterDanger');
const selectedMonsterXp = document.querySelector('#selectedMonsterXp');
const selectedMonsterPc = document.querySelector('#selectedMonsterPc');
let difIndice;
let pjTeam;
let totalPcPj = 0;
let minusPcPj = 0;
let PC = [
    [15,25,32,45,70,90,105,130,135,140,160,180,200,210,225,240,285,300,330,370],
    [25,40,60,80,120,140,160,180,200,210,240,270,310,330,360,400,480,510,600,700],
    [33,55,80,100,160,185,210,240,265,280,350,395,465,515,565,610,695,730,800,900],
    [40,70,100,120,200,230,260,300,330,350,460,520,620,700,770,820,910,950,1000,11000]
]
let tableauSelected= [];



// on fait un tableau avec tous les index de l'API
let tableauIndex = []

fetch(api).then(handleFetch);
    
function handleFetch(responseText){
    if (responseText.ok){
        responseText.json()
                    .then(fillTableau)
                    .catch(error=>console.log(error));
    }else{
        console.log(responseText.statusText);
    }
}
const fillTableau = function(data){
    for(i = 0; i< data.results.length;i++){
        tableauIndex.push(data.results[i].index);
    }
}
// on crée une fonction qui tranform les display challenge en PC

function dcToPc(dc){
    switch (dc){
        case 0:
            return 1;
            break;
        case 0.125:
            return 5;
            break;
        case 0.25:
            return 9;
            break;
        case 0.5:
            return 15;
            break;
        case 1:
            return 25;
            break;
        case 2:
            return 40;
            break;
        case 3:
            return 60;
            break;
        case 4:
            return 85;
            break;
        case 5:
            return 110;
            break;
        case 6:
            return 135;
            break;
        case 7:
            return 160;
            break;
        case 8:
            return 185;
            break;
        case 9:
            return 210;
            break;
        case 10:
            return 230;
            break;
        case 11:
            return 265;
            break;
        case 12:
            return 300;
            break;
        case 13:
            return 330;
            break;
        case 14:
            return 370;
            break;
        case 15:
            return 420;
            break;
        case 16:
            return 475;
            break;
        case 17:
            return 525;
            break;
        case 18:
            return 620;
            break;
        case 19:
            return 675;
            break;
        case 20:
            return 770;
            break;
        case 21:
            return 870;
            break;
        case 22:
            return 995;
            break;
        case 23:
            return 1100;
            break;
        case 24:
            return 1240;
            break;
        case 25:
            return 1450;
            break;
        case 26:
            return 1700;
            break;
        case 27:
            return 1950;
            break;
        case 28:
            return 2200;
            break;
        case 29:
            return 2450;
            break;
        case 30:
            return 2700;
            break;
    }
}

// on commence par demander un niveau de difficulté et récupérer l'indice dont on a besoin via checkbox



difCheck.addEventListener('click', function(e){
    e.preventDefault();
    if (easy.checked){
        difIndice = easy.value;
    
    }else if(average.checked){
        difIndice = average.value;
    }else if (hard.checked){
        difIndice = hard.value;
    }else if(veryHard.checked){
        difIndice = veryHard.value;
    }
        pjNumber.classList.remove('hidden');
        pjNumber.classList.add('apparition');
        pjNumber.classList.add('pjNumber');
    })
    


//second champ : le nombre de joueur, avec la génération d'un nombre d'input de niveaux corrélés au nombre de PJ

teamCrowdCheck.addEventListener('click', function(e){
    e.preventDefault()
    let newForm;
    pjTeam =  parseInt(teamCrowd.value);
    for(let i = 0; i< parseInt(teamCrowd.value); i++){
        newForm =  document.createElement('form');
        pjLevel.appendChild(newForm);
        let newLabel = document.createElement('label');
        newLabel.for = `pjLevelCheck${i}`;
        newLabel.textContent = `niveau du personnage joueur ${i+1}`;
        newForm.appendChild(newLabel);
        let newInput = document.createElement('input');
        newInput.value = 5;
        newInput.type = "number";
        newInput.id = `pjLevelCheck${i}`;
        newInput.classList.add('pjLevelInput');
        newForm.appendChild(newInput);
    }
    let newButton = document.createElement('button');
    newButton.id = `pjLevelCheckButton`;
    newButton.textContent = 'on y est presque !';
    pjLevel.appendChild(newButton);
    pjLevel.classList.remove('hidden');
    pjLevel.classList.add('pjLevel')
    pjLevel.classList.add('apparition');

//on a fait apparaître la section pjLevel, maintenant on utilise le bouton pjLevelButton afin de faire apparaître la section résultats et calculet le totalPcPj

    newButton.addEventListener('click', function(e){
        const pjLevelInput = document.querySelectorAll('.pjLevelInput')
        e.preventDefault()
        for(const pjLevelIn of pjLevelInput){
            let PcPj = (PC[difIndice][parseInt(pjLevelIn.value)-1])/4;
            totalPcPj += PcPj;
            if(difIndice>0){
                minusPcPj += (PC[difIndice -1][parseInt(pjLevelIn.value)-1])/4;
            }
        }


//fonction pour trier les monstres de l'API et les stocker dans un tableau au clic

        fetch(api).then(handleFetch);
            
        function handleFetch(responseText){
            if (responseText.ok){
                responseText.json()
                            .then(filterMonstersIndex)
                            .catch(error=>console.log(error));
            }else{
                console.log(responseText.statusText);
            }
        }
        //on filtre les monstres parmis lesquels faire une selection aléatoire en plaçant les objets dans un tableau
        const filterMonstersIndex = (data) =>{
            
            for (const monster of data.results){
                let index = monster.index
                const monsterInfos = `https://www.dnd5eapi.co/api/monsters/${index}`
                fetch(monsterInfos).then(travailFetch);
    
        function travailFetch(responseText){
            if (responseText.ok){
                responseText.json()
                            .then(pushMonsterInfos)
                            .catch(error=>console.log(error));
            }else{
                console.log(responseText.statusText);
            }
    
        }

        const pushMonsterInfos = (data) => {
            if(dcToPc(data.challenge_rating)>= minusPcPj && dcToPc(data.challenge_rating)<= totalPcPj){
                tableauSelected.push(data);
            }
        }
                
            }
            // on affiche les infos d'une entrée du tableau selectionné aléatoire
            console.log(tableauSelected);
            console.log(Math.floor(Math.random()*tableauSelected.length));
            console.log(tableauSelected.length);
            let selectedMonster = tableauSelected[Math.floor(Math.random()*tableauSelected.length)];
            selectedMonsterName.textContent = selectedMonster.name;
            selectedMonsterDanger.textContent = 'id : ' +selectedMonster.challenge_rating;
            selectedMonsterPc.textContent = 'pc :' + dcToPc(selectedMonster.challenge_rating);
            selectedMonsterXp.textContent = 'xp :' + selectedMonster.xp;
            
        }
        result.classList.remove('hidden');
        result.classList.add('apparition');
        result.classList.add('result');

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
            danger.textContent = 'Indice de danger : ' + data.challenge_rating;
            xp.textContent = "points d'expérience : " +data.xp;
    
        }
    }

}
start()

//bouton de redémarrage

encore.addEventListener('click', function(e){
    e.preventDefault();
    start();
})

