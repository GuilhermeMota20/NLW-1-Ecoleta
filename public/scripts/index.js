// MODAL
// primeiro temos de pegar o botão de pesquisa 
const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")


// abrindo modal
buttonSearch.addEventListener("click", ()=> {
    modal.classList.remove("hide")
})

/// fechando o modal
close.addEventListener("click", ()=> {
    modal.classList.add("hide")
})