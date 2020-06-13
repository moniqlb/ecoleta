//Campos de seleção de UF e Cidade

function populateUFs() { /*Função para preencher o campo de UF com os estados da API */
  const ufSelect = document.querySelector('select[name=uf]') /*to pegando o campo do select do estado */
  
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json()) /*Função anonima que retorna o json */
  .then( states => { /*esse then é pra pegar os dados da api*/
    for( const state of states){
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      /*o campo ufSelect recebe agora os dados que já tinha += opções d vetor states que
      contém os 27 retornos da API. */
    }
  })
}

populateUFs() //chamei a função

function getCities(event) {
  const citySelect = document.querySelector('select[name=city]') /*Peguei o campo de cidade */
  const stateInput = document.querySelector('input[name=state]')

  const ufValue = event.target.value
  /*--- "event" é o evento que eu recebi por parametro, que foi o "change"
    --- "target" é onde o evento foi executa, que na função foi no campo uf, 
        lembrando que estou recebendo a informação do listener que chama essa função
    --- E "value" é o valor que esse campo recebe sempre que algo muda. Nesse caso
        ele referencia o id, que foi destacado na função como 'value="${state.id}"' */
  
  const indexOfSelectState = event.target.selectedIndex /*pegar número do estado selecionado */
  stateInput.value = event.target.options[indexOfSelectState].text /*Atualizar o valor da campo state*/
  
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  /*Defino a variável ufvalue que tem o id no estado selecionado na url de chamar os municipios
  que aparecerão no campo de cidade. */

  citySelect.innerHTML = "<option value>Selecione a cidade</option>"
  citySelect.desabled = true

  fetch(url) /*Chamo essa url */
  .then( res => res.json() ) /*pego o json */
  .then( cities => { /*então minhas cidade são o que vem do json*/
    for( city of cities){ //for para cada cidade das cidades retornadas, que serão exibidas no municipio
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` /*criei as opções */
    }
    citySelect.disabled = false /*habilito o campo quando recebo as cidades */
  })
}

document
  .querySelector("select[name=uf]") /*Peguei o campo de uf*/
  .addEventListener("change", getCities) /*E quando ele mudar eu chamo a função de pegar cidade*/


//Trabalhando os itens de coleta
//colocando na variável itemsToCollect todos os itens li da div items-grid
const itemsToCollect = document.querySelectorAll(".items-grid li")
const CollectedItems = document.querySelector("input[name=items]")

for (const item of itemsToCollect){
  item.addEventListener("click", handleSelectedItem)
}

// lista de itens atuais
let selectedItems = []

function handleSelectedItem (event) {
  const itemLi = event.target
  
  //o elementendo toggle de classList adiciona ou remove uma classe de um elemento.
  itemLi.classList.toggle("selected")
  
  const itemId = itemLi.dataset.id //pegando o id como data-id = 1 

  console.log("itemID: ", itemId)

  //Verificando se já existem itens selecionados
  const alreadySelected = selectedItems.findIndex( item => {
    const itemFound = item == itemId
    return itemFound
  })

  //const alreadySelected = selectedItems.findIndex( item => item == itemId)
  //função simplificada

  /* A função dentro do FindIndex vai pegar item a item dentro do array,
  os itens que o array tiver no momento.
  Após isso, eu verifico em item===itemID, onde:
    item é o item da minha lista de array que to pegando do SelectedItems
    e itemId é o id do meu elemento lá no data-id="id"
    se o item do array for igual ao id dele, então itemFound retorna o index
    se for diferente ele retorna -1 e roda de novo
    se não achar retorna continua com -1, indicando que não tenho esse item
    */
    
    /*alreadySelected recebe -1 quando o elemento não ta na lista
    e recebe o index do elemento quando ele já está.*/
    //se o item tiver selecionado, tirar da selecao
  if ( alreadySelected >= 0 ) {
    //tirar da seleção
    const filteredItems = selectedItems.filter( item => {
      const itemIsDiferent = item != itemId
      return itemIsDiferent
    })
    selectedItems = filteredItems
  }else{
    // se não tiver selecionado, adicionar a seleção
    selectedItems.push(itemId)
  } 
  console.log("Itens selcionados", selectedItems)

  //atualizar o input hidden
  CollectedItems.value = selectedItems

}