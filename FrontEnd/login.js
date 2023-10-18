/////// a rajouter le display none de la section de filtres une fois le mode user connecté

const editionDiv = document.querySelector(".edition-mode");
const logoutNav = document.querySelector(".logout");
const loginNav = document.querySelector(".login")

// infos token sous forme d'objet
let  sessionUserInfo = {
    key : "userToken", 
    value : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MzkyNDc3NywiZXhwIjoxNjk0MDExMTc3fQ.n4Dx8KrQVIonAm6tvYYl4L6k3MIhihM-CVNMk5CC5iU",
}

async function loginSubmit(event) {
    event.preventDefault();

    // Variables qui contiennent les valeurs rentrées dans le formulaire de connexion de la page
const userEmail = document.getElementById("email").value;
const userPassword = document.getElementById("password").value;

////////////// Envoi par fetch vers l'API des valeurs rentrées dans le formulaire
 fetch("http://localhost:5678/api/users/login", {

method: "POST",

headers: { "Content-Type": "application/json"

},

body: JSON.stringify({

    email: userEmail,

    password: userPassword,

    })
})

/////////// Traitement de la réponse et comportement en cas de champs vide/ erreur dans les données entrées
.then ((response) => {

    /////////// si données entrées sont correctes : ///////
    if (response.ok) {      

    console.log(response);

// Ajout/modification du display des classes en mode edition 

if (logoutNav)  {
    logoutNav.style.display ="unset";
}  
 if (loginNav) {
    loginNav.style.display ="none"
 }   

 /////// retour vers page d'accueil en mode connecté
//  window.location.href = "index.html";

 if (editionDiv) {   
    editionDiv.style.visibility ="visible";
}

return response.json();  

////////// Comportement en cas de champs vide : /////////
    } else if (response.status !== 200 && (!userEmail || !userPassword)) {
        document.querySelector(".error-message").innerHTML = "Saisissez un identifiant et un mot de passe."

////////// Comportement en cas d'erreur dans les données entrées dans les 2 champs de saisie //////
    } else if (response.status !== 200 && userEmail && userPassword) {
        console.log("error");

        document.querySelector(".error-message").innerHTML = " ! Erreur dans l'identifiant ou le mot de passe !"
     }

    })

.then ((userInfo) => {  
    
    let getToken = window.localStorage.getItem(sessionUserInfo);   

    if (getToken === null) {
        console.log ("Token manquant, rajout au local storage");
        window.localStorage.setItem(sessionUserInfo.key, sessionUserInfo.value);     

    } else (
        console.log("Token déjà présent")
    )   
     console.log(userInfo);
        
    })

}
// exécution de la fonction "loginSubmit" au champs "input type=submit" du formulaire de login
let formLogin = document.querySelector(".login-form");

if (formLogin) {
    formLogin.addEventListener("submit", loginSubmit)        
    }
/////// IDS DE CONNEXION email: sophie.bluel@test.tld password: S0phie 

 // Retrait du Token, du mode édition, et du "Logout" pour retour à "Login" dans le nav"
    logoutNav.addEventListener("click", (event) => {
        
        event.preventDefault();
        window.localStorage.removeItem(sessionUserInfo.key);
    
         //Retirer le display des classes en mode edition
         if (editionDiv) {
            editionDiv.style.visibility ="hidden";
         }
         if (logoutNav) {
            logoutNav.style.display ="none";
         }
        if (loginNav) {
            loginNav.style.display ="unset";
        }                   
    })