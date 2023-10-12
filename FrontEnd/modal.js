// faire un appel a l'api pour générer les projets comme dans projets.js
// ajouter en js le logo poubelle pour supprimer un projet
//ajouter un add event listener sur le logo qui fait un apel a l'api pour supprimer le projet correspondant


let modal = null
const focusableSelector = "button, a, input, textarea"
let focusables = []
let previouslyFocusedElement = null



const openModal = function (event) {
    event.preventDefault()
    modal = document.querySelector(event.target.getAttribute("href"))
    
    // focusables = Array.from(modal.querySelectorAll(focusableSelector))
    // previouslyFocusedElement = document.querySelector(":focus") 
    // focusables[0].focus()
    // cible l'attribut style="display" écris précédemment dans le fichier index.html
    modal.style.display = null

     // cible l'attribut arial-hidden écris précédemment dans le fichier index.html
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

const closeModal = function(event) {
    if (modal === null) return
    // if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    event.preventDefault()
    // window.setTimeout(function () {
    //     modal.style.display = "none"
    // }, 500)

    modal.style.display = "none"
    modal.setAttribute("aria-hidden", true)
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)    
}

const stopPropagation = function (event) {
    event.stopPropagation()
}


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


 window.addEventListener("keydown", function (event) {
     if (event.key === "Escape" || event.key === "Esc") {
         closeModal(event)
     }
     if(event.key === "tab" && modal !== null){
         focusInModal(event)
     }
 })


document.querySelector(".modal").addEventListener("click", openModal);