

let modal = null
                        
const openModal =  function(e) {     

//vérification présence lien a
const link = e.target.closest('a'); 
if (!link) {
return;
}

//vérification bon format de données lien a
const targetSelector = link.getAttribute('href');
if (typeof targetSelector !== 'string' || !targetSelector.startsWith('#')) {
console.error('Href invalide ou manquant:', targetSelector);
return;
}
//définition cible = lien modale
const target = document.querySelector(targetSelector);
if (!target) {    
    return   
}    
// si cible === document.querySelector(targetSelector) existe,  alors activation/apparition éléments modale
if (target) {
e.preventDefault() 
target.style.display = null
target.removeAttribute('aria-hidden')
target.setAttribute('aria-modal', 'true')

}     

modal = target   
}

//ciblage modal wrapper (interface de la modale) puis declenchement fonction fermeture de modale closeModal
const modalWrapper = document.querySelector('.modal-wrapper');

modalWrapper.addEventListener('click', (e) => {
    if (
        e.target.closest('.js-modal-close')
    ) {
        e.preventDefault();
        closeModal();
    }
}
);
//fonction fermeture de modale
const closeModal = function () {
//si pas de cible avec valeur de target (ciblant le lien d'ouverture) , return
if (!modal) {
return    
} 
// si modal (= target) === document.querySelector(targetSelector) existe, alors activation/apparition éléments modale
if (modal) {
    console.log("fermeture de modale :" , modal.querySelector('.js-modal-close')) 
    // retrait du focus sur la modale avant retrait attribus
    document.activeElement.blur();         
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
}    

    modal = null

}


//cible tous les éléments avec js.modal pour déclencher l'ouverture au clic

document.querySelectorAll('.js-modal').forEach(a => {
a.addEventListener('click', openModal)
})

//déclenchement de la fonction de fermeture de la modale sur touche echap

window.addEventListener('keydown', function (e) {
if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e)
}

})

export { closeModal };