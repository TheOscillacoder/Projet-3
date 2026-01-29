

let modal = null

const focusableSelector = 'button, a, input, textarea'
let focusables = []



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
  
  const target = document.querySelector(targetSelector);
    if (!target) {    
        return   
    }    
        if (target) {
        e.preventDefault() 
        target.style.display = null
        target.removeAttribute('aria-hidden')
        target.setAttribute('aria-modal', 'true')

         if (focusableSelector) {
    focusables = Array.from(target.querySelectorAll(focusableSelector))
    }
    }     

    modal = target   
    }
    //  if (modal) {
    //  e.preventDefault()
    //  modal.addEventListener('click', closeModal)
    //  modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    //  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)

    //   console.log(e.target, e.target.getAttribute('href'),target);
// }
// }


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

const closeModal = function (e) {
    if (!modal)
    return     
      
    if (modal) {

        console.log("fermeture de modale :" , modal.querySelector('.js-modal-close'))
    
        modal.style.display = 'none'
        modal.setAttribute('aria-hidden', 'true')
        modal.removeAttribute('aria-modal')
        // modal.removeEventListener('click', closeModal)
        // modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
        // modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)

    }    

     modal = null
    
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModale = function(e) {
    let index = focusables.findIndex(modal.querySelector(':focus'))

}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
    
})


window.addEventListener('keydown', function (e) {
    console.log(e.key)
    if (e.key === "Escape" || "Esc") {
        closeModal(e)
}
if (e.key === "Tab" && modal !== null) {
    focusInModale(e)
}
})