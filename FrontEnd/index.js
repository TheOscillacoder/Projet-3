    async function genererProjets(IdCategory = 0) {
             const reponse = await fetch("http://localhost:5678/api/works");
              const projets = await reponse.json();
        
              const sectionProjets = document.querySelector(".gallery");

                nettoyage(sectionProjets);
// création des conteneurs des projets de la galerie
                 for (let i = 0; i < projets.length; i++) {

        const figureElement = document.createElement("figure");
            figureElement.setAttribute("id", projets[i].id);
            figureElement.setAttribute("idCategory", projets[i].categoryId);
                    // lorsque le paramètre en argument IdCategory est différent de 0 :                    
                    // si IdCategory est différent de la valeur de categoryId de chaque projet,
                    // alors la figure ne s'affiche pas
                     if (IdCategory != 0) {
                            if (IdCategory != projets[i].categoryId) {
                          figureElement.style.display = "none";          
                       }
                   }
// création des éléments de chaque projet de la galerie
                    const imageElement = document.createElement("img");        
                        imageElement.setAttribute("src", projets[i].imageUrl);
                        imageElement.setAttribute("alt", projets[i].title);     
            
                    const nomElement = document.createElement("figcaption");
                        nomElement.textContent = projets[i].title;
// ajout des éléments créés de chaque projet à son conteneur       
                    figureElement.append(imageElement);
                    figureElement.append(nomElement); 
// ajout du projet à la gallerie 
                    sectionProjets.append(figureElement); 
                  }
                  
                  console.log(projets); 
              }

genererProjets();

function nettoyage(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

 async function categorieFiltre () {
     const reponse = await fetch ("http://localhost:5678/api/categories");
    let projetCategorie = await reponse.json();

        const filterDiv = document.querySelector(".filters");
        const filterGroup = document.querySelector(".category-filters");        
        const ProjetGroup = document.querySelector(".gallery");

        // Ajout du bouton "Tous"        
       const filterAll = document.createElement("button");
       filterAll.innerText = "Tous";

       filterGroup.appendChild(filterAll);      

       filterAll.addEventListener(
        "click",  () => {
            genererProjets()
        }
        )        
        // générer un bouton par catégorie avec leur nom respectif
         for (let i = 0; i < projetCategorie.length; i++) {
      const filterItem = document.createElement("button");
      filterItem.innerText = projetCategorie[i].name;  

      filterGroup.appendChild(filterItem);
      filterItem.addEventListener(
        "click", () => {
            genererProjets(projetCategorie[i].id);
        }
      )
      }
    
         }        

     categorieFiltre();         

let modal = null
//const focusableSelector = "button, a, input, textarea"
//let focusables = []
//let previouslyFocusedElement = null

const openModal = function (event) {
    event.preventDefault()
    const target = document.querySelector(event.target.getAttribute("href"))
    if (target) {
    target.style.display = null
    }
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
    modal = target
    modal.addEventListener("click", closeModal) 
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", closeModal)
    }

    const closeModal = function (event) {
        if (modal === null) return
    event.preventDefault()

    target.style.display = "none";
    target.setAttribute("aria-hidden", true)
    target.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal) 
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", closeModal)
    modal = null
    }
    
    document.querySelectorAll(".js-modal").forEach(a => {
        a.addEventListener("click", openModal)        
    })

    const stopPropagation = function (event) {
        event.stopPropagation()
    }
    
 window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event)
    }
    if(event.key === "tab" && modal !== null){
        focusInModal(event)
    }
})    
    // focusables = Array.from(modal.querySelectorAll(focusableSelector))
    // previouslyFocusedElement = document.querySelector(":focus") 
    // focusables[0].focus()
    // cible l'attribut style="display" écris précédemment dans le fichier index.html
    //modal.style.display = "none"

     // cible l'attribut arial-hidden écris précédemment dans le fichier index.html
    //modal.removeAttribute("aria-hidden")
    //modal.setAttribute("aria-modal", "true")

    //modal.addEventListener("click", closeModal)
    //modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    //modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)


//const closeModal = function(event) {
    //if (modal === null) return
    // if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    //event.preventDefault()
    // window.setTimeout(function () {
    //     modal.style.display = "none"
    // }, 500)

    //modal.style.display = "none"
    //modal.setAttribute("aria-hidden", true)
    //modal.removeAttribute("aria-modal")
    //modal.removeEventListener("click", closeModal)

    //modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    //modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)    
//}




// const focusInModal = function (event) {
//     event.preventDefault()
    
