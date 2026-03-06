//Fetch des donnéées depuis l'API
async function fetchWorkData() {
    const response = await fetch ("http://localhost:5678/api/works")
    return response.json()
}

// Nettoyage des works en double générés au clics sur les filtres
 function nettoyage(element) {
     while (element.firstChild) {
         element.removeChild(element.firstChild);
     }
 }
// Filtrage des works en fonction de l'id catégory, si 0 ==> all 
function filterWorks(works, idCategory = 0) {
if (idCategory === 0)  {
    return works;
}
else {
    return works.filter(work => work.categoryId === idCategory)
}
}

// Génération de galerie de la page d'accueil
async function homeWorkGallery(containerSelector, idCategory = 0) {
    const workGallery = document.querySelector(containerSelector);

    if (!workGallery) {
        console.error(`conteneur introuvable avec le sélecteur "${containerSelector}"`);
        return;
    }
      nettoyage(workGallery);
// utilisation de la fonction précédente fetchWorkData (pour fetch les works depuis l'api
              const works = await fetchWorkData();
              const filteredWorks = filterWorks(works, idCategory)
// création des conteneurs des projets de la galerie avec méthode forEach

            filteredWorks.forEach(work => {
        const figureElement = document.createElement("figure");
            figureElement.setAttribute("id", work.id);
            figureElement.setAttribute("idCategory", work.categoryId);
            

// création des éléments composant chaque work de la galerie
            const imageElement = document.createElement("img");        
                imageElement.setAttribute("src", work.imageUrl);
                imageElement.setAttribute("alt", work.title);  
                figureElement.append(imageElement);                     
// condition différence affichage informations homegallery/modal-gallery
                        if (containerSelector === ".gallery") {
                        const nomElement = document.createElement("figcaption");
                        nomElement.textContent = work.title;
                        figureElement.append(nomElement); 
                        }

                // ajout du projet à la galerie 
                workGallery.append(figureElement); 
                console.log(works); 

                })

}                                 
    //Execution de la fonction avec les paramètres définis que l'on souhaite afficher : conteneur de destination et contenu
    homeWorkGallery(".gallery", 0);

// Génération de galerie de la modale
async function modalWorkGallery(idCategory = 0) {
//réutilisation de la première fonction de génération de galerie
    await homeWorkGallery(".modal-gallery", idCategory);

    const modalGallery = document.querySelector(".modal-gallery");
// création des éléments spécifique composant cette version de la galerie
    modalGallery.querySelectorAll("figure").forEach (figure => {
        const imageElement = figure.querySelector("img");

    const deleteProjetDiv = document.createElement("div");
        deleteProjetDiv.classList.add("modalProjetImgdiv");

    const deleteTrashButton = document.createElement("button");                    
        deleteTrashButton.classList.add("deleteButtonModal");

    const deleteTrashIcon = document.createElement("i");
        deleteTrashIcon.classList.add("fa-solid","fa-trash-can")               
       

// ajout des éléments créés de chaque éléments du projet à son conteneur
    deleteProjetDiv.append(imageElement);
    deleteTrashButton.append(deleteTrashIcon);
    deleteProjetDiv.append(deleteTrashButton);   
    figure.appendChild(deleteProjetDiv);
       
    
// ajout fonctionnement Requête DELETE pour suppression work
    const allbuttonDelete = document.querySelectorAll(".deleteButtonModal");                

    console.log(allbuttonDelete)
    allbuttonDelete.forEach(buttonDelete => {
    buttonDelete.addEventListener("click", (event) => {

    event.preventDefault();
    console.log("clické");
                           
    let clickBouton = event.target;
    let figureWork = clickBouton.closest("figure");
    let figureWorkId = figureWork.id;

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
                event.preventDefault()
            } else if (response.status !== 200 && response.status === 401) {
                        console.log("erreur de suppression du projet, requête utilisateur non autorisée, authentification utilisateur requise")
                        }        
            else if (response.status !== 200 && response.status === 501) {
                        console.log("erreur de suppression du projet, comportement inhabituel")
                        }
                })
                
            })
        })
     })
}
     modalWorkGallery();

              
// Création des boutons de filtre et implémentation fonctionnement filtrage des works
 async function categorieFiltre () {
     const reponse = await fetch ("http://localhost:5678/api/categories");
    let workCategory = await reponse.json();

        const filterDiv = document.querySelector(".filters");
        const filterGroup = document.querySelector(".category-filters");        
        const workGallery = document.querySelector(".gallery");

        // Ajout du bouton "Tous"        
       const filterAll = document.createElement("button");
       filterAll.innerText = "Tous";

       filterGroup.appendChild(filterAll);      

//Execution de la fonction avec les paramètres définis que l'on souhaite afficher : conteneur de destination et contenu
       filterAll.addEventListener(
        "click",  () => {
            homeWorkGallery(".gallery", 0);
        }
        )        
        // générer un bouton par catégorie avec leur nom respectif
         for (let i = 0; i < workCategory.length; i++) {
      const filterItem = document.createElement("button");
      filterItem.innerText = workCategory[i].name;  

      filterGroup.appendChild(filterItem);
      filterItem.addEventListener(
        "click", () => {
            //Execution de la fonction avec les paramètres définis que l'on souhaite afficher : conteneur de destination et contenu
            homeWorkGallery(".gallery", workCategory[i].id);
        }
      )
      }
    
         }        

     categorieFiltre();         


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
let modalUnderlineGallery = document.querySelector(".underline-gallery");

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
        if (modalPhotoButton) {
            modalPhotoButton.style.display = "none"
        }

        if  (modalUnderlineGallery) {
             modalUnderlineGallery.style.visibility = "hidden"
        }

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

    if  (modalUnderlineGallery) {
             modalUnderlineGallery.style.visibility = "visible"
        }
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




let modalFormTitle = document.getElementById("titre");
let fileCategory =  document.getElementById("categorie");
let formModal = document.querySelector(".form-modal");
const inputField = document.querySelector("input[type=file]");
const previewImage = document.querySelector(".picture-modale");

const loadedFile = inputField.files[0];
let modalFormTitleValue = modalFormTitle.value;
let fileCategoryValue = Number(fileCategory.value);

function PreviewWork () {

const loadedFile = inputField.files[0];
let modalFormTitleValue = modalFormTitle.value;
let fileCategoryValue = Number(fileCategory.value);


if (loadedFile) {
    
    const fileReader = new FileReader();  

    fileReader.onloadend = () => {         
    previewImage.src = fileReader.result;
}
    fileReader.readAsDataURL(loadedFile)

    if ((loadedFile && modalFormTitleValue && fileCategoryValue)) {
    modalValiderButton.style.backgroundColor  = "#1D6154";
    }
    document.querySelector(".label-modal-button").style.display = "none"
    document.querySelector(".fileType").style.display = "none"
    document.querySelector(".picture-modale").classList.add("preview-picture-modale")
}
}

inputField.addEventListener("change" , PreviewWork);
modalFormTitle.addEventListener("input", PreviewWork);
fileCategory.addEventListener("change", PreviewWork);


 if (formModal) {
formModal.addEventListener("submit", (event) => {
    console.log("bouton cliqué")
    event.preventDefault();  


const loadedFile = inputField.files[0];
let modalFormTitleValue = modalFormTitle.value;
let fileCategoryValue = Number(fileCategory.value);

const formData = new FormData();

formData.append("image", loadedFile);
formData.append("title", modalFormTitleValue);
formData.append("category", fileCategoryValue);


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
