const tutorialBtn = document.getElementById("tutorial-button");
let tutorialIndex




tutorialBtn.addEventListener("click", startTutorial);
document.body.addEventListener("click", endTutorial);
document.body.addEventListener("click", changeTutorialStep);

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
            <button data-modal-btn id="btn-prev"><p>Prev</p><i class="fa-solid fa-circle-chevron-left"></i></button>
            <button data-modal-btn id="btn-next"><p>Next</p><i class="fa-solid fa-circle-chevron-right"></i></button>
        </div>`
    document.body.insertBefore(modal, balanceSection)
    tutorialStep()
}

function changeTutorialStep(e){
    //check that a prev next button was pressed
    if(e.target.hasAttribute('data-modal-btn')){
        //sum or subtract to index depending on which button was pressed
        if(e.target.id === "btn-prev"){
            tutorialIndex--;
        } else if(e.target.id === "btn-next"){
            tutorialIndex++;
        }
        //hide or show prev next btn
        if(tutorialIndex === 0){
            let modalButtons = document.querySelectorAll('.modal .modal-body button');
            modalButtons[0].classList.add("hide")
        } else {
            let modalButtons = document.querySelectorAll('.modal .modal-body button');
            modalButtons.forEach(btn =>{
                btn.classList.remove("hide");
            })
        }

        //check if there are highlighted elements and delete highlight
        let prevTutorialElementsArray = document.querySelectorAll('.tutorial-step');
        prevTutorialElementsArray.forEach(el =>{
            el.classList.remove("tutorial-step")
        })
        
        //check current index, highlight element with that data tutorial step
        let tutorialElementsArray = document.querySelectorAll(`[data-tutorial-step="${tutorialIndex}"]`)
        tutorialElementsArray.forEach(el =>{
            el.classList.add("tutorial-step")
        })

        //locate modal next to highlited element
        locateModal()
    }
}

function tutorialStep(){
    if(tutorialIndex === 0){
        let modalButtons = document.querySelectorAll('.modal .modal-body button')
        centerModal();
        modalButtons[0].classList.add('hide')
    } else{
        console.log("hi")
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

function locateModal(){
    //set highlited element measures and positions
    let modal = document.querySelector(".modal");
    let lastElement = (document.querySelectorAll('.tutorial-step').length) -1;
    let currentTutotialElement = document.querySelectorAll('.tutorial-step')[lastElement];
    let rect =currentTutotialElement.getBoundingClientRect()
    console.log(rect)
    //delete previous style    
    modal.removeAttribute("style")

    //decide modal position regarding the highlited element
    let topPoint = rect.top;
    let bottomPoint = rect.bottom;
    let leftPoint = rect.left;
    let rightPoint = rect.right;
    let modalHeight = modal.offsetHeight;
    let modalWidth = modal.offsetWidth;

    //if element is on top of the window locate modal bellow
    if(topPoint <= window.innerHeight - bottomPoint){
        modal.style.top = `${rect.top + rect.height + 10}px`;
    } else {
        modal.style.top = `${rect.top - modalHeight - 10}px`;
    }
    
    //if element is on the left part of the window locate modal slightly to the right
    if(leftPoint <= window.innerWidth - rightPoint + 1){
        modal.style.left = `${rect.left + 10}px`;
    } else {
        modal.style.left = `${rect.left + rect.width - modalWidth - 10}px`;
        console.log(leftPoint, innerWidth, rightPoint)
    }

    //When highlighting sections center modal

    if(topPoint === 30 && bottomPoint - rect.height === 30){
        centerModal()
    }
}