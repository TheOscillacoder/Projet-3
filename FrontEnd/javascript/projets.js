      
          async function genererProjets(IdCategory = 0) {
             const reponse = await fetch("http://localhost:5678/api/works");
              const projets = await reponse.json();
        
              const sectionProjets = document.querySelector(".gallery");
            //   if (IdCategory != 0) {

                nettoyage(sectionProjets);
            //   }  

                 for (let i = 0; i < projets.length; i++) {

        const figureElement = document.createElement("figure");
                    figureElement.setAttribute("id", projets[i].categoryId);

                    if (IdCategory != 0) {
                        
                       if (IdCategory != projets[i].categoryId) {
                        figureElement.style.display = "none";
                        
                    }   else {
                        figureElement.style.display = "inherit";
                    }
                }

// création des projets de la galerie
                    const imageElement = document.createElement("img");        
                        imageElement.setAttribute("src", projets[i].imageUrl);
                        imageElement.setAttribute("alt", projets[i].title);     
            
                    const nomElement = document.createElement("figcaption");
                        nomElement.textContent = projets[i].title;
        
                    figureElement.append(imageElement);
                    figureElement.append(nomElement);  
                    sectionProjets.append(figureElement); 
                  }
                  
                  console.log(projets); 
              }

genererProjets();


 async function categorieFiltre () {
     const reponse = await fetch ("http://localhost:5678/api/categories");
    let projetCategorie = await reponse.json();

        const filterGroup = document.querySelector(".category-filters");
        const ProjetGroup = document.querySelector(".gallery");


        // Ajout du bouton pour toutes les catégories de travaux
      
        
       const filterSoloAll = document.createElement("button");
       filterSoloAll.innerText = "Tous";

       filterGroup.insertBefore(filterSoloAll, ProjetGroup);

       filterSoloAll.addEventListener(
        "click", function () {
            genererProjets(0)
        }
        )
            

     
        // générer un bouton par catégorie avec leur nom respectif

         for (let i = 0; i < projetCategorie.length; i++) {
      const filterSolo = document.createElement("button");
      filterSolo.innerText = projetCategorie[i].name;
    

      filterGroup.insertBefore(filterSolo, ProjetGroup);

      filterSolo.addEventListener(
        "click", function () {
            genererProjets(projetCategorie[i].id);
        }
      )
      }
    
         }        

     categorieFiltre();




function nettoyage(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}