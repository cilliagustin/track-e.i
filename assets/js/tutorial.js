const tutorialBtn = document.getElementById("tutorial-button");
let tutorialIndex




tutorialBtn.addEventListener("click", startTutorial);
document.body.addEventListener("click", endTutorial)

function startTutorial(){
    tutorialIndex = 0;
    let tutorialBackground = document.createElement('div');
    tutorialBackground.classList.add('tutorial-background')
    document.body.insertBefore(tutorialBackground, balanceSection)
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
            <div class="modal-head">
            <i class="fa-solid fa-xmark" id="close-modal"></i>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum id qui ipsa repudiandae est quod dolores aliquid eos dignissimos. Dignissimos?</p>
        </div>
        <div class="modal-body">
            <button id="btn-prev"><p>Prev</p><i class="fa-solid fa-circle-chevron-left"></i></button>
            <button id="btn-next"><p>Next</p><i class="fa-solid fa-circle-chevron-right"></i></button>
        </div>`
    document.body.insertBefore(modal, balanceSection)
    tutorialStep()
}

function tutorialStep(){
    if(tutorialIndex === 0){
        let modalButtons = document.querySelectorAll('.modal .modal-body button')
        centerModal();
        modalButtons[0].classList.add('hide')
    }
}

function endTutorial(e){
    if(e.target.id === "close-modal"){
        let tutorialBackground = document.querySelector('.tutorial-background');
        let modal = document.querySelector('.modal');

        tutorialBackground.remove();
        modal.remove();
    }
}


function centerModal(){
    let modal = document.querySelector(".modal");
    let width = modal.offsetWidth;
    let height = modal.offsetHeight;
    modal.style.left = `calc(50% - ${width / 2}px)`;
    modal.style.top = `calc(50% - ${height / 2}px)`;
}