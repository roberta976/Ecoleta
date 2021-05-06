
function populateUFs() {

    const ufselect = document.querySelector('select[name=uf]')
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() })
        .then(states => {

            for (const state of states) {
                ufselect.innerHTML += `<option value="${state.id}">${state.nome} </option>`
            }
        })
}
populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')

    const ufValue = event.target.value
    const indexOfSelectIndex = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectIndex].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then((res) => { return res.json() })
        .then(cities => {


            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

            }
            citySelect.disabled = false

        })
}



document
    .querySelector('select[name=uf]')
    .addEventListener("change", getCities)


//todos os li

const itemsToCollet = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollet) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []
function handleSelectedItem(event) {


    const itemLi = event.target

    // add ou remover ma classe com js

    itemLi.classList.toggle("selected")

    const itemid = itemLi.dataset.id

    // verificar os itens selecionados, se sim
    //pegar os itens selecionados

    const alreadyselected = selectedItems.findIndex(item => {
        const itemfound = item == itemid
        return itemfound
    })



    //se ja estiver selecionado, 
    if (alreadyselected >= 0) {

        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDiferent = item != itemid
            return itemIsDiferent
        })

        selectedItems = filteredItems

    } else {


        

        //se nao estiver selecionado
        // add à seleção
        selectedItems.push(itemid)
    }

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}