//     let index = focusables.findIndex(f => f === modal.querySelector(":focus"))
//     if (event.shiftkey === true) {
//         index--
//     } else {
//         index++
//     }
    
//     if (index >= focusables.length) {
//         index = 0
//     }
//     if (index < 0) {
//         index = focusables.length - 1
//     }

//     focusables[index].focus()
// }

// document.querySelectorAll(".modal-js").forEach(a => {
//     a.addEventListener("click", openModal)   
// })




//document.querySelector(".modal").addEventListener("click", openModal);



// Fonction pour générer la galerie de la modale (reprise de page index)


async function genererProjetsModale(IdCategory = 0) {
    const reponse = await fetch("http://localhost:5678/api/works");
     const projets = await reponse.json();

     const modalProjets = document.querySelector(".modal-gallery");

       nettoyage(modalProjets);

// création des conteneurs des projets de la galerie
        for (let i = 0; i < projets.length; i++) {

const figureElement = document.createElement("figure");
    figureElement.setAttribute("id", projets[i].id);
    figureElement.setAttribute("IdCategory", projets[i].categoryId);

// création des éléments de chaque projet de la galerie
const imageElement = document.createElement("img");        
    imageElement.setAttribute("src", projets[i].imageUrl);
    imageElement.setAttribute("alt", projets[i].title);
               
 const deleteProjetDiv = document.createElement("div");
     deleteProjetDiv.classList.add("modalProjetImgdiv");
const deleteTrashButton = document.createElement("button");                    
    deleteTrashButton.classList.add("deleteButtonModal");
const deleteTrashIcon = document.createElement("i");
    deleteTrashIcon.classList.add("fa-solid","fa-trash-can")               
                    
const allbuttonDelete = document.querySelectorAll(".deleteButtonModal");                

for (let i = 0 ; i < allbuttonDelete.length; i++) {
    allbuttonDelete[i].addEventListener("click", (event) => {
        const buttonDelete = allbuttonDelete[i]; 
                          
    event.preventDefault();
    console.log("clické");
                           
    let clickBouton = event.target;
    let figureWork = buttonDelete.closest("figure");
    let figureWorkId = figureWork.id;

        if (clickBouton = buttonDelete) {

        console.log(figureWorkId);                             

        fetch (`http://localhost:5678/api/works/${figureWorkId}`, {
            method: "DELETE",
            headers: {
            accept: "*/*",
            'Authorization': `Bearer ${getsessionUserInfo}`,
                            },
                    })
                         
        .then ((response) => {
            if (response.ok) {                                
                console.log(response);
                console.log("suppression de l'élément de la base de donnée réussi");
            } else if (response.status !== 200 && response.status === 401) {
                        console.log("erreur de suppression du projet, requête utilisateur non autorisée, authentification utilisateur requise")
                        }        
            else if (response.status !== 200 && response.status === 501) {
                        console.log("erreur de suppression du projet, comportement inhabituel")
                        }
                })
                         }
                        })
                    }   
// ajout des éléments créés de chaque éléments du projet à son conteneur
    deleteProjetDiv.append(imageElement);
    deleteProjetDiv.append(deleteTrashButton);
        deleteTrashButton.append(deleteTrashIcon);
        

    figureElement.appendChild(deleteProjetDiv);


// ajout du projet à la gallerie 
            modalProjets.append(figureElement); 
         }
         
         console.log(projets); 
     }

genererProjetsModale();

