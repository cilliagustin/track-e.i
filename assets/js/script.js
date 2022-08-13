// Variables
const navLinks = document.querySelectorAll('.nav-link');
const checkbox = document.getElementById('side-menu');
const currency = document.getElementById('currency');
let selectedCurrency = currency.value;
const decimal = document.getElementById('decimal');
let selectedDecimal = decimal.value;
const sections = document.querySelectorAll('section');
const balanceNavLink = document.getElementById('balance-navlink');
const balanceSection = document.getElementById('balance');
const addNavLink = document.getElementById('add-navlink');
const addSection = document.getElementById('add');
const calendarSection = document.getElementById('calendar');
const pieChartContainer = document.querySelector('.pie-chart-container');
const balanceExpenseIncomeBtn = document.querySelectorAll('#balance .pie-chart .toggle-buttons button');
const pieChartInfo = document.querySelector('.pie-chart-info');
const inputs = document.querySelectorAll('#amount, #note, #date, #input-category');
const inputAmount =  document.getElementById('amount');
const inputNote =  document.getElementById('note');
const inputDate =  document.getElementById('date');
const inputCategory =  document.getElementById('input-category');
const submit = document.getElementById('submit');
const addExpenseIncomeBtn = document.querySelectorAll('#add .input-container button');
const addRadioInput = document.querySelectorAll('#add .category-container input');
const addRadioLabel = document.querySelectorAll('#add .category-container label');
const calendarList = document.querySelector('#calendar .container ul');
const iconsObj = {
    salary: "fa-solid fa-money-bill-1-wave",
    loanrecieve: "fa-solid fa-money-bill-transfer",
    savings: "fa-solid fa-piggy-bank",
    sellstockcrypto: "fa-solid fa-money-bill-trend-up",
    otherincome: "fa-solid fa-circle",
    rent: "fa-solid fa-house-chimney",
    groceries: "fa-solid fa-basket-shopping",
    bills: "fa-solid fa-file-invoice-dollar",
    clothing: "fa-solid fa-shirt",
    gifts: "fa-solid fa-gift",
    transportation: "fa-solid fa-bus",
    health: "fa-solid fa-heart-pulse",
    pets: "fa-solid fa-paw",
    restaurants: "fa-solid fa-utensils",
    entertaining: "fa-solid fa-martini-glass-citrus",
    buystockcrypto: "fa-solid fa-money-bill-trend-up",
    vacations: "fa-solid fa-umbrella-beach",
    house: "fa-solid fa-house-chimney",
    studies: "fa-solid fa-graduation-cap",
    loanpay: "fa-solid fa-money-bill-transfer",
    familysupport: "fa-solid fa-people-roof",
    otherexpense: "fa-solid fa-circle"
}


// Navbar and section functions

//Toggle between sections and change active class in navbar
navLinks.forEach(link =>{
    link.addEventListener('click', e =>{
        deleteActive(navLinks);
        hideElements(sections);
        //Add active class to target
        e.target.classList.add('active');
        let clickedNav = e.target.textContent.toLowerCase();
        sections.forEach(section => {
            //remove hide class to target´s section
            if(section.getAttribute('id')=== clickedNav){
                section.classList.remove('hide')
            }
        })

        //refresh balance section when changing sections
        balanceSection.classList.remove('income', 'expense');
        deleteActive(balanceExpenseIncomeBtn)
        hideElements(document.querySelectorAll('[data-add-category]'));
        //check if selected element exists, if it does, delete it
        if(document.getElementById('selected-element') !== null){
            document.getElementById('selected-element').remove()
        }

        //if page is in mobile version refresh all information from add section when toggle between sections
        if(window.innerWidth <= 766){
            addSection.classList.remove('income', 'expense')
            deleteValues(inputs)
            inputCategory.classList.remove('active')
            deleteActive(addExpenseIncomeBtn)
            uncheckRadioInputs(addRadioInput)
            hideElements(addRadioLabel);
        }
    })
})
 
//Select currency and populate Dom with this
currency.addEventListener('change', e =>{
    //set value of selected currency and store it in local storage
    selectedCurrency = e.target.value;
    localStorage.setItem('selectedCurrency', JSON.stringify(selectedCurrency))
    //replace the money sign in dom
    changeCurrency(selectedCurrency)
})

function changeCurrency(selectedCurrency){
    let displayedCurrency = document.querySelectorAll('[data-currency]')
    displayedCurrency.forEach(el =>{
        el.textContent = selectedCurrency
    })
}

//Select Decimal and populate Dom with this
decimal.addEventListener('change', e =>{
    //set value of selected decimal and store it in local storage
    selectedDecimal = e.target.value;
    localStorage.setItem('selectedDecimal', JSON.stringify(selectedDecimal))
    changeDecimal(selectedDecimal)
})

