const tutorialBtn = document.getElementById("tutorial-button");
const tutorialContent = [
`Hello, thank you for using Track-e.i, in this tutorial you will learn how to use this site.</br>
 You can close this tutorial with the X button and move to the previous or next step of this 
 Walkthrough with the buttons below.</br>Now we will see all the sites tools and how it would
 look if we add lots of information!`,
`You can use the Navbar to change the different sections. Next to this you have the hamburger
 menu which opens the dropdown menu with some extra options.`,
`Here you can select the currency of your preference and the decimal separator symbol that is 
used in your country.`,
`In this section you can add all your transactions (either incomes or expenses) and add all 
the relevant information.</br>Let’s see an example of how to add new transactions.`,
`In these first three boxes, you can add the amount, a small note and date of your transaction.</br>
Remember, the selected date cannot be after the current day.`,
`Before adding the category, select using these buttons if the transaction is either an 
income or an expense.`,
`Here all the category options will be displayed, select the one that suits better your transaction.`,
`After selecting it, the category will be displayed here.`,
`Press the submit button to send the information, you will see a confirmation popup if all 
the information provided is correct.`,
`Now we can go the Balance section. Here you can see your current Balance as well how you 
earned or spend the money.`,
`Here a total of your incomes and expenses will be displayed, after that you will see the 
total balance.`,
`By pressing these buttons you can see all transactions categorized below as well as a 
donut chart on the top.`,
`All the transactions are categorized here, and you can see the total amount and what 
percentage it occupies.</br>The percentage for a better experience is rounded, so it 
is possible that the result of summing all numbers won’t be 100%`,
`When one of these elements is clicked or hovered with the mouse, it will be 
highlighted for a better reference.`,
`The donut chart will also be highlighted, showing the selected element and displaying 
the rest in a darker tone.</br>the information (category, amount and percentage) will 
be displayed instead of the balance.`,
`In this section, every transaction will be displayed ordered by date (from most recent to oldest)`,
`Each day will have its own balance with every transaction displayed on that specific day grouped.`,
`In every transaction you will find at the end an X button which when pressed deletes 
the transaction for the database.`,
`In the footer besides the button you just pressed there are links to the creator of this website's GitHub page as well a link to send him an email.`,
`This is all, thanks for going through this tutorial and enjoy the site.</br>Remember that for an optimal experience, if you are using this website with a phone to avoid using the landscape mode.`
]
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
            <p>${tutorialContent[0]}</p>
        </div>
        <div class="modal-body">
            <button data-modal-btn id="btn-prev"><p>Prev</p><i class="fa-solid fa-circle-chevron-left"></i></button>
            <button data-modal-btn id="btn-next"><p>Next</p><i class="fa-solid fa-circle-chevron-right"></i></button>
        </div>`
    document.body.insertBefore(modal, balanceSection)
    let modalButtons = document.querySelectorAll('.modal .modal-body button')
    modalButtons[0].classList.add('hide')
    centerModal();
}

function changeTutorialStep(e){
    let modalButtons = document.querySelectorAll('.modal .modal-body button');
    //check that a prev next button was pressed
    if(e.target.hasAttribute('data-modal-btn')){
        //sum or subtract to index depending on which button was pressed
        if(e.target.id === "btn-prev"){
            tutorialIndex--;
        } else if(e.target.id === "btn-next"){
            tutorialIndex++;
        }

        //check if there are highlighted elements and delete highlight
        let prevTutorialElementsArray = document.querySelectorAll('.tutorial-step');
        prevTutorialElementsArray.forEach(el =>{
            el.classList.remove("tutorial-step")
        })

        //Add inner html to modal text
        let modalText = document.querySelector('.modal .modal-head p')
        modalText.innerHTML = tutorialContent[tutorialIndex];

        switch(tutorialIndex){
            case 0:
                modalButtons[0].classList.add('hide');
                centerModal();
                break;
            case 1:
                checkbox.checked = false;
                modalButtons.forEach(btn =>{
                    btn.classList.remove('hide')
                });
                break;
            case 2:
                checkbox.checked = true;
                break;
            case 3:
                checkbox.checked = false;
                deleteValues(inputs)
                break;
            case 4:
                inputAmount.value = 500;
                inputNote.value = "Internet bill";
                inputDate.value = "2022-08-01";
                resetAddSection();
                break;
            case 6:
                showAddExpense()
                document.getElementById("bills").checked = true
                inputCategory.classList.remove("active");
                break;
            case 7:
                inputCategory.value = "bills";
                inputCategory.classList.add("active");
                break;
            case 8:
                inputAmount.value = 500;
                inputNote.value = "Internet bill";
                inputDate.value = "2022-08-01";
                showAddExpense()
                document.getElementById("bills").checked = true
                inputCategory.value = "bills";
                inputCategory.classList.add("active");
                break;
            case 9:
                resetAddSection()
                break;
       }
        
        //check current index, highlight element with that data tutorial step
        let tutorialElementsArray = document.querySelectorAll(`[data-tutorial-step="${tutorialIndex}"]`);
        if(tutorialElementsArray[0] !== undefined){
            tutorialElementsArray.forEach(el =>{
            el.classList.add("tutorial-step")
            });
            //locate modal next to highlited element
            locateModal()
        }
        console.log(tutorialIndex) 
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



//tutorial functions


function showAddExpense(){
    //add expense class to add section
    addSection.classList.add("expense");

    //add active class to button
    addExpenseIncomeBtn[1].classList.add('active')

    //filter radio lebel with expense category
    addRadioLabel.forEach(label => {
        if(label.getAttribute('data-radio-category') === "expense"){
            label.classList.remove('hide')
        } 
    })
}

function resetAddSection(){
    //delete expense class to add section
    addSection.classList.remove("expense");

    //delete active class to button
    addExpenseIncomeBtn[1].classList.remove('active')

    //delete input category active class
    inputCategory.classList.remove("active")

    //hide radio lebel with expense category
    addRadioLabel.forEach(label => {
            label.classList.add('hide')
    })
}