function nettoyage(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// ELEMENTS A FAIRE DISPARAITRE POUR PASSER A LA MODALE AJOUT PHOTO

let modalGalleryTitle = document.querySelector(".modal-title-gallery");
let modalGallery = document.querySelector(".modal-gallery");
let modalPhotoButton = document.querySelector(".bouton-modal-galerie-photo");

//ELEMENTS ELEMENTS A FAIRE APPARAITRE POUR PASSER A LA MODALE AJOUT PHOTO

let modalArrow = document.querySelector(".modal-arrow");
let modalPhotoTitle = document.querySelector(".modal-title-photos");
let modalContent = document.querySelector(".modal-content");
let modalRectangle = document.querySelector(".modal-rectangle");
let modalForm = document.querySelector(".form-modal");
let modalValiderButton = document.querySelector(".bouton-modal-valider");

////////////////////////////////////////////////////////////////////////////

    modalPhotoButton.addEventListener("click", (event) => {
    
        event.preventDefault();

        //ELEMENTS A FAIRE DISPARAITRE

        if (modalGalleryTitle) {
            modalGalleryTitle.style.display = "none"
        }
        if (modalGallery) {
            modalGallery.style.display = "none"
        }
        if (modalPhotoButton)
            modalPhotoButton.style.display = "none"

        //ELEMENTS A FAIRE APPARAITRE

        if (modalArrow) {
            modalArrow.style.visibility = "visible"
        }        
        if (modalPhotoTitle) {
            modalPhotoTitle.style.display = "unset"
        }
        if (modalContent) {
            modalContent.style.display = "flex"
        }
        if (modalRectangle) {
            modalRectangle.style.display = "flex"
        }
        if (modalForm) {
            modalForm.style.display = "flex"
        }
        
        if (modalValiderButton) {
            modalValiderButton.style.display = "unset"
        }
})


modalArrow.addEventListener("click", (event) => {

    event.preventDefault();
    //ELEMENTS A FAIRE DISPARAITRE

    if (modalArrow) {
        modalArrow.style.visibility = "hidden"
    }        
    if (modalPhotoTitle) {
        modalPhotoTitle.style.display = "none"
    }
    if (modalContent) {
        modalContent.style.display = "none"
    }
    if (modalRectangle) {
        modalRectangle.style.display = "none"
    }
    if (modalForm) {
        modalForm.style.display = "none"
            }
    
    if (modalValiderButton) {
        modalValiderButton.style.display = "none"
    }

    //ELEMENTS A FAIRE APPARAITRE

    if (modalGalleryTitle) {
        modalGalleryTitle.style.display = "unset"
    }
    if (modalGallery) {
        modalGallery.style.display = "flex"
    }
    if (modalPhotoButton)
        modalPhotoButton.style.display = "unset"
})
////////////////// FORMULAIRE CATEGORIES/////////////////////////////////////////////////



async function categorieModale () {
    
let modalInputCategory = document.getElementById("categorie");
    const categoryFetch = await fetch ("http://localhost:5678/api/categories");
   let modalCategoryList = await categoryFetch.json();  
    let noneDefault = document.createElement("option");
    noneDefault.innerText = "...";
    noneDefault.value = "0";
    modalInputCategory.append(noneDefault);

    if (categoryFetch.ok) {   
 for (let i = 0; i < modalCategoryList.length; i++) {
 let categoryOption = document.createElement("option");
  let idNumber = modalCategoryList[i].id;

     categoryOption.innerText = modalCategoryList[i].name; 
     categoryOption.value = idNumber;
     
     modalInputCategory.append(categoryOption);
    }
}        
}
categorieModale();

////////////////////////////////// AJOUTER PROJET///////////////////////////////////////


function PreviewandUploadProjet () {

let modalFormTitle = document.getElementById("titre");
let fileCategory =  document.getElementById("categorie");
let formModal = document.querySelector(".form-modal");
const inputFile = document.querySelector("input[type=file]");
const previewImage = document.querySelector(".preview-picture-modale");

inputFile.addEventListener("change", () => {
const file = inputFile.files[0];
if (file) {
    
    const fileReader = new FileReader();  

    fileReader.onloadend = () => {         
    previewImage.src = fileReader.result;
}
    fileReader.readAsDataURL(file)
}
})

 if (formModal) {
formModal.addEventListener("submit", (event) => {
    console.log("bouton cliqué")
    event.preventDefault();  

const loadedFile = inputFile.files[0];
let modalFormTitleValue = modalFormTitle.value;
let fileCategoryValue = Number(fileCategory.value);

if ((loadedFile && modalFormTitleValue && fileCategoryValue)) {
    modalValiderButton.style.backgroundColor  = "#1D6154";
}

const formData = new FormData();

formData.append("image", loadedFile);
formData.append("title", modalFormTitleValue);
formData.append("category", fileCategoryValue);

//             
//         }  ////////// Comportement en cas de champs vide : /////////
 if ((!modalFormTitleValue || !fileCategoryValue || !loadedFile)) {
        throw new error("Choisissez un fichier photo ET saisissez un titre ET choisissez une catégorie à votre projet.");
 }
        
    fetch ("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
       Authorization: `Bearer ${getsessionUserInfo}`,         
    },
    body: formData
    })
/////////// Traitement de la réponse et comportement en cas de champs vide/ erreur dans les données entrées
.then ((response) => {
    console.log(response.status)
    /////////// si données entrées sont correctes : ///////
    if (response.ok) {      

    console.log(response);
    console.log("Ajout du projet à la base de donnée réussi !")
return response.json();      
////////// Comportement en cas d'erreur dans les données entrées dans les 2 champs de saisie //////
    } else {
        throw new Error("Erreur dans la requête d'upload du projet")
    }
    })
    .catch((error) => {
        alert("Erreur serveur : " + error.message)
    })
   
})
}
}