function changeDecimal(selectedDecimal){
    let displayedAmounts = document.querySelectorAll('[data-amount]')
    //replace for selected decimal
    displayedAmounts.forEach(amount =>{
        if(selectedDecimal === ','){
            amount.innerText = amount.innerText.replaceAll('.', selectedDecimal);
        } else if(selectedDecimal === '.'){
            amount.innerText = amount.innerText.replaceAll(',', selectedDecimal);
        }
    })
}

//Rezise functions

//set body height as window innerheight
window.addEventListener('resize', setheight)

function setheight(){
    let height = this.window.innerHeight;
    document.body.style.height = `${height}px`
}

setheight()

//Checks website when rezising to change sections
window.addEventListener('resize', () => {
    //make sure function only triggers if tutorial is not running
    if(document.querySelector('.tutorial-background') === null){
        //if website goes desktop mode when add section is on, gives balance section the active class to navbar and deletes hide class
        if(this.window.innerWidth >= 767 && addNavLink.classList.contains('active')){
            deleteActive(navLinks);
            hideElements(sections);
            balanceNavLink.classList.add('active');
            balanceSection.classList.remove('hide')
            // If website goes mobile it deletes information on add section so if is resized to desktop the add section appears blank again, but if website goes desktop when add section in active it keeps the information visible
        } else if (this.window.innerWidth <= 766 && !addNavLink.classList.contains('active')){
            addSection.classList.remove('income', 'expense')
            deleteValues(inputs)
            inputCategory.classList.remove('active')
            deleteActive(addExpenseIncomeBtn)
            uncheckRadioInputs(addRadioInput)
            hideElements(addRadioLabel);
        }
    }
})


//trigger function when resizing
window.addEventListener('resize', checkLandscapeMode)


//check window size, if phone is on landscape mode trigger alert else, delete alert if exists
function checkLandscapeMode(){
    let height = this.window.innerHeight
    let width = this.window.innerWidth
    if(height < width &&  height < 500 && width < 900 &&(width - height) >= 200){
        let popUpError = document.createElement('div');
        popUpError.setAttribute('id', 'pop-up-error');
        let popUpContent = document.createElement('div');
        popUpContent.classList.add('pop-up-content');
        let popUpHead = document.createElement('div');
        popUpHead.classList.add('pop-up-head');
        let warning = document.createElement('i');
        warning.classList.add('fa-solid', 'fa-circle-exclamation');
        popUpHead.appendChild(warning)
        popUpContent.appendChild(popUpHead)
        let popUpBody = document.createElement('div');
        popUpBody.classList.add('pop-up-body');
        let h2 = document.createElement('h2');
        h2.textContent = 'It looks Like You are using your phone on landscape mode'
        let h3 = document.createElement('h3');
        h3.textContent = 'For a good experience in your phone please rotate your screen back to vertical mode';
        popUpBody.appendChild(h2)
        popUpBody.appendChild(h3)
        popUpContent.appendChild(popUpBody)
        popUpError.appendChild(popUpContent)
        document.body.insertBefore(popUpError, balanceSection)

    } else {
        let popUpError = document.getElementById('pop-up-error')
        if(popUpError){
            popUpError.remove()
        }
    }
}

// Balance section functions

//Filter pie chart + pie chart info
balanceExpenseIncomeBtn.forEach(btn =>{
    btn.addEventListener('click', e =>{
        let balanceElements = document.querySelectorAll('[data-add-category]')
        let pressedBtn = e.target.getAttribute('data-button-category')
        //Add income or expense class to balance section 
        switch(pressedBtn) {
            case "income":
                balanceSection.classList.add("income");
                balanceSection.classList.remove("expense");
                break;
            case "expense":
                balanceSection.classList.add("expense");
                balanceSection.classList.remove("income");
                break;
        }

        //Add active class to button
        deleteActive(balanceExpenseIncomeBtn)
        e.target.classList.add('active')
        
        //filter piechart and piechart info
        balanceElements.forEach(el => {
            if(el.getAttribute('data-add-type') !== pressedBtn){
            el.classList.add("hide")
        } else if (el.getAttribute('data-add-type') === pressedBtn){
            el.classList.remove("hide")
        }
        });

        //check if selected element exists, if it does, delete it
        if(document.getElementById('selected-element') !== null){
            document.getElementById('selected-element').remove()
        }

    })
})
 
//Highlight elements
document.body.addEventListener('click', e =>{
    if(e.target.classList.contains('percentage-element')){
       highlightElement(e)
    } else{
        deleteHighlight()
    }
})

balanceSection.addEventListener('mouseover', e => {
    if(e.target.classList.contains('percentage-element')){
        deleteHighlight()
        highlightElement(e)
    }
});

