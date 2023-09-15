
const formLogin = document.querySelector(".login-form");

const editionDiv = document.querySelector(".edition-mode");
const changementsBaliseP = document.querySelector(".changement-edition");
const navClassEdition = document.querySelector(".nav-index");

async function loginSubmit(event) {
    event.preventDefault();
    // Variables qui contiennent les valeurs rentrées dans le formulaire de connexion de la page.
const userEmail = document.getElementById("email").value;
const userPassword = document.getElementById("password").value;

  // Envoi par fetch vers l'API des valeurs rentrées dans le formulaire
fetch("http://localhost:5678/api/users/login", {

method: "POST",

headers: { "Content-Type": "application/json"

},

body: JSON.stringify({

    email: userEmail,

    password: userPassword,

    })
})

//Traitement de la réponse et comportement en cas de champs vide/ erreur dans les données entrées
.then ((response) => {
    /////////// si données entrées sont correctes : ///////
    if (response.ok) {

    // Ajouter le display des classes en mode edition
    // editionDiv.classList.(".edition-mode");
    // changementsBaliseP.classList.(".changement-text");
    // navClassEdition.classList.(".nav-index");

    return response.json();

////////// Comportement en cas de champs vide : /////////
    } else if (response.status !== 200 && (!userEmail || !userPassword)) {
        document.querySelector(".error-message").innerHTML = "Saisissez un identifiant ET un mot de passe."

////////// Comportement en cas d'erreur dans les données entrées dans les 2 champs de saisie //////
    } else if (response.status !== 200 && userEmail && userPassword) {
        console.log("error");

        document.querySelector(".error-message").innerHTML = "Erreur dans l'identifiant ou le mot de passe."
     }
})
.then ((userInfo) => {
    sessionStorage.setItem("sessionUserInfo", userInfo.token);
    window.location.href="../html/index.html";
})

}
// exécution de la fonction "loginSubmit" au champs "input type=submit" du formulaire de login
formLogin.addEventListener("submit", loginSubmit);


// Retrait du Token, du mode édition, et du "Logout" pour retour à "Login" dans le nav"
const logoutToken = document.getElementById("logout");
    logoutToken.addEventListener("click", function (event) {

        event.preventDefault();
        window.sessionStorage.removeItem("sessionUserInfo");

        // editionDiv.classList.remove(".edition-mode");
        // changementsBaliseP.classList.remove(".changement-text");
        // navClassEdition.classList.remove(".nav-index")
    });


//email: sophie.bluel@test.tld
//password: S0phie 