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