//Highlight selected element in piechart, in piechart info and show information on top of final balance
function highlightElement(e){
    let category = e.target.getAttribute('data-add-category');
    let circles = document.querySelectorAll('#balance .pie-chart .pie-chart-container svg');
    let percentageElements = document.querySelectorAll('#balance .pie-chart-info div');
    circles.forEach(circle =>{
        //adds necesry active or unactive class to svg
        if(circle.getAttribute('data-add-category') === category){
            circle.firstElementChild.classList.remove('unactive')
            circle.firstElementChild.classList.add('active')
        } else {
            circle.firstElementChild.classList.remove('active')
            circle.firstElementChild.classList.add('unactive')
        }
    //deletes active class to all percentage elements and gives it to the correct one
    deleteActive(percentageElements);
    e.target.classList.add('active');

    //check if selected elements exists, if it does deletes it and creates a new one
    let selectedElement = document.getElementById('selected-element')
    if(selectedElement === null){
        createSelectedElement(e)
    } else {
        selectedElement.remove();
        createSelectedElement(e)
    }
    })
}

function deleteHighlight(){
    let circles = document.querySelectorAll('#balance .pie-chart .pie-chart-container svg');
        let percentageElements = document.querySelectorAll('#balance .pie-chart-info div');
        circles.forEach(circle =>{
            circle.firstElementChild.classList.remove('active', 'unactive')
        })
        deleteActive(percentageElements);
        if(document.getElementById('selected-element') !== null){
            document.getElementById('selected-element').remove()
        }
}

function createSelectedElement(e){
    //gets data from the target
    let pieChartResult = document.querySelector('.pie-chart-result')
    let elCategory = e.target.querySelector('.category').textContent;
    let elAmount = e.target.querySelector('.amount').textContent;
    let elPercentage = e.target.querySelector('.percentage').textContent;
    let iconClass = iconsObj[e.target.getAttribute('data-add-category')] 

    //adds data to variables and populates pie chart result
    let div = document.createElement('div');
        div.setAttribute('id', 'selected-element');
        let icon = document.createElement('i');
        icon.setAttribute('class', iconClass)
        let selectedCategory =  document.createElement('p');
        selectedCategory.setAttribute('class', 'category')
        selectedCategory.textContent = elCategory;
        let amount =  document.createElement('p');
        amount.setAttribute('class', 'amount')
        amount.textContent = elAmount;
        let percentage =  document.createElement('p');
        percentage.setAttribute('class', 'percentage')
        percentage.textContent = elPercentage;
        div.appendChild(icon)
        div.appendChild(selectedCategory)
        div.appendChild(amount)
        div.appendChild(percentage)
        pieChartResult.appendChild(div)
        div.classList.add('active')
}

// Add section functions

//Filter radio labels in Add section + add income/expense class to section + refresh input values
addExpenseIncomeBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        let pressedBtn = e.target.getAttribute('data-button-category')
        //Add income or expense class to Add section 
        switch(pressedBtn) {
            case "income":
                addSection.classList.add("income");
                addSection.classList.remove("expense");
                break;
            case "expense":
                addSection.classList.add("expense");
                addSection.classList.remove("income");
                break;
        }
        //Add active class to button
        deleteActive(addExpenseIncomeBtn)
        e.target.classList.add('active')
        //Delete input category value
        inputs[3].value = '';
        //Remove active class from input category
        inputCategory.classList.remove('active')
        //Desselect radio button
        uncheckRadioInputs(addRadioInput)
        //hide all label elements and show only selected ones
        addRadioLabel.forEach(label => {
            if(label.getAttribute('data-radio-category') === pressedBtn){
                label.classList.remove('hide')
            } else {
                label.classList.add('hide')
            }
        })
    })
})

addRadioInput.forEach(input => {
    input.addEventListener('click', () => {
        let selected = input.value;
        inputCategory.value = selected
        inputCategory.classList.add('active')
    })
})

inputDate.max = new Date().toLocaleDateString('en-ca')

// Helper functions

/**
 * Removes active class from all elements in an array
 */
 function deleteActive(elements){
    elements.forEach(el =>{
        el.classList.remove("active")
    })
}

/**
 * Adds hide class from all elements in an array
 */
function hideElements(elements){
    elements.forEach(el =>{
        el.classList.add("hide")
    })
}

//set input amount always with 2 decimals
inputAmount.onchange = function setTwoNumberDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
}


/**
 * Delete values for inputs
 */
function deleteValues(elements){
    elements.forEach(el => {
    el.value = '';
  });
}

/**
 * Uncheck radio buttons
 */
 function uncheckRadioInputs(elements){
    elements.forEach(el => {
    el.checked = false ;
  });
}


 