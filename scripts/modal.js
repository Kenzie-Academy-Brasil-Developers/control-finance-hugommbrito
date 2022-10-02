function openCloseModal(){
    let modalButtons = document.querySelectorAll("[data-modal-control]")
    let divModal = document.getElementById("modal")

    modalButtons.forEach(button => {
        button.addEventListener("click", function(){
            divModal.classList.toggle("show-modal")
        })
    }) 
}
openCloseModal()

function addItem(){
    let submitBtn = document.getElementById("add-btn")
    let modal = document.querySelector(".modal")
    
    submitBtn.addEventListener("click", function(e){
        e.preventDefault()
        let inputCurrencyValue = document.querySelector(".currency-input").value
        let selectedRadioBtnValue = document.querySelector("input[name='categoryInput']:checked").value
        
        let newItem = {
            id: (insertedValues.length > 0) ? insertedValues[insertedValues.length - 1].id + 1 : 1,
            value: Number(inputCurrencyValue),
            categoryID: Number(selectedRadioBtnValue),
        }

        insertedValues.push(newItem);

        (insertedValues.length == 1) ? document.querySelector(".emptyCard").classList.toggle("show-emptyCard") : ""

        renderCards(insertedValues)

        modal.classList.toggle("show-modal")

    })

}
addItem()