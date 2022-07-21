// Variables
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const balanceNavLink = document.getElementById('balance-navlink');
const balanceSection = document.getElementById('balance');
const addNavLink = document.getElementById('add-navlink');
const addSection = document.getElementById('add');
const inputs = document.querySelectorAll('#amount, #note, #date, #input-category');
const addExpenseIncomeBtn = document.querySelectorAll('#add .input-container button');
const addLabelCategory = document.querySelectorAll('#add .category-container label');

//Toggle between sections and change active class in navbar
navLinks.forEach(link =>{
    link.addEventListener('click', function changeSection(e){
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
        //Delete all values for inputs
        deleteValues(inputs)
    })
})

//Check once the browser goes to desktop size if the current section is the add section
//and gives the active class to balance
window.addEventListener('resize', function changeToDesktop(){
    if(this.window.innerWidth >= 767 && addNavLink.classList.contains('active')){
        deleteActive(navLinks);
        hideElements(sections);
        balanceNavLink.classList.add('active');
        balanceSection.classList.remove('hide')
    }
})


//Filter radio labels in Add section and add income/expense class
addExpenseIncomeBtn.forEach(btn => {
    btn.addEventListener('click', e =>{
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
        //hide all label elements and show only selected ones
        addLabelCategory.forEach(label => {
            if(label.getAttribute('data-radio-category') === pressedBtn){
                label.classList.remove('hide')
            } else {
                label.classList.add('hide')
            }
        })
    })
})



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

/**
 * Delete values for inputs
 */
function deleteValues(elements){
    elements.forEach(el => {
    el.value = '';
  });
}
 