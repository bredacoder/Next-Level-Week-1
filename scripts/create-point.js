function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
     .then( res => res.json() )
     .then( states => {

        for( let state of states ) { //entra nos estados pega um estado armazena na let state e entra no bloco de código
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

     })
}

populateUFs()

function getCitys(event) {
    const citySelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')


    const ufValue = event.target.value
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
     .then( res => res.json() )
     .then( citys => {

        for ( const city of citys ) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false

     })

}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCitys)