
//variables

const api = 'https://www.dnd5eapi.co/api/monsters'
let randomMonster;
const monsterName = document.querySelector("#monsterName");
const danger = document.querySelector('#danger');
const xp = document.querySelector('#xp');
const encore = document.querySelector('#encore');

//crée une fonction de départ et redémarrage
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

encore.addEventListener('click', function(e){
    e.preventDefault();
    start();
})


