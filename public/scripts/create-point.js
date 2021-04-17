
// Adicionando UFs de forma inteligente ao select de Estado, na utilização de um link da ibge
function populateUFs() { 
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        /* populando options do select */
        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }

    })
}
populateUFs() 


// Adicionando Cidades de forma inteligente ao select de Cidade
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    // limpar options de cidades
    citySelect.innerHTML = "<option>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        /* populando options do select */
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

        }
        // ativando campo cidade com seus options populados
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)
/* --------------------------------------------------------------------------------------- */


/* Itens de coleta || Cards || Evento de ativação de classe */
// pegar todos os LI
const itemsToCollect = document.querySelectorAll(".items-grid li")

// estrutura de repetição
for (const item of itemsToCollect) {
    // adicionar um ouvidor de eventos
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
// array inicialmente vazio
let selectedItems = []


function handleSelectedItem(event) {
    const itemLi = event.target

    /* adicionar ou remover uma classe com javascript */
    itemLi.classList.toggle("selected") // add= adicionar || remove= remover || toggle= adicionar ou remover

    const itemId = itemLi.dataset.id

    // verificando o que está acontecendo
    // console.log('ITEM ID: ', itemId)

    // verificar se existem itens selecionados, se sim, pegar os selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //será true or false
        return itemFound
    })

    // se ja estiver selecionado, tire-o da seleção
    if( alreadySelected >= 0 ) {
        // removendo da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // 
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }   
    // se não estiver selecionado, adicionar a seleção
    else {
        selectedItems.push(itemId)
    }

    // verificando o que está acontecendo
    //console.log('selectedItems: ', selectedItems)
    
    // atualizar o campo input hidden com os dados seleceionados
    collectedItems.value = selectedItems

}
/* --------------------------------------------------------------------------------------- */
