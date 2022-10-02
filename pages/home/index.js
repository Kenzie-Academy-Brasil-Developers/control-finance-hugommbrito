// LÓGICA PARA RENDERIZAR CARDS NA TELA
function renderCards(cardList){
    
    let cardsArea = document.getElementById("cardsArea")
    cardsArea.innerHTML = ""
    if(cardList.length == 0){
        document.querySelector(".emptyCard").classList.toggle("show-emptyCard")
    } else {
        cardList.forEach(element => {
            let cardDiv = document.createElement("div")
            cardDiv.classList.add("card")
    
            let cardValue = document.createElement("p")
            cardValue.classList.add("card-value")
            cardValue.innerText = `R$${element.value.toFixed(2).replace(".",",")}`
            cardDiv.appendChild(cardValue)
    
            let cardBtnsDiv = document.createElement("div")
            cardBtnsDiv.classList.add("card-btns")
            cardDiv.appendChild(cardBtnsDiv)
    
            let categoryTag = document.createElement("p")
            categoryTag.classList.add("category-tag")
            categoryTag.innerText = `${valuesCategory[element.categoryID]}`
            cardBtnsDiv.appendChild(categoryTag)
    
            let deleteBtn = document.createElement("button")
            deleteBtn.classList.add("btn-delete")
            deleteBtn.id = `dlt-btn-${element.id}`
            cardBtnsDiv.appendChild(deleteBtn)
    
            cardsArea.appendChild(cardDiv)
        })
    }
    renderTotal(cardList)
    renderSaldo(cardList)
    removeItem(cardList)

}
renderCards(insertedValues)



// LÓGICA PARA RENDERIZAR SOMA DOS VALORES NA TELA
function renderTotal(cardList){
    let cardTotal = document.getElementsByClassName("cardTotal")
    cardTotal[0].innerHTML = "<p class='text1-medium'>Soma dos lançamentos</p>"

    let totalValue = 0

    if(cardList.length < 1){
        totalValue = 0
    } else if(cardList.length < 2){
        totalValue = cardList[0].value
    } else {
        totalValue = cardList.reduce((acc, cur) => (acc.value || acc) + cur.value)
    }

    let totalValueTag = document.createElement("p")
    totalValueTag.classList.add("text1-medium")
    totalValueTag.innerText = `R$${totalValue.toFixed(2).replace(".",",")}`
    cardTotal[0].appendChild(totalValueTag)
}



// LÓGICA PARA RENDERIZAR APENAS OS CARDS DO FILTRO
function filterCards(){
    let filterArea = document.getElementById("filterArea")

    filterArea.addEventListener("click", (e) => {
        let clickedBtnID = e.target.id

        if(clickedBtnID === "filterTodos"){
            renderCards(insertedValues)
        } else if (clickedBtnID === "filterEntradas"){
            insertedValuesfiltered = insertedValues.filter(element => element.categoryID === 0)
            renderCards(insertedValuesfiltered)
        } else if (clickedBtnID === "filterSaidas"){
            insertedValuesfiltered = insertedValues.filter(element => element.categoryID === 1)
            renderCards(insertedValuesfiltered)
        }
    })
}
filterCards()



// LÓGICA PARA DELETAR ÍTENS DOS ARRAYS
function removeItem(cardList){
    let dltCardBtn = Array.from(document.querySelectorAll(".btn-delete"))

    dltCardBtn.forEach(button => {
        button.addEventListener("click", e => {
            let clickedBtnID = e.target.id[8]
            let deleteIndex = insertedValues.findIndex(element => element.id == clickedBtnID)
            insertedValues.splice(deleteIndex, 1)
            renderCards(cardList)
        })
    })
}



// LÓGICA PARA RENDERIZAR SALDO NA TELA
function renderSaldo(cardList){
    let cardSaldo = document.getElementsByClassName("cardSaldo")
    cardSaldo[0].innerHTML = "<p class='text1-medium'>Saldo em Conta</p>"

    let SaldoValue = 0

    if(cardList.length < 1){
        SaldoValue = 0
    } else if(cardList.length < 2){
        SaldoValue = (cardList[0].categoryID == 0) ? cardList[0].value : - cardList[0].value
    } else {
        SaldoValue = cardList.reduce((acc, cur) => (((acc.categoryID == 0) ? acc.value : - acc.value) || acc) + ((cur.categoryID == 0) ? cur.value : - cur.value))
    }

    let SaldoValueTag = document.createElement("p")
    SaldoValueTag.classList.add("text1-medium")
    SaldoValueTag.innerText = `R$${SaldoValue.toFixed(2).replace(".",",")}`
    cardSaldo[0].appendChild(SaldoValueTag)
}