      
          async function genererProjets() {
             const reponse = await fetch("http://localhost:5678/api/works");
              const projets = await reponse.json();
        
              const sectionProjets = document.querySelector(".gallery");  

                 for (let i = 0; i < projets.length; i++) {
        
                    const figureElement = document.createElement("figure");
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