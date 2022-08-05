// Variables
const navLinks = document.querySelectorAll('.nav-link');
const currency = document.getElementById('currency');
let selectedCurrency = currency.value;
const decimal = document.getElementById('decimal');
let selectedDecimal = decimal.value;
const sections = document.querySelectorAll('section');
const balanceNavLink = document.getElementById('balance-navlink');
const balanceSection = document.getElementById('balance');
const addNavLink = document.getElementById('add-navlink');
const addSection = document.getElementById('add');
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
const calendarList = document.querySelector('#calendar .container ul')


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
    selectedCurrency = e.target.value;
    console.log(selectedCurrency)
    let displayedCurrency = document.querySelectorAll('[data-currency]')
    displayedCurrency.forEach(el =>{
        el.textContent = selectedCurrency
    })
})

//Select Decimal and populate Dom with this
decimal.addEventListener('change', e =>{
    selectedDecimal = e.target.value;
    let displayedAmounts = document.querySelectorAll('[data-amount]')
    displayedAmounts.forEach(amount =>{
        if(selectedDecimal === ','){
            amount.innerText = amount.innerText.replaceAll('.', selectedDecimal);
        } else if(selectedDecimal === '.'){
            amount.innerText = amount.innerText.replaceAll(',', selectedDecimal);
        }
    })
})

//Checks website when rezising and activates different functionalities
window.addEventListener('resize', () => {
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
})

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

    //adds data to variables and populates pie chart result
    let div = document.createElement('div');
        div.setAttribute('id', 'selected-element');
        let icon = document.createElement('i');
        icon.setAttribute('class', 'fa-solid fa-basket-shopping')
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

 